#!/bin/bash
set -fueo pipefail

function main() { (
    echo "Frontend by juanmahecha9, created with Angular CLI: 12.0.2"
    cd frontend
    DIRECTORIO=node_modules
    if [ -d "$DIRECTORIO" ]; then
        echo "..................."
        echo "Initializing the server"
        sh scripts/run.sh
    else
        echo "node modules download...."
        npm install
        echo "Download success..."
        echo "..................."
        echo "Initializing the server"
        sh scripts/run.sh
    fi
); }

main
