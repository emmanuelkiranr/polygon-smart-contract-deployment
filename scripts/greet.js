const { ethers } = require("hardhat");
const hre = require("hardhat");
const contractJson = require("../artifacts/contracts/Greeter.sol/Greeter.json");
const abi = contractJson.abi;

async function main() {
  const provider = new hre.ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    signer
  );

  const setTxn1 = await contract.setGreeting("Hello World!");
  await setTxn1.wait();
  console.log("before: " + (await contract.greet()));

  const setTxn2 = await contract.setGreeting("Lets goooo!!!");
  await setTxn2.wait();
  console.log("after: " + (await contract.greet()));

  //   contract.greeting();
  //   contract.setGreeting("Hello World!, Lets goooo!!!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
