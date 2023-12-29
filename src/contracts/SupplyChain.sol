// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;



contract SupplyChain {
    enum State {Manufactured, Packed, Shipped, Received, Sold}

    struct Product {
        uint productId;
        string name;
        uint price;
        State state;
        address manufacturer;
        address packager;
        address distributor;
        address retailer;
        address consumer;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    event ProductManufactured(uint productId, string name, uint price);
    event ProductPacked(uint productId);
    event ProductShipped(uint productId);
    event ProductReceived(uint productId);
    event ProductSold(uint productId);

    

    modifier onlyRole(uint _productId, State requiredState) {
        require(products[_productId].state == requiredState, "Invalid state transition");
        _;
    }

    function manufactureProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Product name cannot be empty");
        require(_price > 0, "Product price must be greater than zero");
        productCount++;

        products[productCount] = Product(
            productCount,
            _name,
            _price,
            State.Manufactured,
            msg.sender,
            address(0),
            address(0),
            address(0),
            address(0)
        );

        emit ProductManufactured(productCount, _name, _price);
    }

    function packProduct(uint _productId) public onlyRole(_productId, State.Manufactured) {
        require(msg.sender == products[_productId].manufacturer, "Only manufacturer can pack the product");

        products[_productId].state = State.Packed;
        products[_productId].packager = msg.sender;
        emit ProductPacked(_productId);
    }

    function shipProduct(uint _productId, address _distributor) public onlyRole(_productId, State.Packed) {
        require(msg.sender == products[_productId].packager, "Only packager can ship the product");

        products[_productId].state = State.Shipped;
        products[_productId].distributor = _distributor;
        emit ProductShipped(_productId);
    }

    function receiveProduct(uint _productId) public onlyRole(_productId, State.Shipped) {
        require(msg.sender == products[_productId].distributor, "Only distributor can receive the product");

        products[_productId].state = State.Received;
        emit ProductReceived(_productId);
    }

    function sellProduct(uint _productId) public onlyRole(_productId, State.Received) {
        require(msg.sender == products[_productId].retailer, "Only retailer can sell the product");

        products[_productId].state = State.Sold;
        products[_productId].consumer = msg.sender;
        emit ProductSold(_productId);
    }

    function getProductCount() public view returns (uint) {
        return productCount;
    }

    function getProductDetails(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);

        for (uint i = 1; i <= productCount; i++) {
            allProducts[i - 1] = products[i];
        }

        return allProducts;
    }
}
