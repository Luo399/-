const db = require('../database/connection');

exports.saveAnswer = (userId, questionId, answer, isCorrect) => {
  const insert = db.prepare(`
    INSERT INTO user_answers (user_id, question_id, answer, is_correct)
    VALUES (?, ?, ?, ?)
  `);
  const result = insert.run(userId, questionId, answer, isCorrect ? 1 : 0);
  return result.lastInsertRowid;
};

exports.getByUserId = (userId) => {
  const answers = db.prepare(`
    SELECT * FROM user_answers WHERE user_id = ? ORDER BY created_at DESC
  `).all(userId);
  
  return answers.map(answer => ({
    id: answer.id,
    question_id: answer.question_id,
    answer: answer.answer,
    is_correct: answer.is_correct,
    created_at: answer.created_at
  }));
};