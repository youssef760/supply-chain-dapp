import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import MainDashboard from './components/MainDashboard';
import { ToastContainer } from 'react-toastify';
import { isWalletConnected, loadProductDetails } from './SupplyChainContract';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { globalActions } from './store/globalSlices';
import ProductDetailsTable from './components/ProductDetailsTable';


function App() {
  const dispatch = useDispatch();
  const { productsDetails } = useSelector((states) => states.globalStates);
  const { setProductsDetails } = globalActions;

  useEffect(() => {
    const loadBlockchain = async () => {
      await isWalletConnected();
      await loadProductDetails();
      console.log('Blockchain Loaded');
    };

    loadBlockchain();
  }, [dispatch]);

  return (
    <div className="font-sans">
      <Navbar />
      <MainDashboard />
      <ProductDetailsTable products={productsDetails} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </div>
  );
}





export default App;
