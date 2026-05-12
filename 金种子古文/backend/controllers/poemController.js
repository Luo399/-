const PoemModel = require('../models/poem');
const { success, fail } = require('../utils/response');

exports.list = (req, res, next) => {
  try {
    const poems = PoemModel.findAll();
    success(res, poems, '获取成功');
  } catch (error) {
    next(error);
  }
};

exports.detail = (req, res, next) => {
  try {
    const { id } = req.params;
    const poem = PoemModel.findById(id);
    if (!poem) {
      return fail(res, '古诗不存在', 404);
    }
    success(res, poem, '获取成功');
  } catch (error) {
    next(error);
  }
};