const { processTask, getPendingTasks } = require('./taskRunner');
const { log } = require('../utils/logger');

const POLL_INTERVAL_MS = 5000;

async function poll() {
  const pending = getPendingTasks();
  if (pending.length === 0) return; // nothing to do this tick

  log(`Found ${pending.length} pending task(s)`);
  // Process sequentially — keeps logs readable and avoids file contention
  for (const filePath of pending) {
    await processTask(filePath);
  }
}

log('Agent started — polling every 5s');
// Run immediately on startup, then on the interval
poll();
setInterval(poll, POLL_INTERVAL_MS);
