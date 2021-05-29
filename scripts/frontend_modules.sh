#!/bin/bash
set -fueo pipefail

function main() { (
    echo "node modules download...."
    cd frontend
    npm install
    echo "Download success..."
    echo "..................."
    echo "Initializing the server"
    sh scripts/run.sh
); }

main
