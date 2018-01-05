module.exports = {
  entry: __dirname+'\\main.js',
  output: {
    path: __dirname+'/',
    filename: 'index.js'
  },
  devServer:{
    inline: true,
    port:3333
  },
  module:{
    loaders:[
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};