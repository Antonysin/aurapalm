# AuraPalm 项目记忆

## 项目概述
- **名称**: AuraPalm
- **类型**: AI 手相/面相分析网站
- **目标用户**: 英语国际用户， wellness/self-discovery 市场
- **风格**: Style 3 Organic Ethereal + Style 1 Celestial Minimal 字体

## 技术栈
- Next.js 16.2.4 + React 19 + TypeScript
- Tailwind CSS v4
- APIMart API (OpenAI 兼容)
- html-to-image (客户端截图)

## 设计风格
- **主色调**: 温暖沙色 #F3EDE4, 陶土色 #B85C38, 赭石色 #C9A227
- **字体**: Cormorant Garamond (标题) + Inter (正文) + Space Grotesk (标签)
- **特点**: 有机 Blob 背景、药丸形按钮、圆角卡片、温暖棕色文字

## 已完成功能
1. ✅ 首页完整内容 (Hero, How It Works, What We Analyze, Pricing, FAQ, Testimonials)
2. ✅ 上传页面 (Palm/Face) - 拖拽上传、图片预览
3. ✅ 结果页面 - 能量分数圆环、预览文本、Blur Paywall
4. ✅ AI 报告生成 - GPT-Image-2 生成精美报告图片
5. ✅ 设计系统统一 - surface-card, terracotta/ochre 颜色
6. ✅ GitHub 仓库: https://github.com/Antonysin/aurapalm

## API 配置
- **Base URL**: https://api.apimart.ai/v1
- **Key**: sk-aFCKgQEqy0NsupKao1eL2z89RiuXDUkIbHOi4TmAtrtdYrbH
- **模型**: 
  - gpt-4o (聊天/分析)
  - gpt-image-2-official (图片生成)

## 已知问题
1. GPT-4o 拒绝分析手掌照片 (安全策略)
2. 解决方案: 使用内置诗意描述库 (5条高质量描述随机选择)
3. GPT-Image-2 是异步任务，需要轮询 (~30-60秒)

## 待开发功能
1. ⏳ Stripe 支付集成
2. ⏳ 用户系统 (登录/历史记录)
3. ⏳ PDF 下载功能
4. ⏳ 部署到 Vercel
5. ⏳ 真正的个性化分析 (替代方案)

## 测试页面
- /test-ai-report - AI 报告生成测试
- /test-image2 - Image2 API 测试
- /test-report - HTML/CSS 报告测试

## 文件结构关键
```
src/
  app/api/
    analyze-palm/ - AI 分析 API
    generate-report-image/ - 报告图片生成
  components/
    report/ReportCard.tsx - HTML 报告卡片
  lib/prompts.ts - 内置 Prompt 库
```

## 成本估算
- GPT-4o Vision: ~$0.01/次 (目前未使用)
- GPT-Image-2: ~$1.50-2.00/张 (HD 质量)
- HTML/CSS 方案: 免费

## 设计决策
- 质量优先，成本暂不考虑 (测试阶段)
- 最终产品可能混合: HTML/CSS 基础版 + GPT-Image-2 高级版
