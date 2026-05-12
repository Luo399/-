require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const config = require('./config');
const errorHandler = require('./middleware/errorHandler');
const { success } = require('./utils/response');

const poemRoutes = require('./routes/poem');
const interpretationRoutes = require('./routes/interpretation');
const questionRoutes = require('./routes/question');
const answerRoutes = require('./routes/answer');
const recordingRoutes = require('./routes/recording');

const app = express();

app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/poem', poemRoutes);
app.use('/api/interpretation', interpretationRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/recording', recordingRoutes);

app.get('/api/health', (req, res) => {
  success(res, { status: 'ok', timestamp: Date.now() }, '服务运行正常');
});

app.use((req, res) => {
  res.status(404).json({ success: false, data: null, message: '接口不存在' });
});

app.use(errorHandler);

module.exports = app;