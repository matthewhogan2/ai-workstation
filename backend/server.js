const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { log } = require('../utils/logger');

const app = express();
app.use(express.json());

const TASKS_DIR = path.join(__dirname, '../tasks');

// POST /tasks — phone sends { prompt: "..." }, we persist it and return the id
app.post('/tasks', (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  const id = crypto.randomUUID();
  const task = { id, prompt, status: 'pending', createdAt: new Date().toISOString() };
  const filePath = path.join(TASKS_DIR, `${id}.json`);

  fs.writeFileSync(filePath, JSON.stringify(task, null, 2));
  log(`Task created: ${id}`);
  res.status(201).json({ id });
});

// GET /tasks/:id — poll from phone to check status/result
app.get('/tasks/:id', (req, res) => {
  const filePath = path.join(TASKS_DIR, `${req.params.id}.json`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'not found' });

  const task = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(task);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log(`Backend listening on port ${PORT}`));
