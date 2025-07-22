# 塔罗牌占卜小游戏

一个基于 React + TypeScript + Vite 构建的现代化塔罗牌占卜应用，集成 Google Gemini AI 提供智能解读。

## ✨ 功能特点

- 🎴 **三种占卜牌阵**：单张牌、三张牌阵、凯尔特十字
- 🤖 **AI 智能解读**：集成 Google Gemini 模型提供深入的牌意分析
- 🎨 **精美动画**：使用 Framer Motion 实现流畅的交互动画
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🌟 **沉浸式体验**：神秘星空背景和浮动元素效果
- 🎯 **用户友好**：直观的操作流程和清晰的视觉反馈

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 配置 Gemini API
1. 获取 Google Gemini API Key：
   - 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
   - 登录您的 Google 账户
   - 点击 "Create API Key" 创建新的 API Key
   - 复制生成的 API Key

2. 配置 API Key（两种方式任选其一）：
   
   **方式一：使用环境变量（推荐）**
   - 复制 `.env.example` 文件为 `.env`
   - 在 `.env` 文件中设置：`VITE_GEMINI_API_KEY=your_actual_api_key`
   
   **方式二：直接修改代码**
   - 在 `src/api/gemini.ts` 中将 `YOUR_GEMINI_API_KEY_HERE` 替换为您的实际 API Key

3. **重要提醒**：
   - 请勿在代码中直接暴露真实的 API Key
   - 生产环境务必使用环境变量
   - 注意 API 使用配额和限制

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 🎮 使用说明

1. **欢迎页面**：点击"开始占卜之旅"进入应用
2. **选择牌阵**：根据需求选择单张牌、三张牌阵或凯尔特十字
3. **输入问题**：输入您想要询问的问题（最多200字）
4. **抽牌过程**：从牌堆中选择相应数量的塔罗牌
5. **AI解读**：获得基于 Gemini AI 的专业占卜解读
6. **查看结果**：查看详细的牌意解释和指导建议

## 🏗️ 技术架构

### 核心技术栈
- **React 18** - 现代 React 功能和 Hooks
- **TypeScript** - 类型安全和开发体验
- **Vite** - 快速构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - 高性能动画库
- **Google Generative AI** - Gemini API 集成

### 项目结构
```
src/
├── components/          # React 组件
│   ├── TarotCard.tsx   # 塔罗牌组件
│   ├── SpreadSelector.tsx  # 牌阵选择器
│   └── ReadingResult.tsx   # 结果展示
├── hooks/              # 自定义 Hooks
│   └── useTarotReading.ts  # 塔罗牌占卜逻辑
├── types/              # TypeScript 类型定义
│   └── tarot.ts        # 塔罗牌相关类型
├── data/               # 数据文件
│   └── tarotCards.ts   # 塔罗牌数据
├── api/                # API 集成
│   └── gemini.ts       # Gemini API 调用
└── App.tsx             # 主应用组件
```

## 🎨 设计特色

### 视觉效果
- 渐变色背景和星空动画效果
- 3D 翻牌动画和悬浮交互
- 响应式布局，适配各种屏幕尺寸
- 神秘主题配色方案

### 用户体验
- 流畅的页面切换动画
- 直观的操作指引
- 实时反馈和状态提示
- 优雅的加载动画

## 🔧 自定义配置

### 修改塔罗牌数据
编辑 `src/data/tarotCards.ts` 文件来添加或修改塔罗牌信息。

### 调整占卜牌阵
在 `src/hooks/useTarotReading.ts` 中的 `getPositionNames` 函数中添加新的牌阵类型。

### 自定义 AI 提示词
修改 `src/api/gemini.ts` 中的 `createTarotPrompt` 函数来调整 AI 解读的风格和内容。

## 🛠️ 开发指南

### 添加新组件
1. 在 `src/components/` 目录下创建新组件
2. 使用 TypeScript 进行类型定义
3. 集成 Framer Motion 动画效果
4. 遵循响应式设计原则

### 扩展功能
- 添加用户账户系统
- 实现占卜历史记录
- 增加更多牌阵类型
- 支持自定义牌组

## 📝 注意事项

1. **API Key 安全**：不要在客户端代码中暴露真实的 API Key，生产环境应使用环境变量
2. **API 配额**：注意 Gemini API 的使用限制和配额
3. **备用方案**：应用包含备用解读逻辑，确保在 API 不可用时仍能正常使用
4. **浏览器兼容性**：现代浏览器支持，建议使用 Chrome、Firefox、Safari 最新版本

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！