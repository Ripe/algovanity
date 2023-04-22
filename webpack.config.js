const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: { 'build/bundle': './src/main.js' },
    resolve: {
      alias: {
        svelte: path.dirname(require.resolve('svelte/package.json')),
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
      conditionNames: ['svelte', 'require', 'node'],
    },
    output: {
      path: path.join(__dirname, '/public'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
    },
    stats: {
      children: true,
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: !isProd,
              },
              emitCss: isProd,
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader',
            options: {
              esModule: false,
              filename: 'build/[name].js',
            },
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    devtool: isProd ? false : 'source-map',
    devServer: {
      hot: false,
      static: path.resolve(__dirname, 'public'),
    },
  };
};
