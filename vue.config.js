if (process.env.NODE_ENV === "development") {
  process.env.TAILWIND_MODE = "watch";
}
const { WeappTailwindcssDisabled } = require("./platform");


const {
  UniAppWeappTailwindcssWebpackPluginV4,
} = require("weapp-tailwindcss-webpack-plugin");

const TransformPages = require("uni-read-pages");
const { webpack } = new TransformPages();
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {

  transpileDependencies: ['uview-ui'],


  configureWebpack: {
    plugins: [
      new UniAppWeappTailwindcssWebpackPluginV4({
        disabled: WeappTailwindcssDisabled,
      }),
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ["path", "name", "aliasPath"],
          });
          return JSON.stringify(tfPages.routes);
        }, true),
      }),
    ],
  },
  devServer: {
    // 跨域
    proxy: {
      // 只要axios请求中带有/api的url,就会触发代理机制
      '/api': {
        // 目标路径：target(我们要代理请求的地址)
        target: 'https://travelprogrammer.com',
        // 允许跨域
        changOrigin: true,
        // 重写路径 api代替了目标路径
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }


};

console.log(process.env.UNI_PLATFORM);
