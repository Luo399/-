const logger = require('../utils/logger');
const { fail } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  const statusCode = err.status || 500;
  const message = statusCode === 500 ? '服务器异常' : err.message;
  
  return fail(res, message, statusCode);
};

module.exports = errorHandler;