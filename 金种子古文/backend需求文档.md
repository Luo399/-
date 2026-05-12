# 金种子古文学习平台 - 后端需求文档

## 一、项目概述

本项目是一个古文学习平台，前端已实现三个核心功能模块：**诵读页**、**心声页**、**探究页**。后端需要提供数据支撑和API接口，配合前端完成完整的学习体验。

***

## 二、功能模块需求

### 2.1 诵读页功能

**前端已实现：**

- 古诗展示（《归园田居·其一》）
- 拼音标注显示
- 听音播放功能（使用Base64音频）
- 麦克风录音功能
- 音量检测与Emoji动画互动

**后端需要支持：**

| 功能点  | 需求描述                   | 优先级 |
| ---- | ---------------------- | --- |
| 古诗数据 | 获取古诗详情（标题、作者、朝代、诗句、拼音） | 高   |
| 音频资源 | 提供朗诵音频文件（MP3格式）        | 高   |
| 录音上传 | 用户录音文件上传与存储            | 中   |
| 录音管理 | 获取用户历史录音列表             | 中   |

***

### 2.2 心声页功能

**前端已实现：**

- 陶渊明角色动画行走
- 场景切换（开场/中间/结尾）
- 诗句解读文本展示
- 听音播放功能

**后端需要支持：**

| 功能点  | 需求描述            | 优先级 |
| ---- | --------------- | --- |
| 解读文本 | 获取诗句解读内容（按场景分段） | 高   |
| 解读音频 | 提供解读音频文件        | 高   |
| 学习记录 | 记录用户观看进度        | 中   |

***

### 2.3 探究页功能

**前端已实现：**

- 词语注释展示（点击查看）
- 听音辨情选择题
- 意象匹配拖拽题
- 表达效果选择题

**后端需要支持：**

| 功能点  | 需求描述             | 优先级 |
| ---- | ---------------- | --- |
| 词语注释 | 获取古诗词语注释列表       | 高   |
| 题目数据 | 获取探究题目（音频、选项、答案） | 高   |
| 答题记录 | 记录用户答题结果         | 高   |
| 成绩统计 | 获取用户答题成绩         | 中   |

***

## 三、数据模型设计

### 3.1 古诗表（poems）

| 字段名         | 类型       | 说明                 |
| ----------- | -------- | ------------------ |
| id          | INTEGER  | 主键，自增              |
| title       | TEXT     | 古诗标题               |
| author      | TEXT     | 作者                 |
| dynasty     | TEXT     | 朝代                 |
| content     | TEXT     | 完整内容（JSON格式存储诗句数组） |
| pinyin\_map | TEXT     | 拼音映射（JSON格式）       |
| annotation  | TEXT     | 注释内容（JSON格式）       |
| audio\_url  | TEXT     | 朗诵音频URL            |
| created\_at | DATETIME | 创建时间               |
| updated\_at | DATETIME | 更新时间               |

### 3.2 解读表（interpretations）

| 字段名         | 类型      | 说明                 |
| ----------- | ------- | ------------------ |
| id          | INTEGER | 主键，自增              |
| poem\_id    | INTEGER | 关联古诗ID             |
| scene\_type | TEXT    | 场景类型（open/mid/end） |
| order\_num  | INTEGER | 顺序编号               |
| content     | TEXT    | 解读文本               |
| audio\_url  | TEXT    | 解读音频URL            |

### 3.3 题目表（questions）

| 字段名               | 类型      | 说明                                         |
| ----------------- | ------- | ------------------------------------------ |
| id                | INTEGER | 主键，自增                                      |
| poem\_id          | INTEGER | 关联古诗ID                                     |
| type              | TEXT    | 题目类型（audio\_choice/match/multiple\_choice） |
| question\_text    | TEXT    | 题目描述                                       |
| options           | TEXT    | 选项（JSON数组）                                 |
| correct\_answer   | TEXT    | 正确答案                                       |
| audio\_url        | TEXT    | 音频URL（音频题）                                 |
| feedback\_correct | TEXT    | 正确反馈                                       |
| feedback\_wrong   | TEXT    | 错误反馈                                       |

### 3.4 用户答题记录表（user\_answers）

| 字段名          | 类型       | 说明        |
| ------------ | -------- | --------- |
| id           | INTEGER  | 主键，自增     |
| user\_id     | INTEGER  | 关联用户ID    |
| question\_id | INTEGER  | 关联题目ID    |
| answer       | TEXT     | 用户答案      |
| is\_correct  | INTEGER  | 是否正确（0/1） |
| created\_at  | DATETIME | 答题时间      |

### 3.5 用户录音表（user\_recordings）

