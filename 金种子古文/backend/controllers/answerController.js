const AnswerModel = require('../models/answer');
const QuestionModel = require('../models/question');
const { success, fail } = require('../utils/response');

exports.submit = (req, res, next) => {
  try {
    const { question_id, answer, user_id } = req.body;
    
    if (!question_id || !answer || !user_id) {
      return fail(res, '缺少必填参数', 400);
    }
    
    const question = QuestionModel.findById(question_id);
    if (!question) {
      return fail(res, '题目不存在', 404);
    }
    
    let isCorrect = false;
    let feedback = '';
    
    if (question.type === 'match') {
      try {
        const userAnswer = JSON.parse(answer);
        const correctAnswer = question.correct_answer;
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
      } catch {
        isCorrect = false;
      }
    } else {
      isCorrect = answer === question.correct_answer;
    }
    
    feedback = isCorrect ? question.feedback_correct : question.feedback_wrong;
    
    AnswerModel.saveAnswer(user_id, question_id, answer, isCorrect);
    
    success(res, { is_correct: isCorrect ? 1 : 0, feedback }, '提交成功');
  } catch (error) {
    next(error);
  }
};

exports.getByUserId = (req, res, next) => {
  try {
    const { userId } = req.params;
    const answers = AnswerModel.getByUserId(userId);
    success(res, answers, '获取成功');
  } catch (error) {
    next(error);
  }
};