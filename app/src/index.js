import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/CarbonContract.json";


import IndiaImage from "../images/indiaFlag.png";
import gogBlockchain from"../images/gogBlockchain.png"


const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  refreshBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance("0x6d484e2f75f5669e54bbbded7415e760d16ad019").call();

    const balanceElement = document.getElementsByClassName("carbon-token-text")[0];
    balanceElement.innerHTML = balance;
  },

  

  sendCoin: async function() {
    const amount = 10;
    const receiver =  "0x6d484e2f75f5669e54bbbded7415e760d16ad019";
    const currentAp = parseInt(document.getElementById("currentAp").value)
    this.setStatus("Initiating transaction... (please wait)");

    const { sendCoin } = this.meta.methods;
    await sendCoin(receiver, amount, currentAp).send({ from: this.account});

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  var image1 = document.getElementById("image1");
  var image2 = document.getElementById("image2");
  var image3 = document.getElementById("image3");
  var image4 = document.getElementById("image4");
  var image5 = document.getElementById("image5");
  var image6 = document.getElementById("image6");
  var image7 = document.getElementById("image7");

  image1.src = IndiaImage;
  image2.src = IndiaImage;
  image3.src = IndiaImage;
  image4.src = IndiaImage;
  image5.src = IndiaImage;
  image6.src = IndiaImage;
  image7.src = gogBlockchain;
  



  App.start();
});
