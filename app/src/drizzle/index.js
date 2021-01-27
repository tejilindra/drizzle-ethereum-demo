// Import contracts
import Category from "../contracts/Category.json"

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [Category],
  events: {
    Category: ["StateChanged", "CategoryAdded"],
  },
  polls: {
    //accounts: 1500
  },
}

export default drizzleOptions
