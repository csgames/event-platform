#!/usr/bin/env bash

ok=1;
if [ -z "$GITHUB_USERNAME" ]
then
    ok=0;
    echo "GITHUB_USERNAME must be defined";
fi

if [ -z "$GITHUB_TOKEN" ]
then
    ok=0;
    echo "GITHUB_TOKEN must be defined";
fi

if [ $ok == 0 ]
then
exit 0;
fi

kubectl create secret docker-registry githubcred --docker-server=docker.pkg.github.com --docker-username=$GITHUB_USERNAME --docker-password=$GITHUB_TOKEN --docker-email=$GITHUB_USERNAME
