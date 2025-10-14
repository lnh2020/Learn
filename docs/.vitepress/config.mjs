import { defineConfig } from 'vitepress'
import { withI18n } from 'vitepress-i18n';
// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "学习笔记",
  description: "A VitePress Site",
  base: '/Learn/',
  srcDir: 'src',
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lnh2020/Learn' },
    ],

    darkModeSwitchLabel: '暗黑模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    // outlineTitle: "页面内容",
    // returnToTopLabel: "返回顶部",
    // sidebarMenuLabel: "菜单",
  }
}

const vitePressI18nOptions = {
  locales: ['zhHans'],
  rootLocale: 'zhHans',
  searchProvider: 'local'
};

export default defineConfig( withI18n(vitePressOptions, vitePressI18nOptions))
