import React from 'react';
import { useSelector } from 'react-redux';
import { connectWallet, truncate } from '../SupplyChainContract';



const buttonStyle = `inline-block px-6 py-2.5 bg-blue-600
  text-white font-medium text-xs leading-tight
  uppercase rounded-full shadow-md hover:bg-blue-700
  hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
  focus:outline-none focus:ring-0 active:bg-blue-800
  transition duration-150 ease-in-out`;

const Navbar = () => {
  const { connectedAccount } = useSelector((states) => states.globalStates);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">SupplyChain Dapp</div>
        <div>
          <button
            type="button"
            className={buttonStyle}
            onClick={connectedAccount ? undefined : connectWallet}
          >
            {connectedAccount
              ? truncate(connectedAccount, 4, 4, 11)
              : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
