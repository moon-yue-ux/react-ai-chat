# React AI Chat Interface

一个现代化的AI聊天界面，使用React + TypeScript构建。

## 功能特点

- 🎨 现代化的UI设计，支持响应式布局
- 💬 实时聊天界面，模拟AI对话
- ⚡ 流畅的动画效果和交互体验
- 📱 完全响应式设计，支持移动端
- 🎭 打字指示器和消息状态
- 🌈 渐变背景和毛玻璃效果
- ✨ 动态图标和微交互

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **CSS3** - 现代化样式和动画
- **Lucide React** - 图标库
- **GitHub Pages** - 部署平台

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm start
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
```

### 部署到GitHub Pages

```bash
npm run deploy
```

## 项目结构

```
src/
├── components/          # React组件
│   ├── ChatInterface.tsx    # 主聊天界面组件
│   └── ChatInterface.css    # 聊天界面样式
├── types/              # TypeScript类型定义
│   └── chat.ts             # 聊天相关类型
├── App.tsx             # 主应用组件
├── App.css             # 应用样式
├── index.tsx           # 应用入口
└── index.css           # 全局样式
```

## 界面特色

### 设计亮点
- **毛玻璃效果**: 使用backdrop-filter实现现代化视觉效果
- **动态渐变**: 多层渐变背景营造深度感
- **微动画**: 消息出现、按钮悬停等细节动画
- **响应式设计**: 适配桌面端和移动端

### 交互特性
- **智能输入框**: 自动调整高度，支持多行输入
- **消息状态**: 显示发送时间和打字状态
- **键盘快捷键**: Enter发送，Shift+Enter换行
- **滚动优化**: 新消息自动滚动到底部

## 自定义开发

### 修改AI回复逻辑

编辑 `src/components/ChatInterface.tsx` 中的 `simulateAIResponse` 函数：

```typescript
const simulateAIResponse = (userMessage: string): string => {
  // 在这里添加你的AI回复逻辑
  // 可以集成真实的AI API
  return "你的AI回复";
};
```

### 样式自定义

主要样式文件：
- `src/components/ChatInterface.css` - 聊天界面样式
- `src/App.css` - 整体应用样式
- `src/index.css` - 全局样式

### 添加新功能

项目支持轻松扩展：
- 文件上传支持
- 语音消息
- 表情符号
- 主题切换
- 多语言支持

## 部署

项目已配置GitHub Pages自动部署：

1. 推送代码到main分支
2. 运行 `npm run deploy`
3. 访问 https://moon-yue-ux.github.io/react-ai-chat

## 开发计划

- [ ] 集成真实AI API（OpenAI、Claude等）
- [ ] 添加文件上传功能
- [ ] 支持markdown渲染
- [ ] 添加语音输入
- [ ] 实现聊天历史保存
- [ ] 添加主题切换
- [ ] 支持多语言

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License

---

⭐ 如果这个项目对你有帮助，欢迎给个星星！