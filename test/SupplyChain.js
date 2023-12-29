// test/SupplyChain.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('SupplyChain', () => {
  let SupplyChain;
  let supplyChain;
  let deployer;
  let manufacturer;
  let packager;
  let distributor;
  let retailer;
  let consumer;

  before(async () => {
    [deployer, manufacturer, packager, distributor, retailer, consumer] = await ethers.getSigners();
    SupplyChain = await ethers.getContractFactory('SupplyChain');
  });

  beforeEach(async () => {
    supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();
  });

  it('should deploy the contract', async () => {
    expect(supplyChain.address).to.not.be.null;
  });

  it('should manufacture a product', async () => {
    const initialProductCount = await supplyChain.getProductCount();
    const productName = 'Product 1';
    const productPrice = 100;

    await supplyChain.connect(manufacturer).manufactureProduct(productName, productPrice);

    const newProductCount = await supplyChain.getProductCount();
    expect(newProductCount).to.equal(initialProductCount + 1);

    const productDetails = await supplyChain.getProductDetails(newProductCount);
    expect(productDetails.name).to.equal(productName);
    expect(productDetails.price).to.equal(productPrice);
    expect(productDetails.state).to.equal(0); // State: Manufactured
  });

  // Add more test cases for other functions such as packProduct, shipProduct, receiveProduct, and sellProduct

  // Example test for packProduct
  it('should pack a product', async () => {
    const productName = 'Product 1';
    const productPrice = 100;

    await supplyChain.connect(manufacturer).manufactureProduct(productName, productPrice);
    const productCount = await supplyChain.getProductCount();

    await supplyChain.connect(packager).packProduct(productCount);

    const productDetails = await supplyChain.getProductDetails(productCount);
    expect(productDetails.state).to.equal(1); // State: Packed
  });

  // Add more tests for other functions based on your contract's logic

  // Optionally, test the entire supply chain flow
  it('should complete the entire supply chain flow', async () => {
    // Manufacture product
    const product1 = await supplyChain.connect(manufacturer).manufactureProduct('Product 1', 100);

    // Pack product
    await supplyChain.connect(packager).packProduct(product1.productId);

    // Ship product
    await supplyChain.connect(distributor).shipProduct(product1.productId, retailer.address);

    // Receive product
    await supplyChain.connect(retailer).receiveProduct(product1.productId);

    // Sell product
    await supplyChain.connect(retailer).sellProduct(product1.productId);

    // Check the final state
    const finalProductDetails = await supplyChain.getProductDetails(product1.productId);
    expect(finalProductDetails.state).to.equal(4); // State: Sold
  });
});
