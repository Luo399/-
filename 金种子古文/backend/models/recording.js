const db = require('../database/connection');

exports.saveRecording = (userId, poemId, audioPath, duration, fileSize) => {
  const insert = db.prepare(`
    INSERT INTO user_recordings (user_id, poem_id, audio_path, duration, file_size)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = insert.run(userId, poemId, audioPath, duration, fileSize);
  return result.lastInsertRowid;
};

exports.getByUserId = (userId) => {
  const recordings = db.prepare(`
    SELECT ur.*, p.title as poem_title 
    FROM user_recordings ur
    JOIN poems p ON ur.poem_id = p.id
    WHERE ur.user_id = ? 
    ORDER BY ur.created_at DESC
  `).all(userId);
  
  return recordings.map(recording => ({
    id: recording.id,
    poem_id: recording.poem_id,
    poem_title: recording.poem_title,
    audio_path: recording.audio_path,
    duration: recording.duration,
    file_size: recording.file_size,
    created_at: recording.created_at
  }));
};

exports.findById = (id) => {
  return db.prepare(`
    SELECT ur.*, p.title as poem_title 
    FROM user_recordings ur
    JOIN poems p ON ur.poem_id = p.id
    WHERE ur.id = ?
  `).get(id);
};

exports.deleteById = (id) => {
  const result = db.prepare('DELETE FROM user_recordings WHERE id = ?').run(id);
  return result.changes > 0;
};