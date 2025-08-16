const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/graphql', // 你要代理的接口前缀，根据实际情况修改
    createProxyMiddleware({
      target: 'http://localhost:8787',
      changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': '/api/graphql', // 如果后端没有/api前缀，去掉
    //   },
    }),
    // '/agents', // 你要代理的接口前缀，根据实际情况修改
    // createProxyMiddleware({
    //   target: 'http://localhost:4111/agents',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': '/api/graphql', // 如果后端没有/api前缀，去掉
    //   },
    // })
  );
};