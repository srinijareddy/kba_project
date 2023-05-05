#!/bin/sh
 echo "start the network"
 minifab netup -s couchdb -e true -o manufacturer.auto.com &&
 sleep 5



echo "Create the channel"
minifab create -c autochannel &&
 
sleep 2

echo "Join the peers to channel"
minifab join -c autochannel &&

sleep 2

echo "Anchor update"
minifab anchorupdate &&

sleep 2

echo "Generate the channel based profiles"
minifab profilegen -c autochannel