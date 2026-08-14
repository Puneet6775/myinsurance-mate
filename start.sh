#!/bin/zsh
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

if ! pgrep -x mysqld >/dev/null && ! pgrep -x mariadbd >/dev/null; then
  echo "Starting MySQL..."
  brew services start mysql 2>/dev/null || brew services start mysql@8.0 2>/dev/null || brew services start mariadb 2>/dev/null || true
fi

cd "$ROOT/backend"
if [ ! -d .venv ]; then
  python3 -m venv .venv
fi
. .venv/bin/activate
pip install -q -r requirements.txt
uvicorn app.main:app --reload --port 8000 --host 127.0.0.1 &
BACK_PID=$!

cd "$ROOT/frontend"
if [ ! -d node_modules ]; then
  npm install
fi
npm run dev -- --host 127.0.0.1 --port 5173 &
FRONT_PID=$!

echo "Backend  http://127.0.0.1:8000"
echo "Website  http://127.0.0.1:5173"
echo "Stop with: kill $BACK_PID $FRONT_PID"

wait
