#!/bin/bash
while [ "$1" != "" ]; do
    npx ng g class "models/$1"
    shift
done