// SellProductCard.jsx
import React, { useState } from 'react';
import SellProductForm from './SellProductForm';
import { globalActions } from '../../store/globalSlices';
import { useDispatch } from 'react-redux';

const SellProductCard = () => {
  const { setSellModal } =  globalActions
  const dispatch = useDispatch()

  const onSellProduct = () => {
    dispatch(setSellModal('scale-100'))
  }


  return (
    <div className="max-w-sm rounded  m-4 p-4 cursor-pointer text-center text-3xl text-white font-extrabold" onClick={onSellProduct}>
        Sell Product
    </div>
  );
};

export default SellProductCard;
