module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        'module:metro-react-native-babel-preset',
        { useTransformReactJSXExperimental: true },
      ],
    ],
    plugins: [
      'macros',
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
