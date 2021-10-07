import Link from "next/link";
// import {isCartSidebar} from "../../components/CartSidebar/index";
import useFetch from "../../Helpers/Hooks/useFetch";
import styles from "./cart.module.css";

const Cart = () => {

  const { data: cartData, isPending, error }= useFetch(`http://localhost:1337/carts`, 'get', null);

  let cartList = cartData?.map(currData => (
    <div className={styles['cart-body']} key={currData.id}>
      <img className={styles['body-img']} src={currData.imgSrc} alt={currData.title} />
      <div className={styles['cart-detail']}>
        <h1 className={styles['prod-title']}>{currData.title}</h1>
        <h4 className={styles['prod-price']}>{currData.price}</h4>
      </div>

    </div>

  ));

  function handleCheckout() {
    console.log('click');
  };

  return (
    <div >
      <Link href="/">
        {/* onClick={() => isCartSidebar = true} */}
        <p className="back-btn" >
          Go Home
        </p>
      </Link>

      <h1 className={styles['title']}>Cart</h1>
      <hr className="medium-hr" />

      <div className={styles['cart-body-container']}>
      {!error && !isPending && cartList}

      </div>

      <div className={styles['checkout-btn-container']}>
        <button
          className={`basic-material-btn ${styles['checkout-btn']}`}
          onClick={() => handleCheckout()}
          >
          Checkout
        </button>

      </div>

    </div>
  )

};

export default Cart