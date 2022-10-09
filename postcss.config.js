const path = require("path");
const { WeappTailwindcssDisabled } = require("./platform");
module.exports = {
  parser: require("postcss-comment"),
  plugins: [
    require("postcss-import")({
      resolve(id, basedir, importOptions) {
        if (id.startsWith("~@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3));
        } else if (id.startsWith("@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2));
        } else if (id.startsWith("/") && !id.startsWith("//")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1));
        }
        return id;
      },
    }),
    require("autoprefixer")({
      remove: process.env.UNI_PLATFORM !== "h5",
    }),
    require("tailwindcss")({ config: "./tailwind.config.js" }),
    // rem 转 rpx
    WeappTailwindcssDisabled
      ? undefined
      : require("postcss-rem-to-responsive-pixel/postcss7")({
          rootValue: 32,
          propList: ["*"],
          transformUnit: "rpx",
        }),

    require("@dcloudio/vue-cli-plugin-uni/packages/postcss"),
  ],
};
