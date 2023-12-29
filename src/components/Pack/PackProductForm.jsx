import React, { useState } from 'react';
import { packProduct } from '../../SupplyChainContract'; 
import { FaTimes, FaEthereum } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { globalActions } from '../../store/globalSlices'
import { toast } from 'react-toastify'


const PackProductForm = () => {
  const [productId, setProductId] = useState('');
  
  const { packModal, buttonSubmit } = useSelector((states) => states.globalStates)
  const { setPackModal } = globalActions
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!productId ) return

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await packProduct(productId )
          .then((tx) => {
            closeModal()
            resolve(tx)
          })
          .catch((error) => {
            alert(JSON.stringify(error))
            reject(error)
          })
      }),
      {
        pending: 'Packing Product...',
        success: 'Pack successfully created 👌',
        error: 'Encountered error 🤯',
      }
    )
  }
  const closeModal = () => {
    dispatch(setPackModal('scale-0'))
    setProductId('')
  }

  return (
    <div
      className={`fixed top-0 left-0 bg-black w-screen h-screen
      bg-opacity-50 transform flex justify-center items-center
      transition-transform z-50 duration-300 ${packModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black rounded-xl
        w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-black">Manufacture Product</p>
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
              <span>Manufacture</span>
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
              type="number"
              name="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Product Id"
              required
            />
          </div>

          <button
            className={`${buttonSubmit}`}
            type="submit"
          >
            Pack Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default PackProductForm;

