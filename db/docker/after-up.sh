#!/bin/sh

dba_username=bifrost_dba
read -sp 'Password to use for the Bifrost DBA user > ' dba_password
echo ''
bifrost_username=bifrost
read -sp 'Password to use for the bifrost user > ' bifrost_password
echo ''
docker_instance=scylla_head

docker exec -it $docker_instance rm /root/.cqlshrc

read -n 1 -p 'ok? '
sleep 10
docker exec -it $docker_instance cqlsh -u cassandra -p cassandra -e "ALTER KEYSPACE system_auth WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1}; CREATE ROLE DBA WITH SUPERUSER = true; CREATE ROLE $dba_username WITH PASSWORD = '$dba_password' AND LOGIN = true; GRANT DBA TO $dba_username;"
read -n 1 -p 'ok? '
sleep 10
docker exec -it $docker_instance supervisorctl restart scylla
read -n 1 -p 'ok? '
sleep 10
docker exec -it $docker_instance nodetool repair system_auth
read -n 1 -p 'ok? '
sleep 10
docker exec -it $docker_instance cqlsh -u "$dba_username" -p "$dba_password" -e "CREATE ROLE $bifrost_username WITH PASSWORD = '$bifrost_password' AND LOGIN = true; CREATE KEYSPACE bifrost WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }; GRANT ALL PERMISSIONS ON KEYSPACE bifrost TO $bifrost_username;"
read -n 1 -p 'ok? '
sleep 10
# this doesn't work
# docker exec $docker_instance cqlsh -u "$bifrost_username" -p "$bifrost_password" < init.cql
