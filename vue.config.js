const path = require("path");
const port = 8686;
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 所有配置项说明都可以在 https://cli.vuejs.org/config/ 中找到
module.exports = {
  publicPath: "/", // 部署应用包时的基本 URL
  outputDir: "dist", // 生产环境构建文件的目录
  assetsDir: "static", // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: "index.html", // 指定生成的 index.html 的输出路径
  filenameHashing: true,
  pages: undefined, // 配置多页面模式
  lintOnSave: process.env.NODE_ENV === "development",
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined,
  integrity: false,
  configureWebpack: () => {
    const customConfig = {
      plugins: [],
    };
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      const needPushPlugin = [
        /* 开启gzip压缩 */
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          include: undefined,
          exclude: undefined,
          algorithm: "gzip",
          compressionOptions: { level: 9 },
          threshold: 0,
          minRatio: 0.8,
          filename: "[path][base].gz",
          deleteOriginalAssets: false, // 项目上线时改为true，为了开启打包文件分析工具必须改为false
          cache: true,
        }),
      ];
      customConfig.plugins.push(...needPushPlugin);
    } else {
      // 为开发环境修改配置...
      customConfig.devtool = "eval-cheap-module-source-map";
    }
    return customConfig;
  },
  chainWebpack(config) {
    // 通过html-webpack-plugin插件修改初始化标题（默认配置：https://github.com/vuejs/vue-cli/blob/90d3dfc74e824282b3a0c1b66cbf2ebc122d09d8/packages/%40vue/cli-service/lib/config/app.js#L86）
    config.plugin("html").tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE;
      return args;
    });
    // 忽略 runtime 块，提高首屏渲染速度 （默认配置：https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171）
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        include: "initial",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      },
    ]);
    // 当页面很多时，将导致太多毫无意义的请求(默认配置：https://github.com/vuejs/vue-cli/blob/90d3dfc74e824282b3a0c1b66cbf2ebc122d09d8/packages/%40vue/cli-service/lib/config/app.js#L177)
    config.plugins.delete("prefetch");

    /* 请查看 node_modules 中 webpack 的版本号之后再进行配置，当前配置为 webpack4.x 版本配置 */
    config.optimization.splitChunks({
      automaticNameDelimiter: "-", // 默认情况下，Webpack将使用名称和块的来源生成名称（例如，libs~app.b804ed7b.js）。 此选项使您可以指定用于生成名称的定界符。
      // automaticNameMaxLength: 30, // 设置文件名长度
      // automaticNamePrefix: "", // 设置文件名前缀
      chunks: "all", // 此选项可以指定以什么模式进行分包。默认值：async
      maxAsyncRequests: 30, // 按需加载时最大并行请求数（webpack4：默认值5）
      maxInitialRequests: 30, // 入口点的最大并行请求数（webpack4：默认值3）
      // minChunks: 1, // 拆分前必须共享模块的最小块数（以字节为单位）
      // minSize: 30000, // 拆分块的最小大小（以字节为单位）
      // maxSize: 0, // https://v4.webpack.js.org/plugins/split-chunks-plugin/#splitchunksmaxsize
      // name: true, // 作用不大（使用默认规则即可）
      // filename: undefined, // 作用不大（使用默认规则即可）
      // hidePathInfo: false, // 目前具体作用不明
      // enforceSizeThreshold: 50000, // 强制执行拆分的大小阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）被忽略(默认值：50000)
      // fallbackCacheGroup: {minSize: 0, maxSize: 0, automaticNameDelimiter: "~"} // 作用不大（使用默认规则即可）
      cacheGroups: {
        "element-ui": {
          priority: 25, // 优先级需要大于vendors和app，否则将打包到vendors或app中
          test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
        },
        commons: {
          priority: 5, // 优先级
          reuseExistingChunk: true, // 如果当前块包含已从主捆绑包中拆分出的模块，则将重用它，而不是生成新的模块。 这可能会影响块的结果文件名
          test: resolve("src/components"),
          // 告诉webpack忽略splitChunks.minSize，splitChunks.minChunks，splitChunks.maxAsyncRequests和splitChunks.maxInitialRequests选项，并始终为此缓存组创建块。
          enforce: false,
          minChunks: 2, //  拆分前必须共享模块的最小块数。
        },
        /* webpack4.x 的默认配置 */
        // vendors: {
        //     test: /[\\/]node_modules[\\/]/,
        //     priority: -10
        // },
        // default: {
        //     minChunks: 2,
        //     priority: -20,
        //     reuseExistingChunk: true,
        // },
      },
    });
    // 仅生成一个 runtime 块，与所有生成的块共享
    config.optimization.runtimeChunk("single");

    config.when(process.env.NODE_ENV !== "development", (config) => {
      /* 生产环境中删除代码中的console信息(默认配置：https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/base.js#L267) */
      config.optimization.minimizer("terser").tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        return args;
      });
    });
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_TARGET_URL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_URL]: "",
        },
      },
    },
    // before: require("./src/mock/mock-server.js"),
  },
};