| 字段名         | 类型       | 说明      |
| ----------- | -------- | ------- |
| id          | INTEGER  | 主键，自增   |
| user\_id    | INTEGER  | 关联用户ID  |
| poem\_id    | INTEGER  | 关联古诗ID  |
| audio\_path | TEXT     | 录音文件路径  |
| duration    | INTEGER  | 录音时长（秒） |
| created\_at | DATETIME | 创建时间    |

***

## 四、API接口设计

### 4.1 古诗相关接口

| API路径            | HTTP方法 | 功能描述     |
| ---------------- | ------ | -------- |
| `/api/poem/list` | GET    | 获取古诗列表   |
| `/api/poem/:id`  | GET    | 获取单首古诗详情 |

**GET /api/poem/list 响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "归园田居·其一",
      "author": "陶渊明",
      "dynasty": "魏晋"
    }
  ],
  "message": "获取成功"
}
```

**GET /api/poem/:id 响应示例：**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "归园田居·其一",
    "author": "陶渊明",
    "dynasty": "魏晋",
    "content": ["少无适俗韵，性本爱丘山。", "误落尘网中，一去三十年。", "羁鸟恋旧林，池鱼思故渊。", "开荒南野际，守拙归园田。"],
    "pinyin_map": {"少": "shào", "无": "wú", ...},
    "annotation": {"适俗": "适应世俗。", "韵": "气质，情致。", ...},
    "audio_url": "/uploads/audio/poem1.mp3"
  },
  "message": "获取成功"
}
```

### 4.2 解读相关接口

| API路径                         | HTTP方法 | 功能描述     |
| ----------------------------- | ------ | -------- |
| `/api/interpretation/:poemId` | GET    | 获取古诗解读列表 |

**GET /api/interpretation/:poemId 响应示例：**

```json
{
  "success": true,
  "data": {
    "open": [
      {"order_num": 0, "content": "我生来便没有迎合世俗的性情与韵味...", "audio_url": "/uploads/audio/interpret_open_1.mp3"},
      {"order_num": 1, "content": "自小便爱那山间的清风...", "audio_url": "/uploads/audio/interpret_open_2.mp3"}
    ],
    "mid": [...],
    "end": [...]
  },
  "message": "获取成功"
}
```

### 4.3 题目相关接口

| API路径                   | HTTP方法 | 功能描述       |
| ----------------------- | ------ | ---------- |
| `/api/question/:poemId` | GET    | 获取古诗相关题目列表 |

**GET /api/question/:poemId 响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "audio_choice",
      "question_text": "① 误落尘网中，一去三十年。",
      "options": ["A. 懊悔、厌倦", "B. 开心、向往", "C. 平淡、无所谓"],
      "correct_answer": "A",
      "audio_url": "/uploads/audio/quiz1.mp3",
      "feedback_correct": "太准了！‘误落’二字藏着懊悔...",
      "feedback_wrong": "再听听音频哦...",
      "poem_id": 1
    },
    {
      "id": 2,
      "type": "match",
      "question_text": "意象匹配",
      "options": {"羁鸟": "诗人自己", "池鱼": "诗人自己", "旧林": "自然/田园", "故渊": "自然/田园"},
      "correct_answer": {"羁鸟": "诗人自己", ...},
      "feedback_correct": "完美匹配！...",
      "poem_id": 1
    }
  ],
  "message": "获取成功"
}
```

### 4.4 用户答题接口

| API路径                 | HTTP方法 | 功能描述     |
| --------------------- | ------ | -------- |
| `/api/answer/submit`  | POST   | 提交答题记录   |
| `/api/answer/:userId` | GET    | 获取用户答题记录 |

**POST /api/answer/submit 请求示例：**

```json
{
  "question_id": 1,
  "answer": "A",
  "user_id": 1
}
```

**POST /api/answer/submit 响应示例：**

```json
{
  "success": true,
  "data": {
    "is_correct": 1,
    "feedback": "太准了！‘误落’二字藏着懊悔..."
  },
  "message": "提交成功"
}
```

**GET /api/answer/:userId 响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question_id": 1,
      "answer": "A",
      "is_correct": 1,
      "created_at": "2026-05-10T14:30:00.000Z"
    },
    {
      "id": 2,
      "question_id": 2,
      "answer": "{\"羁鸟\":\"诗人自己\",\"池鱼\":\"诗人自己\"}",
      "is_correct": 1,
      "created_at": "2026-05-10T14:31:00.000Z"
    },
    {
      "id": 3,
      "question_id": 3,
      "answer": "B",
      "is_correct": 0,
      "created_at": "2026-05-10T14:32:00.000Z"
    }
  ],
  "message": "获取成功"
}
```

### 4.5 用户录音接口

