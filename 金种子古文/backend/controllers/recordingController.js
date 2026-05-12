const RecordingModel = require('../models/recording');
const { success, fail } = require('../utils/response');
const fs = require('fs');
const path = require('path');

exports.upload = (req, res, next) => {
  try {
    if (!req.file) {
      return fail(res, '请选择要上传的音频文件', 400);
    }
    
    const { user_id, poem_id } = req.body;
    if (!user_id || !poem_id) {
      fs.unlinkSync(req.file.path);
      return fail(res, '缺少用户ID或古诗ID', 400);
    }
    
    const audioPath = `/uploads/audio/${req.file.filename}`;
    const duration = parseInt(req.body.duration) || 0;
    const fileSize = req.file.size;
    
    const id = RecordingModel.saveRecording(user_id, poem_id, audioPath, duration, fileSize);
    
    success(res, {
      id,
      poem_id: parseInt(poem_id),
      user_id: parseInt(user_id),
      audio_path: audioPath,
      duration,
      file_size: fileSize,
      created_at: new Date().toISOString()
    }, '上传成功');
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

exports.getByUserId = (req, res, next) => {
  try {
    const { userId } = req.params;
    const recordings = RecordingModel.getByUserId(userId);
    success(res, recordings, '获取成功');
  } catch (error) {
    next(error);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;
    const recording = RecordingModel.findById(id);
    
    if (!recording) {
      return fail(res, '录音记录不存在', 404);
    }
    
    const filePath = path.join(__dirname, '..', recording.audio_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    RecordingModel.deleteById(id);
    
    success(res, null, '录音已删除');
  } catch (error) {
    next(error);
  }
};