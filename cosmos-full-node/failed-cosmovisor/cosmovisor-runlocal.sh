#! /usr/bin/bash

#export DAEMON_HOME="$HOME/Training/cosmos-full-node-2-vcpus"
export DAEMON_HOME="$HOME/.gaia/"
export DAEMON_NAME="gaiad"
export DAEMON_ALLOW_DOWNLOAD_BINARIES="true"
export DAEMON_RESTART_AFTER_UPGRADE="true"
cosmovisor run
