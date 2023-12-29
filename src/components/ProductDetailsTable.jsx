import React from 'react'

const ProductDetailsTable = ({ products }) => {
    return (
      <div className="my-20 mx-10">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="min-w-full bg-white border border-gray-300 shadow-md rounded overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">State</th>
                <th className="border border-gray-300 px-4 py-2">Manufacturer</th>
                <th className="border border-gray-300 px-4 py-2">Packager</th>
                <th className="border border-gray-300 px-4 py-2">Distributor</th>
                <th className="border border-gray-300 px-4 py-2">Retailer</th>
                <th className="border border-gray-300 px-4 py-2">Consumer</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.price} ETH</td>
                  <td className="border border-gray-300 px-4 py-2">{product.state}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.manufacturer}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.packager}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.distributor}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.retailer}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.consumer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default ProductDetailsTable