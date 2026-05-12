const db = require('./connection');

const poemContent = JSON.stringify([
  "少无适俗韵，性本爱丘山。",
  "误落尘网中，一去三十年。",
  "羁鸟恋旧林，池鱼思故渊。",
  "开荒南野际，守拙归园田。"
]);

const pinyinMap = JSON.stringify({
  '少': 'shào', '无': 'wú', '适': 'shì', '俗': 'sú', '韵': 'yùn',
  '性': 'xìng', '本': 'běn', '爱': 'ài', '丘': 'qiū', '山': 'shān',
  '误': 'wù', '落': 'luò', '尘': 'chén', '网': 'wǎng', '中': 'zhōng',
  '一': 'yī', '去': 'qù', '三': 'sān', '十': 'shí', '年': 'nián',
  '羁': 'jī', '鸟': 'niǎo', '恋': 'liàn', '旧': 'jiù', '林': 'lín',
  '池': 'chí', '鱼': 'yú', '思': 'sī', '故': 'gù', '渊': 'yuān',
  '开': 'kāi', '荒': 'huāng', '南': 'nán', '野': 'yě', '际': 'jì',
  '守': 'shǒu', '拙': 'zhuō', '归': 'guī', '园': 'yuán', '田': 'tián'
});

const annotation = JSON.stringify({
  '适俗': '适应世俗。',
  '韵': '气质，情致。',
  '丘山': '指山林。',
  '尘网': '指世俗的种种束缚。',
  '一去三十年': '陶渊明大约二十五岁离开少时居所，直到五十五岁辞去彭泽令方归，所以说“一去三十年”。或疑当作“十三年”，自开始做官至辞去彭泽令，前后为十三年。',
  '羁鸟': '被关在笼中的鸟。羁，约束。',
  '南野': '南面的田野。一作“南亩”，指农田。',
  '守拙': '持守愚拙的本性，即不学巧伪，不争名利。'
});

