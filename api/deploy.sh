#!/bin/sh

function run_production_server(){

    gunicorn --bind 0.0.0.0:5000 manage:app
    
}

function run_migrations(){

    if [ $FLASK_ENV != "development" ];then

        flask deploy

        if [ $? -eq 0 ]; then run_production_server; fi

    fi


}

run_migrations

if [ $? -gt 0 ]; then echo "Unable to run database migrations";fi