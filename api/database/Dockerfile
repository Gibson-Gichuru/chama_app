FROM mariadb:10.7.4

RUN groupadd -r chama && useradd -r -g chama chama

RUN chsh -s /usr/sbin/nologin root 

ENV MARIADB_MYSQL_LOCALHOST_USER=1

COPY healthcheck.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/healthcheck.sh