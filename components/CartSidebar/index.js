import Link from "next/link";
import { useContext } from 'react';
import { CartContext } from '../../helpers/Contexts/CartContext';
import { REMOVE_PRODUCT } from '../../helpers/Reducers/cartReducer';
import { deleteCart } from './api/cartSidebarApi';
import styles from "./styles/cartSidebar.module.css";

const CartSidebar = (props) => {

  let totalPrice = 0;

  // const [ isCartSidebar, setIsCartSidebar ] = useState(true);
  const { cart, dispatch } = useContext(CartContext);

  async function handleDelete(id) {
    // COMMT: made this a promise so it deletes from cart only if there is no error in fetch delete.
    new Promise((res, req) => {

      res( deleteCart(id) );
    }).then((res) => {
      dispatch({type: REMOVE_PRODUCT, id:res.id});
    });

  };

  const getPrice = cart?.map(currCart => {
    totalPrice += currCart.price;
  });

  const cartList = cart?.map(currCart => (
    <div key={currCart.key} className={styles['cart-product']} title={currCart.title} >

      <span
        onClick={() => handleDelete(currCart.id)}
        >
        X
      </span>
      <img
        src={currCart.imgSrc}
        alt={currCart.title}
        className={styles['img']}
      />
    </div>
  ));

  return (
    <div className={styles['cart-container']} >

      {props.isCartSidebar && (
        <>

          <h2>Cart</h2>
          <hr className='short-hr' />

          <div className={styles['image-container']}>
            {cartList}
          </div>

          <div className={styles['footer']}>
            <div className={styles['total-price']}>
              Price: {totalPrice}
            </div>

            <Link href="/cart" >
              {/* onClick={() => isCartSidebar = false} */}
              <button className="basic-material-btn" >
                Proceed
              </button>
            </Link>

          </div>
        </>

      )}

    </div>
  )
}

export default CartSidebar;