#!/bin/bash
set -fueo pipefail

echo "node modules download...."
cd backend &&
    npm install --save bcrypt consign cors express express-myconnection fs json jsonwebtoken morgan nodemailer path pg pg-hstore rimraf sequelize &&
    npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env nodemon &&
    cd ..
echo "success..."
