#!/bin/bash
while [ "$1" != "" ]; do
    npx ng g guard "guards/$1"
    shift
done