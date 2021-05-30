#!/bin/bash
set -fueo pipefail

function main() { (
    echo "Backend by juanmahecha9, created with Node: 14.17.0"
    cd backend
    DIRECTORIO=node_modules
    if [ -d "$DIRECTORIO" ]; then
        echo "..................."
        echo "Initializing the server"
        sh scripts/run.sh
    else
        echo "node modules download...."
        npm install --save bcrypt consign cors express express-myconnection firebase-admin fs json jsonwebtoken morgan nodemailer path pg pg-hstore rimraf sequelize
        npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env nodemon
        echo "Download success..."
        echo "..................."
        echo "Initializing the server"
        sh scripts/run.sh
    fi
); }

main