| API路径                    | HTTP方法 | 功能描述     |
| ------------------------ | ------ | -------- |
| `/api/recording/upload`  | POST   | 上传用户录音   |
| `/api/recording/:userId` | GET    | 获取用户录音列表 |
| `/api/recording/:id`     | DELETE | 删除录音     |

**POST /api/recording/upload（multipart/form-data）：**

请求体（表单字段）：

| 字段          | 类型      | 说明                        |
| ----------- | ------- | ------------------------- |
| audio\_file | File    | 录音文件（仅允许 WAV、MP3，最大 10MB） |
| poem\_id    | INTEGER | 关联的古诗 ID                  |
| user\_id    | INTEGER | 用户 ID                     |

**POST /api/recording/upload 响应示例（成功）：**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "poem_id": 1,
    "user_id": 1,
    "audio_path": "/uploads/audio/user1_poem1_20260510_143000.mp3",
    "duration": 22,
    "file_size": 358400,
    "created_at": "2026-05-10T14:30:00.000Z"
  },
  "message": "上传成功"
}
```

**错误响应（文件类型不合法）：**

```json
{
  "success": false,
  "data": null,
  "message": "仅支持 WAV、MP3 格式的音频文件"
}
```

**GET /api/recording/:userId 响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "poem_id": 1,
      "poem_title": "归园田居·其一",
      "audio_path": "/uploads/audio/user1_poem1_20260510_143000.mp3",
      "duration": 22,
      "file_size": 358400,
      "created_at": "2026-05-10T14:30:00.000Z"
    },
    {
      "id": 2,
      "poem_id": 1,
      "poem_title": "归园田居·其一",
      "audio_path": "/uploads/audio/user1_poem1_20260510_150000.mp3",
      "duration": 18,
      "file_size": 295000,
      "created_at": "2026-05-10T15:00:00.000Z"
    }
  ],
  "message": "获取成功"
}
```

**DELETE /api/recording/:id**

无需请求体，仅需在 URL 中指定录音 ID。

**DELETE /api/recording/2 响应示例：**

```json
{
  "success": true,
  "data": null,
  "message": "录音已删除"
}
```

**错误（录音不存在）：**

```json
{
  "success": false,
  "data": null,
  "message": "录音记录不存在"
}
```

***

## 五、接口响应格式规范

所有接口响应必须遵循统一格式：

```json
{
  "success": true,
  "data": {...},
  "message": "操作成功"
}
```

**错误响应：**

```json
{
  "success": false,
  "data": null,
  "message": "错误描述"
}
```

***

## 六、状态码规范

| 状态码 | 含义       |
| --- | -------- |
| 200 | 成功       |
| 400 | 参数错误     |
| 401 | 未授权（需登录） |
| 404 | 资源不存在    |
| 500 | 服务器异常    |

***

## 七、部署适配要求

1. **文件存储**：音频文件存储于 `uploads/audio/` 目录
2. **数据库**：SQLite，数据库文件存储于 `database/` 目录
3. **跨域配置**：支持GitHub Pages域名跨域
4. **环境变量**：端口、CORS域名等配置通过 `.env` 文件管理

***

## 八、后续扩展需求

1. **学习进度追踪**：记录用户学习时长、完成题目数
2. **成就系统**：答题成就、学习徽章
3. **社交分享**：分享学习成果到社交平台
4. **多诗扩展**：支持多首古诗的学习内容

## 九、技术选型与工程结构要求

### 9.1 项目分层

后端项目：独立目录 `backend/`，提供 RESTful API，使用 Node.js + Express + SQLite（better-sqlite3）。

### 9.2 后端目录结构

