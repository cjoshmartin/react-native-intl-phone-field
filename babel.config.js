module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  if (process.env.NODE_ENV !== 'test') {
    plugins.push('react-native-worklets/plugin');
  }

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
