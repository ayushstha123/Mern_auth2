// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the base URL you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // Specify the target server URL (your backend server)
      changeOrigin: true,
    })
  );
};
