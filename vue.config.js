const px2rem = require("postcss-px2rem")
module.exports = {
  css:{
    extract: false,
    loaderOptions:{
      postcss:{
        plugins:[
          px2rem({
            remUnit: 75,
            "exclude": "/node_modules/i"
          })
        ]
      }
    }
  }
}