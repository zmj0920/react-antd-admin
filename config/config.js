// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import pageRoutes from './router.config';
const { REACT_APP_ENV } = process.env;
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isEnvProduction = process.env.NODE_ENV === 'production';
const assetDir = 'static';
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
  // chunks: ['vendors', 'umi'],
  // chainWebpack(memo, { env, webpack, createCSSRule }) {
  //   // 修改js，js chunk文件输出目录
  //   memo.output
  //     .filename(assetDir + '/js/[name].js')
  //     .chunkFilename(assetDir + '/js/[name].chunk.js');
  //   // 修改css输出目录
  //   memo.plugin('extract-css').tap(() => [
  //     {
  //       filename: `${assetDir}/css/[name].css`,
  //       chunkFilename: `${assetDir}/css/[name].chunk.css`,
  //       ignoreOrder: true,
  //     },
  //   ]);
  //   // 修改图片输出目录
  //   memo.module
  //     .rule('images')
  //     .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
  //     .use('url-loader')
  //     .loader(require.resolve('url-loader'))
  //     .tap((options) => {
  //       const newOptions = {
  //         ...options,
  //         name: assetDir + '/img/[name].[ext]',
  //         fallback: {
  //           ...options.fallback,
  //           options: {
  //             name: assetDir + '/img/[name].[ext]',
  //             esModule: false,
  //           },
  //         },
  //       };
  //       return newOptions;
  //     });

  //   // 修改svg输出目录
  //   memo.module
  //     .rule('svg')
  //     .test(/\.(svg)(\?.*)?$/)
  //     .use('file-loader')
  //     .loader(require.resolve('file-loader'))
  //     .tap((options) => ({
  //       ...options,
  //       name: assetDir + '/img/[name].[ext]',
  //     }));

  //   // 修改fonts输出目录
  //   memo.module
  //     .rule('fonts')
  //     .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
  //     .use('file-loader')
  //     .loader(require.resolve('file-loader'))
  //     .tap((options) => ({
  //       ...options,
  //       name: assetDir + '/fonts/[name].[ext]',
  //       fallback: {
  //         ...options.fallback,
  //         options: {
  //           name: assetDir + '/fonts/[name].[ext]',
  //           esModule: false,
  //         },
  //       },
  //     }));
  //   // 添加gzip压缩
  //   memo.when(isEnvProduction, (config) => {
  //     config.plugin('compression-webpack-plugin').use(CompressionWebpackPlugin, [
  //       {
  //         filename: '[path].gz[query]',
  //         algorithm: 'gzip',
  //         test: new RegExp('\\.(js|css)$'),
  //         threshold: 10240,
  //         minRatio: 0.8,
  //       },
  //     ]);
  //   });
  //   memo.merge({
  //     optimization: {
  //       minimize: true,
  //       splitChunks: {
  //         chunks: 'async',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           // 组件库相关
  //           react: {
  //             name: 'react',
  //             chunks: 'all',
  //             test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|moment|antd|@ant-design)[\\/]/,
  //             priority: 12,
  //           },
  //           // 工具库相关
  //           utils: {
  //             name: 'utils',
  //             chunks: 'all',
  //             test: /[\\/]node_modules[\\/](lodash|ramda)[\\/]/,
  //             priority: 11,
  //           },
  //           // 图表库相关
  //           charts: {
  //             name: 'charts',
  //             chunks: 'all',
  //             test: /[\\/]node_modules[\\/](echarts|bizcharts|@antv)[\\/]/,
  //             priority: 11,
  //           },
  //           vendors: {
  //             name: 'vendors',
  //             chunks: 'all',
  //             test: /[\\/]node_modules[\\/]/,
  //             priority: 10,
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
  metas: [
    {
      name: 'keywords',
      content: 'umi1, umijs1',
    },
    {
      name: 'description',
      content: '🍙 插件化的企业级前端应用框架。',
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
    'data-set': 'DataSet',
  },
  devtool: false,
  scripts: [
    'https://unpkg.com/react@16.8.6/umd/react.production.min.js',
    'https://unpkg.com/react-dom@16.8.6/umd/react-dom.production.min.js',
    'https://unpkg.com/bizcharts@3.5.5/umd/BizCharts.min.js',
  ],
  pwa: false,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
