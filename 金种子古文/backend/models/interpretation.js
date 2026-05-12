const db = require('../database/connection');

exports.getByPoemId = (poemId) => {
  const interpretations = db.prepare(`
    SELECT * FROM interpretations WHERE poem_id = ? ORDER BY scene_type, order_num
  `).all(poemId);
  
  const grouped = {
    open: [],
    mid: [],
    end: []
  };
  
  interpretations.forEach(interp => {
    if (grouped[interp.scene_type]) {
      grouped[interp.scene_type].push({
        order_num: interp.order_num,
        content: interp.content,
        audio_url: interp.audio_url
      });
    }
  });
  
  return grouped;
};