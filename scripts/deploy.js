const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const Contract = await ethers.getContractFactory('SupplyChain');

  const contract = await Contract.deploy();

  await contract.deployed();

  const address = JSON.stringify({ address: contract.address }, null, 4);

  // Seed data after deploying the contract
  const product1 = await contract.manufactureProduct('Product 1', 100);
  const product2 = await contract.manufactureProduct('Product 2', 150);
  const product3 = await contract.manufactureProduct('Product 3', 200);

  console.log('Product 1 manufactured:', product1);
  console.log('Product 2 manufactured:', product2);
  console.log('Product 3 manufactured:', product3);

  // Optionally, call other functions like packing, shipping, receiving, or selling to test the entire supply chain flow

  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log('Deployed contract address: ', contract.address);
  });
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
