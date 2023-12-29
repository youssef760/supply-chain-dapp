import React, { useState } from 'react';
import { receiveProduct } from '../../SupplyChainContract'; // Replace with the actual file path
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '../../store/globalSlices';
import { toast } from 'react-toastify';

const ReceiveProductForm = () => {
  const [productId, setProductId] = useState('');

  
  const { receiveModal, buttonSubmit } = useSelector((states) => states.globalStates);
  const { setReceiveModal } = globalActions;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId ) return;

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await receiveProduct(productId)
          .then((tx) => {
            closeModal();
            resolve(tx);
          })
          .catch((error) => {
            alert(JSON.stringify(error));
            reject(error);
          });
      }),
      {
        pending: 'Receiving Product...',
        success: 'Product Received successfully 👌',
        error: 'Encountered error while receiving 🤯',
      }
    );
  };

  const closeModal = () => {
    dispatch(setReceiveModal('scale-0'));
    setProductId('');
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen
      bg-opacity-50 transform flex justify-center items-center
      transition-transform z-50 duration-300 ${receiveModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">
              Receive Product
            </p>
            <button
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
              type="button"
            >
              <FaTimes className="text-black" />
            </button>
          </div>

          <div
            className="flex flex-col justify-center items-center
          rounded-xl space-y-2 my-5"
          >
            <div
              className="flex justify-center items-center
              space-x-1 shadow-md py-2 px-4 rounded-full"
            >
              <span>Receive</span>
            </div>
            <small>Make sure all records are correctly entered.</small>
          </div>
          <div
            className="flex justify-between items-center bg-gray-300
            rounded-xl mt-5"
          >
            <input
              className="block w-full text-sm p-2
            text-slate-500 bg-transparent border-0
            focus:outline-none focus:ring-0"
              type="text"
              name="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Product ID"
              required
            />
          </div>

          <button
            className={`${buttonSubmit}`}
            type="submit"
          >
            Receive Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReceiveProductForm
