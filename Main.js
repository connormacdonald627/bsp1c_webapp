const FETCHURL = 'https://gitlab.bracketproto.com/BracketProto/bsp1c_webapp';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function CloneRepoOnStart() {
  try {
    const ClonePath = path.join(__dirname, 'app');

    if (fs.existsSync(ClonePath)) {
      console.log('Repository already exists at:', ClonePath);
      return;
    }
    
    console.log('Cloning repository...');
    execSync(`git clone ${FETCHURL} ${ClonePath}`, { stdio: 'inherit' });
    console.log('Repository cloned successfully to:', ClonePath);
  } catch (error) {
    console.error('Error cloning repository:', error.message);
  }
}

CloneRepoOnStart();