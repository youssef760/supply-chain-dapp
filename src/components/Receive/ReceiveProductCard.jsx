// ReceiveProductCard.jsx
import React, { useState } from 'react';
import ReceiveProductForm from './ReceiveProductForm';
import { globalActions } from '../../store/globalSlices';
import { useDispatch } from 'react-redux';

const ReceiveProductCard = () => {
  const { setReceiveModal } =  globalActions
  const dispatch = useDispatch()

  const onReceiveProduct = () => {
    dispatch(setReceiveModal('scale-100'))
  }
 
  return (
    <div className="max-w-sm rounded  m-4 p-4 cursor-pointer text-center text-3xl text-white font-extrabold" onClick={onReceiveProduct}>
        Receive Product
    </div>
  );
};

export default ReceiveProductCard;
