#!/bin/bash
# Script to join a peer to a channel
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=192.168.68.141:7007
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/customer.auto.com/peers/peer1.customer.auto.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=customer-auto-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/customer.auto.com/users/Admin@customer.auto.com/msp
export ORDERER_ADDRESS=192.168.68.141:7014
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/auto.com/orderers/orderer3.auto.com/tls/ca.crt
if [ ! -f "autochannel.genesis.block" ]; then
  peer channel fetch oldest -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA \
  --tls -c autochannel /vars/autochannel.genesis.block
fi

peer channel join -b /vars/autochannel.genesis.block \
  -o $ORDERER_ADDRESS --cafile $ORDERER_TLS_CA --tls
