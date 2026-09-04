/**
 * Sync Plasmic code-component registrations from src/components/plasmic/*.tsx
 *
 * Only-add policy: never touches existing registerComponent calls or barrel
 * exports; appends what is missing. Heuristics map TS prop types to Plasmic
 * prop metadata; JSDoc tags refine:
 *   @plasmic displayName="..."        component display name
 *   @plasmic description="..."        component description
 *   @plasmic-section "Name"           insert menu section
 *   @plasmic-prop <name> displayName="..." advanced hidden
 *   @plasmic-choice A|B|C             override choice options (pipe-separated)
 *   @plasmic-slot allowed=A,B,C       restrict slot components
 *
 * Usage: pnpm exec tsx scripts/sync-plasmic-registry.mts [--check]
 *   --check  exits 1 if anything would change (CI mode), writes nothing
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import ts from 'typescript'

const ROOT = path.resolve(process.cwd())
const DIR = path.join(ROOT, 'src', 'components', 'plasmic')
const REGISTRY = path.join(ROOT, 'src', 'plasmic', 'plasmic-init-client.tsx')
const BARREL = path.join(DIR, 'index.ts')
const CHECK = process.argv.includes('--check')

type PropMeta = {
  type: string
  options?: string[]
  defaultValue?: string
  displayName?: string
  advanced?: boolean
  hidden?: boolean
  allowedComponents?: string[]
  argTypes?: Array<{ name: string; type: string }>
}

type ComponentSpec = {
  file: string
  exportName: string
  displayName?: string
  description?: string
  section?: string
  props: Record<string, PropMeta>
  propTags: Record<string, Record<string, string>>
}

function fail(msg: string): never {
  console.error(`[sync-plasmic-registry] ${msg}`)
  process.exit(1)
}

function listComponentFiles(): string[] {
  if (!fs.existsSync(DIR)) return []
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => path.join(DIR, f))
}

function jsdocText(tags: readonly ts.JSDocTag[]): string {
  return tags.map((t) => t.comment?.toString() ?? '').join(' ')
}

/** Parse `key="value"` / `key=value` pairs from a JSDoc tag comment. */
function parseTagArgs(comment: string): Record<string, string> {
  const out: Record<string, string> = {}
  const re = /([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+))/g
  let m: RegExpExecArray | null
  while ((m = re.exec(comment))) out[m[1]] = m[2] ?? m[3] ?? m[4] ?? ''
  return out
}

function mapPropType(t: ts.TypeNode, name: string, spec: ComponentSpec): PropMeta {
  const tag = spec.propTags[name] ?? {}

  const unwrap = (node: ts.TypeNode): ts.TypeNode =>
    ts.isParenthesizedTypeNode(node) ? unwrap(node.type) : node

  const resolveRef = (node: ts.TypeNode): string => {
    const typeRef = unwrap(node)
    if (!ts.isTypeReferenceNode(typeRef)) return typeRef.getText()
    return typeRef.typeName.getText().split('.').pop() ?? typeRef.typeName.getText()
  }

  if (ts.isUnionTypeNode(t)) {
    const lits = t.types
      .filter((u): u is ts.LiteralTypeNode => ts.isLiteralTypeNode(u) && ts.isStringLiteral(u.literal))
      .map((u) => (u.literal as ts.StringLiteral).text)
    if (lits.length > 0 && lits.length === t.types.length) {
      const options = tag.choice ? tag.choice.split('|').map((s) => s.trim()) : lits
      const def = tag.defaultValue ?? lits[0]
      return { type: 'choice', options, defaultValue: def }
    }
    return { type: 'object' }
  }

  const refName = resolveRef(t)
  if (['ReactNode', 'ReactElement', 'JSX.Element', 'Element'].includes(refName)) {
    const meta: PropMeta = { type: 'slot', defaultValue: [] as unknown as string }
    if (tag.allowed) meta.allowedComponents = tag.allowed.split(',').map((s) => s.trim())
    return meta
  }

  if (ts.isFunctionTypeNode(t)) return { type: 'eventHandler', argTypes: [] }
  if (ts.isLiteralTypeNode(t)) return { type: 'object' }

  if (refName === 'string') return { type: 'string', defaultValue: tag.defaultValue }
  if (refName === 'number') return { type: 'number', defaultValue: tag.defaultValue }
  if (refName === 'boolean') return { type: 'boolean', defaultValue: tag.defaultValue }
  return { type: 'object' }
}

