import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const outputPath = path.join(__dirname, './dist');

export default () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isBundleAnalyze = process.env.BUNDLE_ANALYZE === 'true';

  const config = {
    entry: {
      main: ['babel-polyfill']
        .concat(isDevelopment ? ['react-hot-loader/patch'] : [])
        .concat([
          'whatwg-fetch',
          './src/main.js',
        ]),
    },
    output: {
      path: outputPath,
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: isProduction,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.css$/,
          // exclude: path.resolve(__dirname),
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: { minimize: isProduction },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]-[hash:8].[ext]',
                publicPath: './',
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new HtmlWebpackPlugin({
        chunks: ['main'],
        filename: 'index.html',
        title: 'The Birthday Paradox',
        template: './src/index.html',
      }),
    ],
    devServer: {
      compress: true,
      port: 9000,
      hot: true,
      inline: true,
    },
  };

  if (isProduction) {
    config.resolve.alias = {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class',
    };
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      }),
    );
    config.devServer.hot = false;
  }

  if (isDevelopment) {
    config.devtool = 'eval-source-map';
  }

  if (isBundleAnalyze) {
    config.plugins.unshift(new BundleAnalyzerPlugin());
  }

  return config;
};
