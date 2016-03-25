var commander = require('commander');
var https = require('https');

var packageInfo = require('./package.json');

commander
    .version(packageInfo.version)
    .option('-d --domain [domain]', 'The domain to check.')
    .option('-p --port <n>', 'An optional port.')
    .parse(process.argv);

var domain = commander.domain;
var port = commander.port;

if (domain) {
    https.get(
        {
            host: domain,
            port: port ? port : 443,
            method: 'GET'
        },
        function onConnection(res) {
            var connection = res.connection;
            if (connection) {
                var certificate = connection.getPeerCertificate();
                console.log(certificate['valid_to']);
            }

        }
    );
}