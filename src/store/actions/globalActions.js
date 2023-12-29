export const globalActions = {
    setConnectedAccount: (state, action) => {
      state.connectedAccount = action.payload
    },
    setProductsDetails: (state, action) => {
      console.log('Setting products details:', action.payload);
      state.productsDetails = action.payload;
    },
    setManufactureModal: (state, action) => {
      state.manufactureModal = action.payload
    },
    setPackModal: (state, action) => {
      state.packModal = action.payload
    },
    setShipModal: (state, action) => {
      state.shipModal = action.payload
    },
    setReceiveModal: (state, action) => {
      state.receiveModal = action.payload
    },
    setSellModal: (state, action) => {
      state.sellModal = action.payload
    },
  }
  