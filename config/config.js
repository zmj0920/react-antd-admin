// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import pageRoutes from './router.config';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  // hash: false,
  history: { type: 'hash' },
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: pageRoutes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  define: {
    REACT_APP_ENV: REACT_APP_ENV || '',
  },
  // 配置具体含义见：https://github.com/umijs/umi-webpack-bundle-analyzer#options-for-plugin
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'gzip', // stat  // gzip
  },
  chunks: ['vendors', 'umi'],
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 删除 umi 内置插件
    // memo.plugins.delete('progress');
    // memo.plugins.delete('friendly-error');
    // memo.plugins.delete('copy');
    memo.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            // 组件库相关
            react: {
              name: "react",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|moment|antd|@ant-design)[\\/]/,
              priority: 12
            },
            // 工具库相关
            utils: {
              name: "utils",
              chunks: "all",
              test: /[\\/]node_modules[\\/](lodash|ramda)[\\/]/,
              priority: 11
            },
            // 图表库相关
            charts: {
              name: "charts",
              chunks: "all",
              test: /[\\/]node_modules[\\/](echarts|bizcharts|@antv)[\\/]/,
              priority: 11
            },
            vendors: {
              name: "vendors",
              chunks: "all",
              test: /[\\/]node_modules[\\/]/,
              priority: 10
            }
          },
        },
      }
    });
  },
  metas: [
    {
      name: 'keywords',
      content: 'umi1, umijs1'
    },
    {
      name: 'description',
      content: '🍙 插件化的企业级前端应用框架。'
    },
    {
      bar: 'foo',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    bizcharts: 'BizCharts',
    'data-set': 'DataSet'
  },
  devtool: false,
  scripts: [
    'https://unpkg.com/react@16.8.6/umd/react.production.min.js',
    'https://unpkg.com/react-dom@16.8.6/umd/react-dom.production.min.js',
    'https://unpkg.com/bizcharts@3.5.5/umd/BizCharts.min.js',
    ''
  ],
  pwa: false,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
