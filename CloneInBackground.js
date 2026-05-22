const { FETCHURL } = require('./Config');
const Spawn = require('child_process').spawn;
const Path = require('path');
const Fs = require('fs');

function CloneInBackground() {
    const ClonePath = Path.join(__dirname, 'app');
    
    if (Fs.existsSync(ClonePath)) {
        const Pull = Spawn('git', ['pull'], {
            cwd: ClonePath,
            detached: true,
            stdio: 'ignore'
        });
        Pull.unref();
        return;
    }
}

setInterval(CloneInBackground, 1000);
