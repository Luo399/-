const db = require('../database/connection');

exports.getByPoemId = (poemId) => {
  const questions = db.prepare(`
    SELECT * FROM questions WHERE poem_id = ? ORDER BY id
  `).all(poemId);
  
  return questions.map(q => {
    let options;
    try {
      options = JSON.parse(q.options);
    } catch {
      options = q.options;
    }
    
    let correctAnswer;
    try {
      correctAnswer = JSON.parse(q.correct_answer);
    } catch {
      correctAnswer = q.correct_answer;
    }
    
    return {
      id: q.id,
      type: q.type,
      question_text: q.question_text,
      options,
      correct_answer: correctAnswer,
      audio_url: q.audio_url,
      feedback_correct: q.feedback_correct,
      feedback_wrong: q.feedback_wrong,
      poem_id: q.poem_id
    };
  });
};

exports.findById = (id) => {
  const question = db.prepare('SELECT * FROM questions WHERE id = ?').get(id);
  if (!question) return null;
  
  let options;
  try {
    options = JSON.parse(question.options);
  } catch {
    options = question.options;
  }
  
  let correctAnswer;
  try {
    correctAnswer = JSON.parse(question.correct_answer);
  } catch {
    correctAnswer = question.correct_answer;
  }
  
  return {
    ...question,
    options,
    correct_answer: correctAnswer
  };
};