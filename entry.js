require('babel-register')({
  presets: ["env", "stage-0", "react"]
});
require('css-modules-require-hook/preset');

require('./app.js');
