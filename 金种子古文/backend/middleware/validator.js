const { fail } = require('../utils/response');

exports.validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(parseInt(id))) {
    return fail(res, '无效的ID参数', 400);
  }
  req.params.id = parseInt(id);
  next();
};

exports.validateRequired = (fields) => {
  return (req, res, next) => {
    const missing = [];
    fields.forEach(field => {
      if (!req.body[field] && !req.query[field] && !req.params[field]) {
        missing.push(field);
      }
    });
    if (missing.length > 0) {
      return fail(res, `缺少必填字段: ${missing.join(', ')}`, 400);
    }
    next();
  };
};

exports.validateUser = (req, res, next) => {
  const { user_id } = req.body;
  if (!user_id || isNaN(parseInt(user_id))) {
    return fail(res, '无效的用户ID', 400);
  }
  next();
};