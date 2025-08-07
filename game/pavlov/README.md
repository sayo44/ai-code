# 超市分拣员游戏

这是一个使用React和TypeScript构建的"超市分拣员"游戏，玩家需要将不同的商品分类放入对应的购物篮中。

## 项目特点

- 随机生成5个商品类别（从7个可能的类别中选择）
- 每次游戏生成约20个随机商品
- 支持移动端拖拽操作
- 响应式设计，适配不同屏幕尺寸
- 无需滚动，所有内容都在一个屏幕内显示

## 技术栈

- React 18
- TypeScript
- CSS3

## 云开发资源

本项目使用了以下腾讯云开发资源：

- **静态网站托管**：用于部署前端应用
  - 环境ID：cloud-env2-0g8pgbua1179ed35
  - 访问地址：https://cloud-env2-0g8pgbua1179ed35-1301104881.tcloudbaseapp.com/pavlov/

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 本地预览生产版本
npx serve -s build
```

## 部署到云开发

可以使用以下两种方式部署到云开发：

### 1. 使用CloudBase CLI

```bash
# 安装CloudBase CLI
npm install -g @cloudbase/cli

# 登录
tcb login

# 部署
tcb hosting:deploy ./build/ -e cloud-env2-0g8pgbua1179ed35 -p pavlov
```

### 2. 使用控制台上传

访问[腾讯云开发控制台](https://console.cloud.tencent.com/tcb/hosting)，选择对应环境，手动上传构建文件。

## 项目结构

```
src/
├── components/       # 组件目录
│   ├── Basket.tsx    # 购物篮组件
│   ├── Game.tsx      # 游戏主组件
│   └── GoodsItem.tsx # 商品项组件
├── App.tsx           # 应用入口组件
├── index.tsx         # 应用渲染入口
├── types.ts          # 类型定义
└── utils.ts          # 工具函数和数据
```

## 维护说明

- 商品类别和商品数据定义在`src/utils.ts`文件中
- 游戏逻辑在`src/components/Game.tsx`文件中
- 拖拽功能在`src/components/GoodsItem.tsx`文件中实现