function parseComponentFile(file: string): ComponentSpec | null {
  const src = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  let exportName: string | null = null
  let propsTypeName: string | null = null
  let componentTags: readonly ts.JSDocTag[] = []

  sf.forEachChild((node) => {
    if (ts.isVariableStatement(node)) {
      const decl = node.declarationList.declarations[0]
      if (!decl || !isExported(node)) return
      exportName = decl.name.getText()
      componentTags = ts.getJSDocTags(node)
      const type = decl.type
      if (type && ts.isTypeReferenceNode(type) && type.typeArguments?.length) {
        propsTypeName = type.typeArguments[0].getText()
      }
    } else if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) && node.name && isExported(node)) {
      exportName = node.name.text
      componentTags = ts.getJSDocTags(node)
      const firstParam = node.parameters[0]
      if (firstParam?.type && ts.isTypeReferenceNode(firstParam.type)) {
        propsTypeName = firstParam.type.typeName.getText()
      }
    }
  })

  if (!exportName) return null

  const spec: ComponentSpec = {
    file,
    exportName,
    props: {},
    propTags: {},
  }

  // Component-level JSDoc tags
  for (const tag of componentTags) {
    const tagText = jsdocText([tag]).trim()
    switch (tag.tagName.text) {
      case 'plasmic': {
        const args = parseTagArgs(tagText)
        if (args.displayName) spec.displayName = args.displayName
        if (args.description) spec.description = args.description
        if (args.section) spec.section = args.section
        break
      }
      case 'plasmic-section':
        spec.section = tagText.replace(/^["']|["']$/g, '')
        break
    }
  }

  // Props interface/type alias
  if (propsTypeName) {
    let found: ts.Node | null = null
    sf.forEachChild((node) => {
      const name = ts.isInterfaceDeclaration(node)
        ? node.name.text
        : ts.isTypeAliasDeclaration(node)
          ? node.name.text
          : null
      if (name === propsTypeName) found = node
    })
    if (found && (ts.isInterfaceDeclaration(found) || ts.isTypeAliasDeclaration(found))) {
      const members = ts.isInterfaceDeclaration(found)
        ? found.members
        : (found.type as ts.TypeLiteralNode).members
      for (const member of members) {
        if (!ts.isPropertySignature(member) || !member.type) continue
        const propName = member.name.getText().replace(/['"]/g, '')
        const tags = ts.getJSDocTags(member)
        const tagMap: Record<string, string> = {}
        for (const tag of tags) {
          const tagText = jsdocText([tag]).trim()
          switch (tag.tagName.text) {
            case 'plasmic':
              Object.assign(tagMap, parseTagArgs(tagText))
              break
            case 'plasmic-choice':
              tagMap.choice = tagText.replace(/^["']|["']$/g, '')
              break
            case 'plasmic-slot':
              tagMap.allowed = tagText.replace(/^["']|["']$/g, '')
              break
          }
        }
        spec.propTags[propName] = tagMap
        const meta = mapPropType(member.type, propName, spec)
        if (tagMap.displayName) meta.displayName = tagMap.displayName
        if (tagMap.advanced === 'true' || tagMap.advanced === '') meta.advanced = true
        if (tagMap.hidden === 'true' || tagMap.hidden === '') meta.hidden = true
        spec.props[propName] = meta
      }
    }
  }

  return spec
}

function isExported(node: ts.Node): boolean {
  const mods = ts.canHaveModifiers(node) ? ts.getModifiers(node) ?? [] : []
  return mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
}

function formatMeta(spec: ComponentSpec): string {
  const lines: string[] = []
  lines.push(`  name: '${spec.exportName}',`)
  if (spec.displayName && spec.displayName !== spec.exportName) {
    lines.push(`  displayName: '${spec.displayName}',`)
  }
  if (spec.description) lines.push(`  description: '${spec.description.replace(/'/g, "\\'")}',`)
  if (spec.section) lines.push(`  section: '${spec.section}',`)
  const propEntries = Object.entries(spec.props)
  if (propEntries.length === 0) {
    lines.push('  props: {},')
  } else {
    lines.push('  props: {')
    for (const [name, meta] of propEntries) {
      const parts = [`type: '${meta.type}'`]
      if (meta.options) parts.push(`options: [${meta.options.map((o) => `'${o}'`).join(', ')}]`)
      if (meta.defaultValue !== undefined) {
        parts.push(
          meta.type === 'slot' ? 'defaultValue: []' : `defaultValue: '${meta.defaultValue}'`,
        )
      }
      if (meta.displayName) parts.push(`displayName: '${meta.displayName}'`)
      if (meta.advanced) parts.push('advanced: true')
      if (meta.hidden) parts.push('hidden: true')
      if (meta.allowedComponents) {
        parts.push(`allowedComponents: [${meta.allowedComponents.map((c) => `'${c}'`).join(', ')}]`)
      }
      if (meta.argTypes) parts.push(`argTypes: []`)
      lines.push(`    ${name}: { ${parts.join(', ')} },`)
    }
    lines.push('  },')
  }
  return lines.join('\n')
}

function getRegisteredNames(src: string): Set<string> {
  const names = new Set<string>()
  const re = /PLASMIC\.registerComponent\(\s*([A-Za-z_$][\w$]*)\s*,/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) names.add(m[1])
  return names
}

function sync() {
  const files = listComponentFiles()
  if (files.length === 0) fail(`no .tsx components found in ${path.relative(ROOT, DIR)}`)

  const specs = files
    .map(parseComponentFile)
    .filter((s): s is ComponentSpec => s !== null)
    .sort((a, b) => a.exportName.localeCompare(b.exportName))

  const registrySrc = fs.readFileSync(REGISTRY, 'utf8')
  const registered = getRegisteredNames(registrySrc)

  // Which specs are already registered? A registered name may map to an import
  // that is not the plasmic dir component (e.g. Button from ui/). Only treat a
  // name as covered if it is imported from @/components/plasmic.
  const plasmicImportNames = new Set<string>()
  const importRe = /import\s+(?:{([^}]+)}|(\w+))\s+from\s+'@\/components\/plasmic\/([\w-]+)'/g
  let im: RegExpExecArray | null
  while ((im = importRe.exec(registrySrc))) {
    const named = im[1]?.split(',').map((s) => s.trim().split(/\s+as\s+/).pop() ?? '')
    const def = im[2]
    for (const n of [...(named ?? []), ...(def ? [def] : [])]) {
      if (n) plasmicImportNames.add(n)
    }
  }

  const missing = specs.filter((s) => !registered.has(s.exportName) || !plasmicImportNames.has(s.exportName))

  if (missing.length === 0) {
    console.log('[sync-plasmic-registry] registry already up to date')
  } else {
    // 1. Append imports after the last existing @/components/plasmic import (or after PLASMIC import)
    let out = registrySrc
    const importLines = missing.map((s) => {
      const hasDefault = fileHasDefaultExport(s.file)
      return hasDefault
        ? `import ${s.exportName} from '@/components/plasmic/${path.basename(s.file, '.tsx')}'`
        : `import { ${s.exportName} } from '@/components/plasmic/${path.basename(s.file, '.tsx')}'`
    })
    const anchor = "import { PLASMIC } from './plasmic-init'"
    if (!out.includes(anchor)) fail(`anchor import not found in ${path.relative(ROOT, REGISTRY)}`)
    out = out.replace(
      anchor,
      anchor + '\n' + importLines.join('\n'),
    )

    // 2. Append registrations before the ClientPlasmicRootProvider export
    const registrations = missing
      .map((s) => `PLASMIC.registerComponent(${s.exportName}, {\n${formatMeta(s)}\n})`)
      .join('\n\n')
    const exportAnchor = 'export function ClientPlasmicRootProvider'
    if (!out.includes(exportAnchor)) fail(`anchor ${exportAnchor} not found`)
    out = out.replace(exportAnchor, `${registrations}\n\n${exportAnchor}`)

    fs.writeFileSync(REGISTRY, out)
    console.log(`[sync-plasmic-registry] registered: ${missing.map((s) => s.exportName).join(', ')}`)
  }

  // Barrel sync (only-add)
  const barrelSrc = fs.existsSync(BARREL) ? fs.readFileSync(BARREL, 'utf8') : ''
  const barrelLines = specs
    .filter((s) => !barrelSrc.includes(`from './${path.basename(s.file, '.tsx')}'`))
    .map((s) =>
      fileHasDefaultExport(s.file)
        ? `export { default as ${s.exportName} } from './${path.basename(s.file, '.tsx')}'`
        : `export { ${s.exportName} } from './${path.basename(s.file, '.tsx')}'`,
    )
  if (barrelLines.length > 0) {
    const next = (barrelSrc.trimEnd() + '\n' + barrelLines.join('\n') + '\n')
    fs.writeFileSync(BARREL, next)
    console.log(`[sync-plasmic-registry] barrel exports added: ${barrelLines.length}`)
  } else {
    console.log('[sync-plasmic-registry] barrel already up to date')
  }
}

function fileHasDefaultExport(file: string): boolean {
  const src = fs.readFileSync(file, 'utf8')
  return /export\s+default\b/.test(src)
}

if (CHECK) {
  const before = fs.readFileSync(REGISTRY, 'utf8') + fs.readFileSync(BARREL, 'utf8')
  sync()
  const after = fs.readFileSync(REGISTRY, 'utf8') + fs.readFileSync(BARREL, 'utf8')
  if (before !== after) {
    console.error('[sync-plasmic-registry] --check FAILED: registry is out of date')
    process.exit(1)
  }
} else {
  sync()
}
