# AI Workstation Command Center

## What this is
MVP of a system where a phone sends coding tasks to a 
desktop agent, which uses Claude API to execute them.

## Structure
- agent/    Desktop agent that polls for tasks and calls Claude
- backend/  Simple API to receive tasks from phone
- tasks/    JSON file storage for MVP (no database yet)
- utils/    Shared helpers

## Priorities
- Simplicity over scale
- Get end-to-end loop working first
- Safety: agent should never run destructive commands 
  without explicit approval flow

## Current stage
Building the skeleton with mocked Claude calls. 
API key will be added last when end-to-end loop works.

## Tech choices
- Node.js (CommonJS)
- Express for the backend API
- File-based JSON storage in tasks/
- Polling loop in the agent (no websockets yet)

## Conventions
- Keep files small and focused
- No premature abstraction
- Comment the "why," not the "what"
- Use async/await, not callbacks