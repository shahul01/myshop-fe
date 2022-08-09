import { v4 as uuid } from "uuid";

export const ADD_TO_CART = "ADD_TO_CART";
export const INCREMENT_PRODUCT = "INCREMENT_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const cartReducer = (state: ICart[], action: ICartAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      // should this be array or object type?
      const addedState = [
        ...state,
        {
          id: action.cart?.id,
          productId: action.cart?.productId,
          title: action.cart?.title,
          repeatItem: action.cart?.repeatItem,
          imgSrc: action.cart?.imgSrc,
          price: action.cart?.price,
          key: uuid()
        }
      ];

      // console.log('addedState :>> ', addedState);
      return addedState;

    case INCREMENT_PRODUCT:
      const prodIncrementedCart = state?.map(currProd => {
        console.log('###INCR_PROD', currProd?.id, action?.id);
        if (currProd?.id === action?.id) {
          currProd?.repeatItem === action?.repeatItem
        };
        return currProd;
      });

      console.log(`###prodIncrementedCart: `, prodIncrementedCart);

      return prodIncrementedCart;


    case REMOVE_PRODUCT:
      return state?.filter(currProd => currProd?.id !== action?.id);

    default:
      return state;
  }
}

export default cartReducer;
