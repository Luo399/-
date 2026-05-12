const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

app.listen(config.port, () => {
  logger.info(`🚀 服务已启动，运行在端口 ${config.port}`);
  logger.info(`🌐 CORS允许域名: ${config.corsOrigin}`);
});