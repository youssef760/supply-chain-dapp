// ManufactureProductCard.jsx
import React, { useState } from 'react';
import { globalActions } from '../../store/globalSlices'
import { useDispatch } from 'react-redux'

const ManufactureProductCard = () => {
  const { setManufactureModal } =  globalActions
  const dispatch = useDispatch()
  const onManufactureProduct = () => {
    dispatch(setManufactureModal('scale-100'))
  }

  return (
    <div className="max-w-sm rounded  m-4 p-4 cursor-pointer text-center text-3xl text-white font-extrabold" 
    onClick={onManufactureProduct}>
        Manufacture Product
    </div>
  );
};

export default ManufactureProductCard;
