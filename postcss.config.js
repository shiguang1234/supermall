module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，750
      viewportHeight: 667, //视窗的高度，1334
      unitPrecision: 5, //px转换为视窗单位保留的小数位数
      viewportUnit: 'vw', //指定需要转换成的视窗单位
      selectorBlackList: ['ignore', 'tab-bar'], //指定不需要转换的类
      minPixelValue: 1, //小于或等于1px不转换为视窗单位
      mediaQuery: false, //是否允许在媒体查询中转换px
      exclude: [/TabBar\.vue$/]
    },
  }
}