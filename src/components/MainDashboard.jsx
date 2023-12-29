import React from 'react';
import ManufactureProductCard from './Manufacture/ManufactureProductCard';
import PackProductCard from './Pack/PackProductCard';
import ShipProductCard from './Ship/ShipProductCard';
import ReceiveProductCard from './Receive/ReceiveProductCard';
import SellProductCard from './Sell/SellProductCard';
import ManufactureProductForm from './Manufacture/ManufactureProductForm';
import PackProductForm from './Pack/PackProductForm';
import ShipProductForm from './Ship/ShipProductForm';
import SellProductForm from './Sell/SellProductForm';
import ReceiveProductForm from './Receive/ReceiveProductForm';


const MainDashboard = () => {
  return (
    <div className="my-20 mx-10 grid grid-rows-3 grid-flow-col gap-4 ">
        <div className="row-span-2 col-span-2 bg-gray-800 rounded-lg">
          <ManufactureProductCard />
          <ManufactureProductForm />
        </div>

        <div className="bg-gray-800 rounded-lg">
          <PackProductCard />
          <PackProductForm />
        </div>

      <div className="col-span-2 bg-gray-800 rounded-lg">
          <ShipProductCard />
          <ShipProductForm />
        </div>

        <div className="bg-gray-800 rounded-lg">
          <ReceiveProductCard />
          <ReceiveProductForm />
        </div>

        <div className="bg-gray-800 rounded-lg">
          <SellProductCard />
          <SellProductForm />
        </div>
    </div>
  );
};

export default MainDashboard;
