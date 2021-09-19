
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state, {
          productId: action.cart.productId,
          title: action.cart.title,
          imgSrc: action.cart.imgSrc,
          price: action.cart.price
        }
      ]
    case 'REMOVE_BOOK':
      return state.filter(cart => cart.productId !== action.cart.productId)
    default:
      return state
  }
}

export default cartReducer;