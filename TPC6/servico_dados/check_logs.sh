#!/usr/bin/bash

sudo tail -f /var/log/mongodb/mongod.log | jq
