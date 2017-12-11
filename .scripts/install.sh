#!/bin/bash
set -x

rm deploy-key.enc
chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa