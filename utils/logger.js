// Prefix every log line with an ISO timestamp so log output is greppable
function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

module.exports = { log };
