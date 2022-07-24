#!/bin/bash

function deploy_container {

    ENV="production"

    IFS=' '

    if [ "$FLASK_ENV" = "$ENV" ];then

        # GETTING THE CURRENT DB MIGRATION REVISION

        DB_REVISION=`flask db current`

        read -a REVISION_ARRAY <<< "$DB_REVISION"

        # GET THE CURRENT HEAD ON THE SCRIPT DIRECTORY

        SCRIPT_CURRENT_HEAD=`flask db heads`

        # CHECK IF THE MIGRATION REVISION ID AND SCRIPT HEAD ID MATCH

        if [ "${REVISION_ARRAY[0]}" != "${SCRIPT_CURRENT_HEAD[0]}" ];then

            # PERFORM migration update

            `flask deploy`

        fi

        # The Production server should be lauched either way

        `gunicorn --bind 0.0.0.0:5000 manage:app`

    else

        echo "::Current Application not set for Production"

    fi



}

deploy_container