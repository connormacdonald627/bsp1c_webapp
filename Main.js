const { FETCHURL, ENV } = require('./Config');
const Fs = require('fs');
const Path = require('path');
const Os = require('os');
const { spawn: Spawn, execSync: ExecSync } = require('child_process');

function WriteEnvFile(EnvPath, Variables) {
    const Dir = Path.dirname(EnvPath);
    Fs.mkdirSync(Dir, { recursive: true });

    const Content = Object.entries(Variables)
        .map(([Key, Value]) => `${Key}=${String(Value).replace(/\n/g, '\\n')}`)
        .join(Os.EOL) + Os.EOL;

    Fs.writeFileSync(EnvPath, Content, 'utf8');
}

function LoadEnvFile(EnvPath) {
    if (!Fs.existsSync(EnvPath)) {
        return;
    }

    const Content = Fs.readFileSync(EnvPath, 'utf8');
    Content.split(/\r?\n/).forEach((Line) => {
        const Trimmed = Line.trim();
        if (!Trimmed || Trimmed.startsWith('#')) return;

        const EqualsIndex = Trimmed.indexOf('=');
        if (EqualsIndex === -1) return;

        const Key = Trimmed.slice(0, EqualsIndex).trim();
        const Value = Trimmed.slice(EqualsIndex + 1);
        if (Key) {
            process.env[Key] = Value;
        }
    });
}

function PrepareEnv() {
    if (!ENV) {
        return;
    }

    const entries = Array.isArray(ENV) ? ENV : [ENV];
    entries.forEach((entry) => {
        if (!entry || typeof entry !== 'object') {
            return;
        }

        const EnvPath = entry.Path ? Path.resolve(__dirname, entry.Path) : Path.resolve(__dirname, '.env');
        const Variables = entry.Vars || entry.Variables;

        if (!Variables || typeof Variables !== 'object') {
            return;
        }

        WriteEnvFile(EnvPath, Variables);
        LoadEnvFile(EnvPath);
    });
}

function CloneRepoOnStart() {
    const ClonePath = Path.join(__dirname, 'app');

    PrepareEnv();

    if (!Fs.existsSync(ClonePath)) {
        console.log('Cloning repository...');
        ExecSync(`git clone ${FETCHURL} ${ClonePath}`, { stdio: 'inherit' });
        console.log('Repository cloned successfully to:', ClonePath);
    }
    
    const Background = Spawn('node', ['CloneInBackground.js'], {
        detached: true,
        stdio: 'ignore'
    });
    Background.unref();

    process.exit(0);
}

CloneRepoOnStart();