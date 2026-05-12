const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19);
};

const log = (level, message) => {
  const timestamp = getTimestamp();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  
  console.log(logMessage.trim());
  
  const logFile = path.join(logsDir, 'combined.log');
  fs.appendFileSync(logFile, logMessage);
  
  if (level === 'error') {
    const errorFile = path.join(logsDir, 'error.log');
    fs.appendFileSync(errorFile, logMessage);
  }
};

exports.info = (message) => log('info', message);
exports.error = (message) => log('error', message);
exports.warn = (message) => log('warn', message);
exports.debug = (message) => log('debug', message);