exports.success = (res, data = null, message = '操作成功') => {
  return res.json({ success: true, data, message });
};

exports.fail = (res, message = '服务器错误', statusCode = 500) => {
  return res.status(statusCode).json({ success: false, data: null, message });
};