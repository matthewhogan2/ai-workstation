const fs = require('fs');
const path = require('path');
const { run } = require('./claudeClient');
const { log } = require('../utils/logger');

const TASKS_DIR = path.join(__dirname, '../tasks');

// Process a single task file end-to-end.
// We write "in_progress" before calling Claude so a second agent instance
// won't pick up the same task if we ever run multiple agents.
async function processTask(filePath) {
  const task = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  task.status = 'in_progress';
  fs.writeFileSync(filePath, JSON.stringify(task, null, 2));
  log(`Processing task: ${task.id}`);

  try {
    const { result } = await run(task.prompt);
    task.status = 'done';
    task.result = result;
    task.completedAt = new Date().toISOString();
    log(`Done: ${task.id} → ${result}`);
  } catch (err) {
    // Keep the task visible so the phone can see it failed
    task.status = 'error';
    task.error = err.message;
    log(`Error on task ${task.id}: ${err.message}`);
  }

  fs.writeFileSync(filePath, JSON.stringify(task, null, 2));
}

// Scan tasks/ and return paths of every pending task
function getPendingTasks() {
  return fs
    .readdirSync(TASKS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(TASKS_DIR, f))
    .filter((fp) => {
      const task = JSON.parse(fs.readFileSync(fp, 'utf8'));
      return task.status === 'pending';
    });
}

module.exports = { processTask, getPendingTasks };
