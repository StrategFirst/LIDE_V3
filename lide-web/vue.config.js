const fs = require('fs');

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: {
      key: fs.readFileSync('./HTTPS_CREDENTIALS/privkey.pem'),
      cert: fs.readFileSync('./HTTPS_CREDENTIALS/cert.pem'),
    },
    disableHostCheck: true,
    watchOptions: {
      poll: true
    }
  },
};
