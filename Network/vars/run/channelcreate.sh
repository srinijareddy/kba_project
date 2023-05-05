#!/bin/bash
# Script to create channel block 0 and then create channel
cp $FABRIC_CFG_PATH/core.yaml /vars/core.yaml
cd /vars
export FABRIC_CFG_PATH=/vars
configtxgen -profile OrgChannel \
  -outputCreateChannelTx autochannel.tx -channelID autochannel

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_ID=cli
export CORE_PEER_ADDRESS=192.168.68.141:7004
export CORE_PEER_TLS_ROOTCERT_FILE=/vars/keyfiles/peerOrganizations/manufacturer.auto.com/peers/peer1.manufacturer.auto.com/tls/ca.crt
export CORE_PEER_LOCALMSPID=manufacturer-auto-com
export CORE_PEER_MSPCONFIGPATH=/vars/keyfiles/peerOrganizations/manufacturer.auto.com/users/Admin@manufacturer.auto.com/msp
export ORDERER_ADDRESS=192.168.68.141:7015
export ORDERER_TLS_CA=/vars/keyfiles/ordererOrganizations/auto.com/orderers/orderer4.auto.com/tls/ca.crt
peer channel create -c autochannel -f autochannel.tx -o $ORDERER_ADDRESS \
  --cafile $ORDERER_TLS_CA --tls
