import {
  defineConfig
} from "vitepress";
import {
  withI18n
} from "vitepress-i18n";
import {
  withSidebar
} from 'vitepress-sidebar';
// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "学习笔记",
  logo: '/logo.svg',
  description: "A VitePress Site",
  base: "/Learn/",
  srcDir: "src",
  lang: 'zhHans',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{
        text: "首页",
        link: "/"
      },
      {
        text: "TypeScript",
        link: "/typeScript/1.TypeScript 入门教程"
      },
      {
        text: "Linux",
        link: "/linux/1.用户相关"
      },
    ],

    search: {
      provider: "local",
    },

    outline: {
      level: [2, 6],
      label: '页面导航'
    },
  },
};

const vitePressI18nOptions = {
  locales: ["zhHans"],
  rootLocale: "zhHans",
  searchProvider: "local",
};

const vitePressSidebarOptions = {
  socialLinks: [{
    icon: "github",
    link: "https://github.com/lnh2020/Learn"
  }, ],

  darkModeSwitchLabel: "暗黑模式",
  lightModeSwitchTitle: "切换到浅色模式",
  darkModeSwitchTitle: "切换到深色模式",

  docFooter: {
    prev: "上一页",
    next: "下一页",
  },

  lastUpdated: {
    text: "更新于",
    formatOptions: {
      dateStyle: "full",
      timeStyle: "medium",
    },
  },
  outlineTitle: "页面内容",
  returnToTopLabel: "返回顶部",
  sidebarMenuLabel: "菜单",
  
  sortMenusOrderNumericallyFromTitle: true,
  documentRootPath: '/docs/src',
  collapsed: false,
  capitalizeFirst: true
};

export default defineConfig(
  withSidebar(withI18n(vitePressOptions, vitePressI18nOptions), vitePressSidebarOptions)
);