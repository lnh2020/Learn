import { defineConfig } from "vitepress";
import { withI18n } from "vitepress-i18n";
// https://vitepress.dev/reference/site-config
const vitePressOptions = {
  title: "学习笔记",
  description: "A VitePress Site",
  base: "/Learn/",
  srcDir: "src",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "TypeScript", link: "/typeScript/TypeScript 入门教程" },
      { text: "Linux", link: "/linux/用户相关" },
    ],

    search: {
      provider: "local",
    },

    sidebar: {
      "/linux/": [{
        text: "Linux",
        items: [
          {text: '用户相关', link: '/linux/用户相关'},
          {text: '用户组管理', link: '/linux/用户组管理'},
          {text: '文件基础属性', link: '/linux/文件基础属性'},
          {text: '文件权限操作', link: '/linux/文件权限操作'},
          {text: '处理文件目录常用命令', link: '/linux/处理文件目录常用命令'},
          {text: 'vi_vim的使用', link: '/linux/vi_vim的使用'},
          {text: '文件内容的查看命令', link: '/linux/文件内容的查看命令'},
          {text: '打包压缩', link: '/linux/打包压缩'},
          {text: 'find文件搜索', link: '/linux/find文件搜索'},
          {text: 'grep文本搜索', link: '/linux/grep文本搜索'},
          {text: '输出重定向', link: '/linux/输出重定向'},
          {text: '命令行通配符', link: '/linux/命令行通配符'},
          {text: '环境变量', link: '/linux/环境变量'},
          {text: '磁盘管理', link: '/linux/磁盘管理'},
          {text: '文件链接', link: '/linux/文件链接'},
          {text: '常用的系统工作命令', link: '/linux/常用的系统工作命令'},
          {text: '系统状态监测命令', link: '/linux/系统状态监测命令'},
          {text: '系统服务', link: '/linux/系统服务'},
          {text: '开机自启状态', link: '/linux/开机自启状态'},
          {text: '软件下载与安装', link: '/linux/软件下载与安装'},
          {text: 'linux定时任务', link: '/linux/linux定时任务'},
          {text: 'firewalld 网络防火墙详解', link: '/linux/firewalld 网络防火墙详解'},
          {text: 'SELinux（Security-Enhanced Linux）详解', link: '/linux/SELinux（Security-Enhanced Linux）详解'},
        ]
      }],
      "/typeScript/": [
        {
          text: "TypeScript",
          items: [
            { text: "入门教程", link: "/typeScript/TypeScript 入门教程" },
            {
              text: "高级语法应用教程",
              link: "/typeScript/TypeScript 高级语法应用教程",
            },
            {
              text: "type 与 interface 的区别与相同点及使用场景",
              link: "/typeScript/type 与 interface 的区别与相同点及使用场景",
            },
            {
              text: "Class中的方法重载详解",
              link: "/typeScript/Class中的方法重载详解",
            },
            {
              text: "abstract 关键字详解",
              link: "/typeScript/TypeScript 中的 abstract 关键字详解",
            },
            {
              text: "函数的重载详解",
              link: "/typeScript/TypeScript 中函数的重载详解",
            },
            {
              text: "类的设计模式及使用场景",
              link: "/typeScript/TypeScript 中类的设计模式及使用场景",
            },
          ],
        },
      ],

      socialLinks: [
        { icon: "github", link: "https://github.com/lnh2020/Learn" },
      ],

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
    },
  },
};

const vitePressI18nOptions = {
  locales: ["zhHans"],
  rootLocale: "zhHans",
  searchProvider: "local",
};

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions));
