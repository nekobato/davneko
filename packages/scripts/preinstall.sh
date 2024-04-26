#!/bin/bash

if [ -f "config.json" ]; then
    echo "davneko-config.json exists."
else
    cp davneko-config.default.json davneko-config.json
    echo "Generated: davneko-config.json"
fi