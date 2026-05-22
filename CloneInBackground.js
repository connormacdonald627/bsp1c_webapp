const { FETCHURL } = require('./Config');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function CloneInBackground() {
    const ClonePath = path.join(__dirname, 'app');
    
    if (fs.existsSync(ClonePath)) {
        const Pull = spawn('git', ['pull'], {
            cwd: ClonePath,
            detached: true,
            stdio: 'ignore'
        });
        Pull.unref();
        return;
    }
}

setInterval(CloneInBackground, 1000);
