#!/bin/bash
cd $FABRIC_CFG_PATH
# cryptogen generate --config crypto-config.yaml --output keyfiles
configtxgen -profile OrdererGenesis -outputBlock genesis.block -channelID systemchannel

configtxgen -printOrg customer-auto-com > JoinRequest_customer-auto-com.json
configtxgen -printOrg manufacturer-auto-com > JoinRequest_manufacturer-auto-com.json
configtxgen -printOrg retailer-auto-com > JoinRequest_retailer-auto-com.json
configtxgen -printOrg supplier-auto-com > JoinRequest_supplier-auto-com.json
