// Stub that mimics the shape of a real Claude API call.
// Replace the body of run() with the real Anthropic SDK call when ready.
async function run(prompt) {
  // Simulate a small delay so the mock feels like a real network call
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { result: `MOCK: would process: ${prompt}` };
}

module.exports = { run };
