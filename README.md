# 浙江工商大学学生社团管理中心宣传网站

一个以真实校园摄影为核心、采用 Bauhaus × Swiss Grid 视觉系统的多页面宣传网站。

## 页面

- `/`：HOME 品牌首页
- `/about`：ABOUT 中心介绍、职能与价值观
- `/departments`：DEPARTMENTS 六部门目录与详情
- `/events`：EVENTS 代表性活动切换
- `/archive`：ARCHIVE 年份筛选与大图预览
- `/join`：JOIN 招新与公众号二维码

## 安装与启动

```powershell
npm.cmd ci
$env:WRANGLER_LOG_PATH=".wrangler/wrangler.log"
npx.cmd vinext dev
```

浏览器访问 `http://localhost:3000/`。

## 构建

```powershell
$env:WRANGLER_LOG_PATH=".wrangler/wrangler.log"
npx.cmd vinext build
```

构建结果位于 `dist/`。

## 内容修改

主要文字与数据集中在 `app/site-shell.tsx`：

- `departments`：部门名称、简介、职责、关键词和图片
- `events`：活动名称、时间、简介和图片
- `archive`：档案年份、标题、日期和图片
- `Home`：首页主标题、标语和中心定位
- `Join`：招新步骤与公众号说明
- `navItems`：导航名称、编号和路由

## 图片替换

网站图片位于 `public/assets/`。替换时建议：

1. 优先使用 WebP；
2. 保持照片长边不超过 1800px；
3. 首页主图替换 `public/assets/hero-night.webp`；
4. 公众号二维码替换 `public/assets/wechat-qr.jpg`；
5. 分享封面替换 `public/og.png`；
6. 修改文件名后，同步更新 `app/site-shell.tsx` 中的路径。

## 部署

项目使用 vinext 构建为 Cloudflare Worker 兼容产物，并通过 Sites 保存版本和部署。

项目也支持 GitHub Pages 静态部署：

```powershell
$env:PAGES_BUILD="true"
$env:NEXT_PUBLIC_BASE_PATH="/zjsu-sg"
$env:NEXT_PUBLIC_SITE_URL="https://fshfish88-lab.github.io/zjsu-sg"
npm.cmd run build:pages
npm.cmd run test:pages
```

推送到 `main` 后，`.github/workflows/deploy-pages.yml` 会自动构建并发布
`out/`，网址为 `https://fshfish88-lab.github.io/zjsu-sg/`。

## 项目分类

- `outputs/`：面向交付的说明文件
- `work/`：过程脚本、文本提取和临时预览
- `public/assets/`：网站正式图片素材
- `app/`：页面与样式源码
