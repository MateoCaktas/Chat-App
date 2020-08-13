'use strict';

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_styles.scss";
        `
      }
    }
  }
};
