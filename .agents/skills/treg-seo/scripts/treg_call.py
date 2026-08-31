#!/usr/bin/env python3
"""treg SEO 调用封装 — 从 skill 本地 .treg/config.json 读 token，直接走 HTTP。

设计约束：
- 凭证只在运行时从 <skill>/.treg/config.json 读取，不回显、不入 repo。
- 输出强制 UTF-8，绕开 Windows PowerShell GBK 控制台崩溃。
- --dry-run 只报价不调用（不花钱）。

用法：
  python treg_call.py balance                          # 查看余额
  python treg_call.py call <endpoint-id> --dry-run     # 只打印请求
  python treg_call.py call <endpoint-id> --json "{...}"  # 真实调用
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")  # Windows 控制台 GBK 兼容
    sys.stderr.reconfigure(encoding="utf-8")
except (AttributeError, ValueError):
    pass

BASE_URL = "https://treg.to"
CONFIG_REL = Path(".treg") / "config.json"


def find_config() -> Path:
    """优先 skill 本地 .treg/config.json，回退用户主目录。"""
    here = Path(__file__).resolve().parent
    for base in (here.parent, Path.home()):
        candidate = base / CONFIG_REL
        if candidate.is_file():
            return candidate
    raise FileNotFoundError(
        "未找到 treg 配置。请把配置放到 .agents/skills/treg-seo/.treg/config.json "
        "（或其父目录），或 ~/.treg/config.json。"
    )


def load_token(config: Path) -> str:
    data = json.loads(config.read_text(encoding="utf-8"))
    token = os.environ.get("TREG_TOKEN") or data.get("token")
    if not token:
        raise RuntimeError(f"配置 {config} 中缺少 token 字段")
    return token


def config_data(config: Path) -> dict:
    return json.loads(config.read_text(encoding="utf-8"))


def api_request(
    token: str,
    method: str,
    path: str,
    body: str | None = None,
    params: dict | None = None,
    timeout: int = 60,
):
    url = f"{BASE_URL}{path}"
    if params:
        from urllib.parse import urlencode

        url = f"{url}?{urlencode(params)}"
    data = body.encode("utf-8") if body else None
    headers = {
        "X-Treg-Token": token,
        "Content-Type": "application/json",
        "User-Agent": "treg-seo-adapter/1.0",
    }
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", errors="replace")


def resolve_org_id(token: str, active_org: str | None) -> int:
    status, text = api_request(token, "GET", "/orgs")
    if status >= 400:
        # machine identity fallback: /auth/me carries the one org it belongs to
        status, text = api_request(token, "GET", "/auth/me")
        if status == 200:
            me = json.loads(text)
            if me.get("org_id"):
                return int(me["org_id"])
        raise RuntimeError(f"无法解析 org id (HTTP {status}): {text[:200]}")
    orgs = json.loads(text)
    if active_org:
        for o in orgs:
            if o.get("slug") == active_org:
                return int(o["org_id"])
    for o in orgs:
        if o.get("active"):
            return int(o["org_id"])
    if orgs:
        return int(orgs[0]["org_id"])
    raise RuntimeError("treg 账号下没有可用的 org")


def cmd_balance(config: Path) -> int:
    token = load_token(config)
    org_id = resolve_org_id(token, config_data(config).get("active_org"))
    status, text = api_request(token, "GET", f"/orgs/{org_id}/balance", params={"limit": 5})
    if status < 400:
        try:
            b = json.loads(text)
            micro = b.get("balance_micro", 0)
            blocks = b.get("blocks") or []
            print(f"Balance  ${micro / 1_000_000:.4f}  ({micro} micro-USD)")
            for blk in blocks:
                print(
                    f"  credit  {blk.get('kind', '?')}: "
                    f"${blk.get('remaining_micro', 0) / 1_000_000:.4f} left "
                    f"of ${blk.get('amount_micro', 0) / 1_000_000:.4f} "
                    f"granted {(blk.get('created_at') or '')[:10]}"
                )
        except json.JSONDecodeError:
            print(text)
    else:
        print(text)
    return 0 if status < 400 else 1


def read_text_robust(path: Path) -> str:
    raw = path.read_bytes()
    if raw.startswith(b"\xef\xbb\xbf"):
        raw = raw[3:]
    return raw.decode("utf-8")


def cmd_call(
    config: Path,
    endpoint: str,
    method: str,
    query: list[str],
    data: str | None,
    data_file: str | None,
    dry_run: bool,
) -> int:
    token = load_token(config)

    params: list[tuple[str, str]] = []
    for kv in query:
        if "=" not in kv:
            print(f"参数错误: --query 需要 K=V，收到 {kv!r}", file=sys.stderr)
            return 2
        params.append(tuple(kv.split("=", 1)))

    body = None
    if data_file:
        body = read_text_robust(Path(data_file))
    elif data:
        body = data

    method = method or ("POST" if body is not None else "GET")

    if dry_run:
        print(json.dumps(
            {
                "dry_run": True,
                "method": method,
                "url": f"{BASE_URL}/call/{endpoint}",
                "query": params,
                "body": json.loads(body) if body else None,
            },
            ensure_ascii=False,
            indent=2,
        ))
        return 0

    from urllib.parse import urlencode

    path = f"/call/{endpoint}"
    if params:
        path = f"{path}?{urlencode(params)}"
    status, text = api_request(token, method, path, body=body)
    print(text)
    return 0 if status < 400 else 1


def main() -> int:
    parser = argparse.ArgumentParser(description="treg SEO 调用封装")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_balance = sub.add_parser("balance", help="查看 treg 余额")
    p_balance.set_defaults(fn=cmd_balance)

    p_call = sub.add_parser("call", help="调用 treg 端点（镜像 treg CLI 契约）")
    p_call.add_argument("endpoint", help="treg 端点 ID，如 dataforseo.google.serp.organic")
    p_call.add_argument("--method", default=None, help="HTTP 方法；默认 GET，有 body 时默认 POST")
    p_call.add_argument("--query", action="append", default=[], metavar="K=V",
                        help="URL 查询参数，可重复")
    p_call.add_argument("--data", default=None, metavar="JSON",
                        help="原始请求 body（POST）")
    p_call.add_argument("--file", dest="data_file", default=None, metavar="PATH",
                        help="原始请求 body 文件（PowerShell 内联引号易被吞，推荐）")
    p_call.add_argument("--dry-run", action="store_true", help="只打印请求，不调用")
    p_call.set_defaults(fn=cmd_call)

    args = parser.parse_args()
    try:
        config = find_config()
        if args.cmd == "balance":
            return args.fn(config)
        return args.fn(
            config,
            args.endpoint,
            args.method,
            args.query,
            args.data,
            args.data_file,
            args.dry_run,
        )
    except (FileNotFoundError, RuntimeError, json.JSONDecodeError) as exc:
        print(f"treg_call 失败: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
