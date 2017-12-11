#!/bin/bash
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    echo "Push received. Deploying app..."
    git init

    git remote add deploy "deploy@carlescapell.me:/var/www/song-quotes.carlescapell.me"
    git config user.name "Travis CI"
    git config user.email "carles.capell.87@gmail.com"

    git add .
    git commit -m "Deploy"
    git push --force deploy master
    echo "Deployed!"
else
    echo "Not deploying, since this branch isn't master."
fi