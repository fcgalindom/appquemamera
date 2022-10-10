const { defineConfig } = require('@vue/cli-service')
//const  importedObj = require('./src/database/conection.js');







module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      externals: ['fs/promises'],
    }
  }
})
