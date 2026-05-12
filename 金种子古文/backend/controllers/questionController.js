const QuestionModel = require('../models/question');
const { success, fail } = require('../utils/response');

exports.getByPoemId = (req, res, next) => {
  try {
    const { poemId } = req.params;
    const questions = QuestionModel.getByPoemId(poemId);
    success(res, questions, '获取成功');
  } catch (error) {
    next(error);
  }
};