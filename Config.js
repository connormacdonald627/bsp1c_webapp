const FETCHURL = 'https://gitlab.bracketproto.com/BracketProto/bsp1c_webapp';

const ENV = [
    {
        Path: './app/frontend/.env',
        Vars: {
            BACKEND_URL: "https://bsp1c-backend.onrender.com",
            HOSTS: "bsp1c-frontend.onrender.com"
        }
    },
    {
        Path: './app/backend/.env',
        Vars: {
            FRONTEND_URL: "https://bsp1c-frontend.onrender.com"
        }
    }
];

module.exports = { FETCHURL, ENV };