const insertPoem = db.prepare(`
  INSERT OR REPLACE INTO poems (id, title, author, dynasty, content, pinyin_map, annotation, audio_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

insertPoem.run(1, '归园田居·其一', '陶渊明', '魏晋', poemContent, pinyinMap, annotation, '/uploads/audio/poem1.mp3');

const insertInterpretation = db.prepare(`
  INSERT OR REPLACE INTO interpretations (id, poem_id, scene_type, order_num, content, audio_url)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const interpretations = [
  { id: 1, poem_id: 1, scene_type: 'open', order_num: 0, content: '我生来便没有迎合世俗的性情与韵味，心底最眷恋的，从来都是那青峦叠翠、草木葱茏的丘山。', audio_url: '/uploads/audio/interpret_open_1.mp3' },
  { id: 2, poem_id: 1, scene_type: 'open', order_num: 1, content: '自小便爱那山间的清风，爱那田埂上的草木，爱那无拘无束的自在，不喜欢尘世里的繁文缛节，更厌弃官场中的趋炎附势、勾心斗角。', audio_url: '/uploads/audio/interpret_open_2.mp3' },
  { id: 3, poem_id: 1, scene_type: 'mid', order_num: 0, content: '可世事无常，我竟不慎误入那世俗的尘网之中，一身棱角被官场的规矩磨得斑驳，一身心性被世俗的喧嚣扰得难安。', audio_url: '/uploads/audio/interpret_mid_1.mp3' },
  { id: 4, poem_id: 1, scene_type: 'mid', order_num: 1, content: '这一困，便是三十年啊。', audio_url: '/uploads/audio/interpret_mid_2.mp3' },
  { id: 5, poem_id: 1, scene_type: 'mid', order_num: 2, content: '三十年里，我如同被束缚在笼中的鸟儿，日日望着窗外的天空，念着旧时栖息的山林；', audio_url: '/uploads/audio/interpret_mid_3.mp3' },
  { id: 6, poem_id: 1, scene_type: 'mid', order_num: 3, content: '又似那被圈养在池塘里的游鱼，时时摆着尾鳍，思念着曾经畅游的深渊，那般煎熬，那般怅惘，唯有心底对丘山田园的眷恋，从未有过半分消减。', audio_url: '/uploads/audio/interpret_mid_4.mp3' },
  { id: 7, poem_id: 1, scene_type: 'end', order_num: 0, content: '如今，我终于挣脱了那尘网的桎梏，褪去了官场的浮华，决意坚守本心，归于质朴。', audio_url: '/uploads/audio/interpret_end_1.mp3' },
  { id: 8, poem_id: 1, scene_type: 'end', order_num: 1, content: '我在南边的田野间开垦荒地，一锄一犁，皆是心安；褪去一身机巧，守着这份愚拙本真，重新回到了魂牵梦萦的园田之中。', audio_url: '/uploads/audio/interpret_end_2.mp3' },
  { id: 9, poem_id: 1, scene_type: 'end', order_num: 2, content: '脚下是松软的泥土，鼻尖是草木的清香，耳边是风声、虫鸣，还有田埂间的细碎声响，这般自在惬意，才是我此生所求，才是我本该拥有的模样。', audio_url: '/uploads/audio/interpret_end_3.mp3' }
];

interpretations.forEach(interp => {
  insertInterpretation.run(interp.id, interp.poem_id, interp.scene_type, interp.order_num, interp.content, interp.audio_url);
});

const insertQuestion = db.prepare(`
  INSERT OR REPLACE INTO questions (id, poem_id, type, question_text, options, correct_answer, audio_url, feedback_correct, feedback_wrong)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const questions = [
  {
    id: 1,
    poem_id: 1,
    type: 'audio_choice',
    question_text: '① 误落尘网中，一去三十年。',
    options: JSON.stringify(['A. 懊悔、厌倦', 'B. 开心、向往', 'C. 平淡、无所谓']),
    correct_answer: 'A',
    audio_url: '/uploads/audio/quiz1.mp3',
    feedback_correct: '太准了！‘误落’二字藏着懊悔，‘一去三十年’满是对官场生活的厌倦，你抓住了诗句的情感核心。',
    feedback_wrong: '再听听音频哦，“误落”说明诗人不是自愿进入官场，“尘网”也体现了他对官场的排斥，再试试吧！'
  },
  {
    id: 2,
    poem_id: 1,
    type: 'audio_choice',
    question_text: '② 开荒南野际，守拙归园田。',
    options: JSON.stringify(['A. 懊悔、厌倦', 'B. 开心、向往', 'C. 平淡、无所谓']),
    correct_answer: 'B',
    audio_url: '/uploads/audio/quiz2.mp3',
    feedback_correct: '没错！“开荒”“归园田”都是诗人主动的选择，藏着他对田园生活的期待和回归本心的喜悦。',
    feedback_wrong: '再仔细品味一下，诗人放弃官场，选择回到田园开荒，这是他向往的生活，再试试吧！'
  },
  {
    id: 3,
    poem_id: 1,
    type: 'match',
    question_text: '意象匹配 · 拖拽归心',
    options: JSON.stringify({ '羁鸟': '诗人自己', '池鱼': '诗人自己', '旧林': '自然/田园', '故渊': '自然/田园' }),
    correct_answer: JSON.stringify({ '羁鸟': '诗人自己', '池鱼': '诗人自己', '旧林': '自然/田园', '故渊': '自然/田园' }),
    feedback_correct: '完美匹配！“羁鸟”“池鱼”喻诗人受束缚，“旧林”“故渊”喻田园故乡，归心似箭，意境全出。',
    feedback_wrong: ''
  },
  {
    id: 4,
    poem_id: 1,
    type: 'multiple_choice',
    question_text: '题干：“羁鸟恋旧林，池鱼思故渊”运用比喻手法，其表达效果是（ ）',
    options: JSON.stringify([
      'A. 生动形象地写出了鸟和鱼的思乡之情，突出自然的美好',
      'B. 生动形象地写出了诗人被官场束缚的痛苦，以及对田园生活的强烈向往',
      'C. 突出了鸟和鱼的自由，表达了诗人对动物的喜爱',
      'D. 简洁明了地写出了田园生活的美好，表达诗人的喜悦'
    ]),
    correct_answer: 'B',
    feedback_correct: '精准！比喻的核心是“借物喻人”，诗人借羁鸟、池鱼的处境，写出了自己被官场束缚的无奈，以及对田园的思念，让情感更生动、更真切。',
    feedback_wrong: '注意哦！这句诗的核心是“写人”，不是“写鸟和鱼”，诗人是借鸟和鱼的感受表达自己的心境，再仔细想想吧！'
  }
];

questions.forEach(q => {
  insertQuestion.run(q.id, q.poem_id, q.type, q.question_text, q.options, q.correct_answer, q.audio_url, q.feedback_correct, q.feedback_wrong);
});

console.log('✅ 数据初始化完成！');
process.exit(0);