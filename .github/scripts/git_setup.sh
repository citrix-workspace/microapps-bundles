#!/bin/bash -e

#
# Setup system and git repository in the working directory to be able programatically commit & push the local changes.
#

if [ $# -lt 2 ]
then
    echo "Usage  : $0 repository ssh_priv_key"
    echo "Example: $0 'github_user/github_repo' '-----BEGIN OPENSSH PRIVATE KEY----- ... -----END OPENSSH PRIVATE KEY-----'"
    exit 1
fi

repository=$1
ssh_priv_key=$2

git config user.name "Bundlegen bot"
git config user.email "bundlegen.bot@github.com"
git remote set-url origin "git@github.com:${repository}.git"

mkdir -p "${HOME}/.ssh/"
echo "${ssh_priv_key}" > "${HOME}/.ssh/id_rsa"
sed -i -e "s#\\\\n#\n#g" "${HOME}/.ssh/id_rsa"
chmod 600 "${HOME}/.ssh/id_rsa"

ssh-keyscan -H -t rsa github.com >> "${HOME}/.ssh/known_hosts"
