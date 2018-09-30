#!/bin/sh

# Execute this script as source ./init.sh for export variables to global environment outside the script scope

# Configuration Source
export NODE_CONFIG_SOURCE_APP="YAML_FILE"
env | grep '^NODE_CONFIG_SOURCE_APP='

# Configuration GIT Uri
export NODE_CONFIG_GIT_URI="NONE"
env | grep '^NODE_CONFIG_GIT_URI='

# Configuration File
export NODE_CONFIG_FILE="config-gamecollector-v7-dev.yml"
env | grep '^NODE_CONFIG_FILE='

# Node PORT
export NODE_PORT="8080"
env | grep '^NODE_PORT='
