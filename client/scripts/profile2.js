let profile = {
  producer: {
    Wallet:
      "../../../blockchain/network/vars/profiles/vscode/wallets/producer.tnt.com",
    CP: "../../../blockchain/network/vars/profiles/tntchannel_connection_for_nodesdk.json",
  },
  supplier: {
    Wallet:
      "../../blockchain/network/vars/profiles/vscode/wallets/supplier.tnt.com",
    CP: "../../../blockchain/network/vars/profiles/tntchannel_connection_for_nodesdk.json",
  },
  wholesaler: {
    Wallet:
      "../../blockchain/network/vars/profiles/vscode/wallets/wholesaler.tnt.com",
    CP: "../../blockchain/network/vars/profiles/tntchannel_connection_for_nodesdk.json",
  },
  retailer: {
    Wallet:
      "../../blockchain/network/vars/profiles/vscode/wallets/retailer.tnt.com",
    CP: "../../blockchain/network/vars/profiles/tntchannel_connection_for_nodesdk.json",
  },
};
module.exports = { profile };
