FROM python:3.8-alpine

WORKDIR /home/api

COPY requirements.txt requirements.txt

RUN pip3 install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN chmod u+x deploy.sh

EXPOSE 5000

