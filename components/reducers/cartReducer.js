import uuid from 'uuid/v4';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // should this be array or object type?
      let stateArr = [
        ...state,
        {
          id: action.cart.id,
          productId: action.cart.productId,
          title: action.cart.title,
          imgSrc: action.cart.imgSrc,
          price: action.cart.price,
          key: uuid()
        }
      ];

      // console.log('stateArr :>> ', stateArr);
      return stateArr;

    case REMOVE_PRODUCT:
      return state.filter(currCart => currCart.id !== action.id);

    default:
      return state;
  }
}

export default cartReducer;