const { FETCHURL } = require('./Config');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

function CloneRepoOnStart() {
    const ClonePath = path.join(__dirname, 'app');

    if (!fs.existsSync(ClonePath)) {
        console.log('Cloning repository...');
        execSync(`git clone ${FETCHURL} ${ClonePath}`, { stdio: 'inherit' });
        console.log('Repository cloned successfully to:', ClonePath);
    }
    
    const Background = spawn('node', ['CloneInBackground.js'], {
        detached: true,
        stdio: 'ignore'
    });
    Background.unref();

    process.exit(0);
}


CloneRepoOnStart();