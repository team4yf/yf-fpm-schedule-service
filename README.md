# Schedule Service

This is a min-service for manage schedule job.

## Docker Config

First of all, Make sure the `config.json` and the `db.lock` files exists!

- config.json
  ```javascript
  {
    "mysql": {
      "host": "dbserver",
      "database": "fpm",
      "username": "root",
      "password": "root",
      "showSql": true
    },
    "schedule": {
      "storage": "mysql"
    }
  }

  ```

- db.lock

  just an empty file.

- compose file
  ```yml
  version: '3'
  services:
    scheduleserver:
      image: "yfsoftcom/fpm-schedule-server:latest"
      container_name: "fpm-schedule-server"
      volumes:
        - ./config.json:/app/config.json
        - ./db.lock:/app/db.lock
      ports:
        - "9999:9999"
      networks:
        - fpm-network
      restart: always
  networks:
    fpm-network:
  ```
  
## UI

go [http://localhost:9999](http://localhost:9999)
