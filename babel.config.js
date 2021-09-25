module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
    plugins: [
      'macros',
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.tsx', '.ts'],
          alias: {
            components: './components',
            hooks: './hooks',
            utils: './utils',
            providers: './providers',
            constants: './constants',
          },
        },
      ],
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
