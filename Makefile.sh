#! /bin/sh
docker build -t fpm-schedule-server .

docker tag fpm-schedule-server yfsoftcom/fpm-schedule-server:latest

docker push yfsoftcom/fpm-schedule-server:latest