#!/bin/bash
BACKUP_PATH=/mysql/backup_db
CONTAINER_NAME=docker_mysql
FILE_NAME=myblog_`date +%Y%m%d`.sql.gz

docker exec $CONTAINER_NAME sh -c "mysqldump -uroot -ppwd --databases database_name | gzip > /home/$FILE_NAME"
docker cp $CONTAINER_NAME:/home/$FILE_NAME $BACKUP_PATH
docker exec $CONTAINER_NAME sh -c "rm -rf /home/$FILE_NAME"

find $BACKUP_PATH -mtime +7 -name "*.sql.gz" -exec rm -rf {} \;

# 00 01 * * * /mysql/backup_mysql.sh