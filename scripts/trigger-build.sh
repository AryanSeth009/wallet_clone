#!/bin/bash

# Get the crumb
CRUMB=$(curl -s -X GET "http://localhost:8082/crumbIssuer/api/json" -u admin:admin | grep -o '"crumb":"[^"]*' | cut -d'"' -f4)

# Trigger the build with the crumb
curl -X POST "http://localhost:8082/job/Wallet_Clone/build" \
  -u admin:admin \
  -H "Jenkins-Crumb:$CRUMB" 