#!/bin/bash
# Disable only Lukulu Academy's own per-user launchd sync job.
set -euo pipefail
LABEL="za.co.lukulu.academy.autopull"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
if [ ! -f "$PLIST" ]; then
  echo "Academy auto-pull is not installed for this user."
  exit 0
fi
launchctl unload "$PLIST" || echo "The job may already be stopped."
rm -f "$PLIST"
echo "Academy auto-pull disabled. Project files, commits and log are preserved."
