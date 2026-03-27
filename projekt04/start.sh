#!/usr/bin/env bash

echo PORT=8000
echo SECRET=$(cat /dev/urandom | tr -cd "[:graph:]" | head -c64)
echo PEPPER=$(cat /dev/urandom | tr -cd "[:xdigit:]" | head -c64)