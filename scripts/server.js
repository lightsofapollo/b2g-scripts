var Server = require('../lib/script')({
  desc: 'Starts up an app server. Must have hostfile setup first',
  usage: 'server --gaia $GAIA_DIR',

  options: {
    gaia: {
      alias: 'g',
      desc: 'path to gaia directory',
      demand: true
    },

    port: {
      alias: 'p',
      desc: 'port to use',
      default: 8081
    }
  }

}, function(argv) {

  var static = require('node-static'),
      fsPath = require('path'),
      fs = require('fs'),
      port = parseInt(argv.port.toString().replace(/[^0-9]/g, ''));

  if (!fsPath.existsSync(argv.gaia)) {
    console.error('Invalid path: ', argv.gaia);
    this.help(1);
  }

  console.log(port);

  var apps = fs.readdirSync(fsPath.join(argv.gaia, 'apps'));
  var file = new(static.Server)(argv.gaia);

  require('http').createServer(function (request, response) {
      request.addListener('end', function () {
        var host = request.headers.host,
            app = host.split('.')[0];

          if(apps.indexOf(app) !== -1) {
            request.url = fsPath.join('/apps', app, request.url);
            file.serve(
              request, response
            );
          } else {
            file.serve(request, response);
          }
      });
  }).listen(port);

});

module.exports = Server;

