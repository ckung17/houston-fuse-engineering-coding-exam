const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/**
 * This server mimics AWS API Gateway + Lambda locally.
 * Each route loads and executes a Lambda handler, passing an event object
 * similar to what API Gateway would provide.
 */

// Helper to create API Gateway-style event object
function createEvent(req) {
  return {
    httpMethod: req.method,
    path: req.path,
    queryStringParameters: Object.keys(req.query).length > 0 ? req.query : null,
    headers: req.headers,
    body: req.body ? JSON.stringify(req.body) : null,
  };
}

// Helper to send Lambda response
function sendLambdaResponse(res, lambdaResponse) {
  const statusCode = lambdaResponse.statusCode || 200;
  const headers = lambdaResponse.headers || {};
  const body = lambdaResponse.body;

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  res.status(statusCode);
  
  if (body) {
    res.send(body);
  } else {
    res.end();
  }
}

// GET /team - List team members
app.get('/team', async (req, res) => {
  try {
    // Clear require cache to pick up changes (for development)
    delete require.cache[require.resolve('./lambdas/getTeam/index.js')];
    
    const { handler } = require('./lambdas/getTeam/index.js');
    const event = createEvent(req);
    const response = await handler(event);
    sendLambdaResponse(res, response);
  } catch (error) {
    console.error('Lambda execution error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║         Team Directory API (Lambda Simulator)          ║
╠════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}              ║
║                                                        ║
║  Available endpoints:                                  ║
║    GET  /team    - List all team members               ║
║    GET  /health  - Health check                        ║
╚════════════════════════════════════════════════════════╝
  `);
});
