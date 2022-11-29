import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';


const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items)
  console.log('cartItems', cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length > 0 && cartItems.map(item => <CartItem key={item.id}
          item={{ id: item.id, title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
        />)}
        {/* <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        /> */}
      </ul>
    </Card>
  );
};

export default Cart;
