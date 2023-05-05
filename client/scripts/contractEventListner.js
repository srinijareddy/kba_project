const { EventListener } = require("./events");

let ManufacturerEvent = new EventListener();
const response = ManufacturerEvent.contractEventListener(
  "producer",
  "Admin",
  "tntchannel",
  "chainCode",
  "ProductContract",
  "addProductEvent"
)
