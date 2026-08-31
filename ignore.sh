#!/bin/bash

# Only deploy when the pushed branch is main.
# Vercel skips the build when this script exits with code 0.
if [[ "$VERCEL_GIT_COMMIT_REF" != "main" ]]; then
  echo "Skipping deploy: branch is not main ($VERCEL_GIT_COMMIT_REF)"
  exit 0
else
  echo "Deploying: branch is main"
  exit 1
fi
