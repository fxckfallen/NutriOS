const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Указываем точный путь к твоему global.css
module.exports = withNativeWind(config, { input: "./src/app/global.css" });