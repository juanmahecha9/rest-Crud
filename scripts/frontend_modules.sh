#!/bin/bash
set -fueo pipefail

echo "node modules download...."
cd frontend &&
    npm install &&
    cd ..
echo "success..."
