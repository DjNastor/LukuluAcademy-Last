#!/bin/bash
# Read-only diagnostics for Lukulu Academy before syncing an existing VS Code checkout.
# Does not fetch, pull, reset, stash, install software or write project files.
set -euo pipefail
ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd -P)"
cd "$ROOT"
echo "=== Lukulu Academy: read-only VS Code sync check ==="
echo "Project: $ROOT"
if ! command -v git >/dev/null 2>&1; then echo "STOP: Git not available."; exit 2; fi
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then echo "STOP: This folder is not a Git checkout."; exit 2; fi
TOP="$(git rev-parse --show-toplevel)"
if [ "$TOP" != "$ROOT" ]; then echo "STOP: Project folder is not the Git root: $TOP"; exit 2; fi
BRANCH="$(git symbolic-ref --quiet --short HEAD || true)"
ORIGIN="$(git remote get-url origin 2>/dev/null || true)"
echo "Branch: ${BRANCH:-detached}"
case "$ORIGIN" in
  "https://github.com/DjNastor/LukuluAcademy-Last"|"https://github.com/DjNastor/LukuluAcademy-Last.git"|"git@github.com:DjNastor/LukuluAcademy-Last.git")
    echo "Origin: verified Academy GitHub repository" ;;
  *) echo "STOP: Unrecognised Git origin. Review git remote -v locally."; exit 2 ;;
esac
echo "Local HEAD: $(git rev-parse --short HEAD)"
echo "Working tree (M=modified, ??=untracked):"
git status --short --untracked-files=normal
if [ "$BRANCH" != "develop" ]; then
 echo "STOP: Switch to develop only after preserving current work."
 exit 3
fi
if [ -n "$(git status --porcelain --untracked-files=normal)" ]; then
 echo "STOP: Local edits exist. Back up/commit or review them before using Safe Pull."
fi
if git rev-parse --verify -q refs/remotes/origin/develop >/dev/null; then
 echo "Last locally fetched comparison (may be stale):"
 git rev-list --left-right --count HEAD...refs/remotes/origin/develop | awk '{print "Local-only commits: "$1"; Remote-tracking-only commits: "$2}'
 echo "To refresh remote info without merging: use the separate VS Code Fetch task."
else
 echo "No origin/develop tracking ref yet; fetch the branch before comparing."
fi
echo "No project files or Git refs were changed by this diagnostic."
