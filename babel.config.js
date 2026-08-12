module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-worklets/plugin", // <-- ЭТО ЕДИНСТВЕННЫЙ ПРАВИЛЬНЫЙ ПЛАГИН ДЛЯ EXPO 54
    ],
  };
};