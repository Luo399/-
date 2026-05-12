const InterpretationModel = require('../models/interpretation');
const { success, fail } = require('../utils/response');

exports.getByPoemId = (req, res, next) => {
  try {
    const { poemId } = req.params;
    const interpretations = InterpretationModel.getByPoemId(poemId);
    success(res, interpretations, '获取成功');
  } catch (error) {
    next(error);
  }
};