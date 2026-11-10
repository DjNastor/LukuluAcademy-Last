#!/bin/bash
# Opt-in, non-destructive background sync for a local Lukulu Academy checkout.
# macOS Catalina-compatible: launchd runs the existing safe sync script.
set -euo pipefail
ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd -P)"
LABEL="za.co.lukulu.academy.autopull"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
LOG="$HOME/Library/Logs/LukuluAcademy-autopull.log"
SAFE="$ROOT/scripts/sync-academy.sh"

if [ ! -f "$SAFE" ]; then
  echo "Missing safe sync script: $SAFE" >&2
  exit 2
fi
if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is required to create a valid launchd settings file." >&2
  exit 2
fi
if [ -f "$PLIST" ]; then
  echo "Already configured: $PLIST"
  echo "To change its path, run the disable task before enabling again."
  exit 0
fi

echo "Checking branch, remote and local edits before enabling auto-pull..."
if ! /bin/bash "$SAFE"; then
  echo "Auto-pull NOT enabled: resolve the issue shown above, then retry." >&2
  exit 3
fi

mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs"
python3 - "$SAFE" "$LOG" "$LABEL" "$PLIST" <<'PY'
import plistlib, sys
script, log, label, target = sys.argv[1:]
job = {
    "Label": label,
    "ProgramArguments": ["/bin/bash", script],
    "RunAtLoad": True,
    "StartInterval": 300,
    "StandardOutPath": log,
    "StandardErrorPath": log,
}
with open(target, "wb") as handle:
    plistlib.dump(job, handle, fmt=plistlib.FMT_XML)
PY
if ! launchctl load "$PLIST"; then
  echo "Failed to load background job; deleting unused configuration." >&2
  rm -f "$PLIST"
  exit 4
fi
echo "Academy safe auto-pull enabled every 5 minutes while you are logged into the Mac."
echo "Only clean working copies on develop can fast-forward; nothing is force-overwritten."
echo "Log: $LOG"
echo "To disable: run the VS Code task 'Academy: Disable Safe Auto-Pull'."
