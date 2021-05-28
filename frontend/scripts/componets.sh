#!/bin/bash
while [ "$1" != "" ]; do
    npx ng g c "components/$1"
    shift
done