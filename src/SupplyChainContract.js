import { ethers } from 'ethers';
import address from './abis/contractAddress.json';
import abi from './abis/src/contracts/SupplyChain.sol/SupplyChain.json';
import { store } from './store';
import { globalActions } from './store/globalSlices';

const {
  setConnectedAccount,
  setProductsDetails,
} = globalActions;

const { ethereum } = window;
const ContractAddress = address.address;
const ContractAbi = abi.abi;
let tx;



const getEthereumContract = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  const provider = accounts[0]
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
  const wallet = accounts[0] ? null : ethers.Wallet.createRandom();
  const signer = provider.getSigner(accounts[0] ? undefined : wallet.address);

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer);
  return contract;
};

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    store.dispatch(setConnectedAccount(accounts[0]));
  } catch (error) {
    reportError(error);
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', async () => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      store.dispatch(setConnectedAccount(accounts[0]))
      await loadProductDetails()
      await isWalletConnected()
    })

    if (accounts.length) {
      store.dispatch(setConnectedAccount(accounts[0]))
    } else {
      store.dispatch(setConnectedAccount(''))
      console.log('No accounts found')
    }
  } catch (error) {
    reportError(error)
  }
}

const packProduct = async (productId) => {
  return new Promise(async (resolve, reject) => {
      try {
          const contract = await getEthereumContract();
          tx = await contract.packProduct(productId);
          console.log('Product packed. Transaction:', tx);
          await tx.wait();
          await loadProductDetails();
          console.log('Product details reloaded after packing:', productsDetails);
          resolve(tx);
      } catch (error) {
          reportError(error);
          reject(error);
      }
  });
};


const shipProduct = async (productId, distributorAddress) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      tx = await contract.shipProduct(productId, distributorAddress);
      await tx.wait();
      await loadProductDetails();

      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

const receiveProduct = async (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      tx = await contract.receiveProduct(productId);
      await tx.wait();
      await loadProductDetails();

      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

const sellProduct = async (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      tx = await contract.sellProduct(productId);
      await tx.wait();
      await loadProductDetails();

      resolve(tx);
    } catch (error) {
      reportError(error);
      reject(error);
    }
  });
};

const manufactureProduct = async (name, price) => {
  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract();
      tx = await contract.manufactureProduct(name, price);
      await tx.wait();
      console.log('Transaction confirmed.');
      await loadProductDetails();  // Update product details in the store
      resolve(tx);
    } catch (error) {
      console.error('Error in manufactureProduct:', error);
      reportError(error);
      reject(error);
    }
  });
};


const loadProductDetails = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask');

    const contract = await getEthereumContract();
    const productCount = await contract.getProductCount();

    // Log product count for debugging
    console.log('Product Count:', productCount);

    // Check if there are products before attempting to retrieve details
    if (productCount > 0) {
      const productDetails = await Promise.all(
        Array.from({ length: productCount }, (_, index) => contract.getProductDetails(index + 1))
      );

      // Log product details for debugging
      console.log('Product Details:', productDetails);

      store.dispatch(setProductsDetails(structureProducts(productDetails)));
      console.log('Product details loaded:', productDetails);
    } else {
      console.log('No products found');
    }
  } catch (error) {
    reportError(error);
  }
};



const structureProducts = (productsDetails) => {
  const solidityStateToString = {
    0: 'Manufactured',
    1: 'Packed',
    2: 'Shipped',
    3: 'Received',
    4: 'Sold',
  };

  return productsDetails.map((productDetail) => ({
    id: productDetail.productId.toNumber(), // Convert BigNumber to number
    name: productDetail.name,
    price: productDetail.price.toNumber(), // Convert BigNumber to number
    state: solidityStateToString[productDetail.state].toString(),
    manufacturer: truncate(productDetail.manufacturer, 4, 4, 11),
    packager: truncate(productDetail.packager, 4, 4, 11),
    distributor: truncate(productDetail.distributor, 4, 4, 11),
    retailer: truncate(productDetail.retailer, 4, 4, 11),
    consumer: truncate(productDetail.consumer, 4, 4, 11),
  }));
};

const reportError = (error) => {
  console.log(error);
};

const truncate = (text, startChars, endChars, maxLength) => {
  if (text && text.length > maxLength) {
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + '.';
    }
    return start + end;
  }
  return text;
};

export {
  connectWallet,
  getEthereumContract,
  isWalletConnected,
  manufactureProduct,
  packProduct,
  shipProduct,
  receiveProduct,
  sellProduct,
  getProductDetails,
  loadProductDetails,
  truncate,
  structureProducts
};
