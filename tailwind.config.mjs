import { mtConfig } from "@material-tailwind/react";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#181c24",         // 主背景
          bgSoft: "#23283a",     // 卡片/浮层
          border: "#2d3344",     // 边框
          text: "#e5e7eb",       // 主文本
          textSoft: "#b6b8c3",   // 次文本
          accent: "#7dd3fc",     // 强调色（如按钮/链接）
          accent2: "#a5b4fc",    // 次强调色
          error: "#f87171",
          success: "#34d399",
        }
      }
    },
  },
  plugins: [
    mtConfig,
    require('@tailwindcss/typography'),
  ],
}

