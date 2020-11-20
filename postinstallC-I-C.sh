#!/usr/bin/env bash

set -e

BRANCH=master

if [[ $BUILD_BRANCH != "master" ]];
then
    BRANCH=develop
fi

if [ ! -d breakpointministries ]; then
    (git clone https://github.com/WebJamApps/breakpointministries)
fi

(
cd breakpointministries || exit;
git stash;
git checkout $BRANCH;
git pull;
cd ..;
)

if [ -f .env ];
then
  (cp .env breakpointministries/;
  )
fi

(
cd breakpointministries;
yarn install;
)
