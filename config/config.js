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
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
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
    'data-set':'DataSet'
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
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (context, _, localName) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
});
