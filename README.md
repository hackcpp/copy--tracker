# Copy Tracker Chrome Extension

## 项目概述
一个用于记录用户复制内容的Chrome浏览器扩展，能够记录每次复制的内容、时间和来源URL，并以列表形式展示记录。

## 主要功能
- 自动记录复制内容
- 显示复制时间和来源URL
- 支持删除单条记录
- 数据存储在本地
- 简洁直观的用户界面

## 技术栈
- HTML/CSS/JavaScript
- Chrome Extension API
- Manifest V3

## 文件结构
```
.
├── manifest.json        # 扩展配置文件
├── background.js        # 后台脚本
├── content.js           # 内容脚本
├── popup.html           # 弹出窗口界面
├── popup.js             # 弹出窗口逻辑
├── popup.css            # 弹出窗口样式
├── icons/               # 图标资源
│   └── icon.svg         # 扩展图标
└── README.md            # 项目文档
```

## 开发过程
### v1.0.0 - 初始版本
- 实现核心功能：记录复制内容、时间和URL
- 创建弹出窗口界面
- 添加删除单条记录功能
- 优化UI设计
- 添加图标和样式

## 安装说明
1. 下载项目代码
2. 打开Chrome浏览器
3. 进入 chrome://extensions/
4. 启用"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择项目目录

## 未来计划
- 添加搜索功能
- 支持导出记录
- 增加分类标签功能
- 实现跨设备同步
