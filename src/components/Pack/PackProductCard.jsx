// PackProductCard.jsx
import React, { useState } from 'react';
import PackProductForm from './PackProductForm';
import { globalActions } from '../../store/globalSlices'
import { useDispatch } from 'react-redux'

  

const PackProductCard = () => {
  const { setPackModal } =  globalActions
  const dispatch = useDispatch()

  const onPackProduct = () => {
    dispatch(setPackModal('scale-100'))
  }

  return (
    <div className="max-w-sm rounded  m-4 p-4 cursor-pointer text-center text-3xl text-white font-extrabold" onClick={onPackProduct}>
        Pack Product
    </div>
  );
};

export default PackProductCard;
