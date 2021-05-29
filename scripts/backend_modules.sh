#!/bin/bash
set -fueo pipefail

function main() { (
    echo "node modules download...."
    cd backend
    npm install --save bcrypt consign cors express express-myconnection fs json jsonwebtoken morgan nodemailer path pg pg-hstore rimraf sequelize
    npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env nodemon
    echo "Download success..."
    echo "..................."
    echo "Initializing the server"
    sh scripts/run.sh
); }

main
