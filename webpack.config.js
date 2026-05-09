const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundled.js'
  },
  // Use production mode for Vercel, development for your local machine
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: 1000,
  },

  // ADDED THIS BLOCK HERE
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // You can add shortcuts here if needed
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}