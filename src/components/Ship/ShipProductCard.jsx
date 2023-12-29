import React from 'react';
import { globalActions } from '../../store/globalSlices';
import { useDispatch } from 'react-redux';

const ShipProductCard = () => {
  const { setShipModal } = globalActions;
  const dispatch = useDispatch();

  const onShipProduct = () => {
    dispatch(setShipModal('scale-100'));
  };

  return (
    <div className="max-w-sm rounded  m-4 p-4 cursor-pointer text-center text-3xl text-white font-extrabold" onClick={onShipProduct}>
        Ship Product
    </div>
  );
};

export default ShipProductCard;