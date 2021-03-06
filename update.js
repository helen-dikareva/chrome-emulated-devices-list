var fs      = require('fs');
var path    = require('path');
var request = require('request-promise');


var JSON_URL    = 'https://chromium.googlesource.com/chromium/blink/+/master/Source/devtools/front_end/emulated_devices/module.json?format=TEXT';
var FILE_PATH   = path.join(__dirname, 'index.json');
var TITLES_PATH = path.join(__dirname, 'devices.md');

request({ url: JSON_URL })
    .then(function (body) {
        var buf     = new Buffer(body, 'base64');
        var content = JSON.parse(buf);

        var db      = content.extensions.map(function (item) {
            return item.device;
        });
        
        fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
        
        var titles = db.map(x => '  * ' + x.title).join('\n\n');
        
        fs.writeFileSync(TITLES_PATH, '## Titles of Emulated Devices\n\n' + titles);
    });