#!/bin/bash
# Safe, explicit update of an authorised local Academy working copy.
# Never overwrites local edits, stashes changes, force resets or pushes.
set -euo pipefail
ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd -P)"
cd "$ROOT"
echo "Lukulu Academy — safe GitHub update"
echo "Workspace: $ROOT"
if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: Git is unavailable in this terminal. Install/enable Git first." >&2
  exit 2
fi
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: This folder is not a Git working tree." >&2
  exit 2
fi
TOP="$(git rev-parse --show-toplevel)"
if [ "$TOP" != "$ROOT" ]; then
  echo "ERROR: The VS Code folder is not the Academy Git repository root." >&2
  echo "Actual Git root: $TOP" >&2
  exit 2
fi
ORIGIN="$(git remote get-url origin 2>/dev/null || true)"
case "$ORIGIN" in
  "https://github.com/DjNastor/LukuluAcademy-Last"|"https://github.com/DjNastor/LukuluAcademy-Last.git"|"git@github.com:DjNastor/LukuluAcademy-Last.git")
    ;;
  *)
    echo "ERROR: Expected the verified Lukulu Academy GitHub origin. Found: $ORIGIN" >&2
    exit 2
    ;;
esac
BRANCH="$(git symbolic-ref --quiet --short HEAD || true)"
if [ "$BRANCH" != "develop" ]; then
  echo "STOP: Active branch is '${BRANCH:-detached}', not 'develop'." >&2
  echo "Switch to develop after saving/reviewing your local work." >&2
  exit 3
fi
if [ -n "$(git status --porcelain --untracked-files=normal)" ]; then
  echo "STOP: There are local modified or untracked files." >&2
  echo "Save open editors, review Source Control, then commit/back up your work." >&2
  git status --short
  exit 4
fi
echo "Fetching from GitHub..."
git fetch origin develop
echo "Fast-forwarding only (never force or rebase)..."
if ! git merge --ff-only origin/develop; then
  echo "STOP: Local history has diverged. Review Git changes manually; no reset was performed." >&2
  exit 5
fi
AHEAD="$(git rev-list --count origin/develop..HEAD)"
if [ "$AHEAD" -gt 0 ]; then
  echo "NOTICE: You have $AHEAD local commit(s) not on GitHub yet."
  echo "Review them and push using Source Control when ready."
fi
echo "SUCCESS: Working copy safely updated. Current commit: $(git rev-parse --short HEAD)"
echo "Open student-hub.html or index.html in Live Preview."
