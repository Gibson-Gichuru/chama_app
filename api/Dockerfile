FROM python:3.8-alpine

WORKDIR /home/api

COPY . .

RUN pip3 install --upgrade pip


RUN pip install -r requirements.txt 

RUN export FLASK_APP=manage.py


EXPOSE 5000