```
backend/                          # 后端项目根目录（Node.js + Express + SQLite）
 ├── .env.example                  # 环境变量示例文件，复制为 .env 后填入实际配置
 ├── package.json                  # 项目依赖与脚本（express, better-sqlite3, multer, cors, dotenv 等）
 ├── server.js                     # 启动入口：加载 app，监听端口，输出启动日志
 ├── app.js                        # Express 应用配置：挂载中间件、路由、静态资源、错误处理
 │
 ├── config/
 │   └── index.js                  # 集中读取 .env 并导出配置对象（PORT, CORS_ORIGIN, DB_PATH, UPLOAD_DIR 等）
 │
 ├── database/
 │   ├── .gitkeep                  # 保证空目录被 Git 跟踪（database.sqlite 不提交）
 │   ├── schema.sql                # 建表 SQL 脚本（poems, interpretations, questions, user_answers, user_recordings）
 │   ├── seed.js                   # 初始化数据脚本，用于插入《归园田居·其一》的示例古诗、解读、题目等
 │   └── connection.js             # 创建并导出 better-sqlite3 数据库连接实例（使用 config 中的路径）
 │
 ├── uploads/
 │   └── audio/                    # 存储静态音频文件（朗诵、解读音频等），由后端直接托管
 │       └── .gitkeep              # 保持空目录存在，实际上传的音频不提交到 Git
 │
 ├── routes/                       # 路由层：定义 API 路径，绑定 controller 方法
 │   ├── poem.js                   # /api/poem/* 路由：古诗列表、古诗详情
 │   ├── interpretation.js         # /api/interpretation/* 路由：获取解读分段内容
 │   ├── question.js               # /api/question/* 路由：获取题目列表
 │   ├── answer.js                 # /api/answer/* 路由：提交答题、获取答题记录
 │   └── recording.js              # /api/recording/* 路由：录音上传、列表、删除
 │
 ├── controllers/                  # 控制器层：解析请求参数，调用 model，包装响应
 │   ├── poemController.js         # 处理古诗相关逻辑（列表查询、详情查询，content/pinyin 从 JSON 字符串解析）
 │   ├── interpretationController.js  # 处理解读分段查询（按 scene_type 分组排序）
 │   ├── questionController.js     # 处理题目查询（返回选项、答案等，match 题型 JSON 解析）
 │   ├── answerController.js       # 处理答题提交（判断正误，返回对应反馈）、获取用户答题记录
 │   └── recordingController.js    # 处理录音上传（保存文件，写入 user_recordings 表）、列表查询、删除
 │
 ├── models/                       # 模型层：封装数据库操作，不处理 HTTP 请求/响应
 │   ├── poem.js                   # 诗歌相关数据库查询（findAll, findById）
 │   ├── interpretation.js         # 解读数据查询（getByPoemId）
 │   ├── question.js               # 题目数据查询（getByPoemId）
 │   ├── answer.js                 # 答题记录操作（saveAnswer, getByUserId）
 │   └── recording.js              # 录音记录操作（saveRecording, getByUserId, deleteById）
 │
 ├── middleware/                    # 中间件：可复用的请求处理组件
 │   ├── errorHandler.js           # 全局错误捕获中间件，返回统一错误 JSON { success: false, message }
 │   ├── validator.js              # 常用参数校验中间件（如验证 id 为数字、必填字段存在）
 │   └── upload.js                 # 配置 multer（存储路径、文件大小限制、格式过滤），导出上传实例
 │
 ├── utils/                        # 工具函数
 │   ├── response.js               # 统一响应封装函数 success(res, data, message) / fail(res, message, statusCode)
 │   └── logger.js                 # 可选：简单的控制台日志封装（带时间戳）
 │
 └── tests/                        # 测试文件夹（建议使用 mocha/chai 或 jest）
     ├── poem.test.js              # 古诗接口测试
     ├── interpretation.test.js
     ├── question.test.js
     ├── answer.test.js
     └── recording.test.js
```

### 9.3 关键文件内部要点速览

#### server.js

只负责引入 app.js 并监听端口，不包含其他逻辑。

#### app.js

按顺序执行：
1. 加载 `.env` 配置（`dotenv.config()`）
2. 实例化 Express
3. 使用 cors 中间件（读取允许的域名）
4. 解析 JSON 和 URL 编码请求体
5. 托管静态资源（`uploads/` 目录）
6. 挂载所有路由（`/api/poem`, `/api/interpretation` 等）
7. 注册 404 处理
8. 注册全局错误处理中间件 `errorHandler`

#### 数据库 connection.js

利用 `better-sqlite3` 连接 `database/database.sqlite`，开启 WAL 模式，执行一次 `schema.sql`（通常在应用启动时由 `server.js` 或专门的初始化函数完成）。

#### 路由文件示例（poem.js）

```js
const router = require('express').Router();
const controller = require('../controllers/poemController');
router.get('/list', controller.list);
router.get('/:id', controller.detail);
module.exports = router;
```

#### 控制器示例（poemController.js）

```js
const PoemModel = require('../models/poem');
const { success, fail } = require('../utils/response');

exports.list = (req, res, next) => { ... };
exports.detail = (req, res, next) => { ... };
```

#### 模型示例（poem.js）

```js
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
```

#### 工具 response.js

```js
exports.success = (res, data = null, message = '操作成功') => {
  return res.json({ success: true, data, message });
};

exports.fail = (res, message = '服务器错误', statusCode = 500) => {
  return res.status(statusCode).json({ success: false, data: null, message });
};
```

#### 错误处理 errorHandler.js

捕获程序中未处理的异常，记录日志，并调用 `fail` 返回统一错误信息。

#### 上传中间件 upload.js

配置 `multer.diskStorage`，限制文件大小、只允许 `audio/*`，存放于 `uploads/audio`，生成唯一文件名（如时间戳 + 随机数）。
