#!/bin/bash
while [ "$1" != "" ]; do
    npx ng g s "services/$1"
    shift
done