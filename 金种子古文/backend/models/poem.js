const db = require('../database/connection');

exports.findAll = () => {
  return db.prepare('SELECT id, title, author, dynasty FROM poems').all();
};

exports.findById = (id) => {
  const poem = db.prepare('SELECT * FROM poems WHERE id = ?').get(id);
  if (poem) {
    poem.content = JSON.parse(poem.content);
    poem.pinyin_map = JSON.parse(poem.pinyin_map);
    poem.annotation = JSON.parse(poem.annotation);
  }
  return poem;
};