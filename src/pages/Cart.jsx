import { useDispatch, useSelector } from "react-redux";
import { asyncupdateuser } from "../store/actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const products = useSelector((state) => state.productReducer.products);

  const IncreaseQuantityHandler = (index, product) => {
    const copyuser = { ...users, cart: [...users.cart] }; // Deep Copy

    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1,
    };

    console.log(copyuser);

    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const DecreaseQuantityHandler = (index, product) => {
    const copyuser = { ...users, cart: [...users.cart] }; // Deep Copy

    if (users.cart[index].quantity > 0) {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    } else {
      copyuser.cart.splice(index, 1);
    }

    console.log(copyuser);

    dispatch(asyncupdateuser(copyuser.id, copyuser));
  };

  const cartItems = users.cart.map((c, index) => {
    return (
      <li
        key={c.product.id}
        className="flex items-center gap-4 mb-4 bg-gray-500 p-2 rounded"
      >
        <img
          className="w-[9vh] h-[10vh] object-cover rounded"
          src={c.product.image}
          alt=""
        />
        {c.product.title}
        <span className="ml-4 font-bold">₹{c.product.price}</span>
        <p className="ml-auto flex items-center">
          <button
            onClick={() => DecreaseQuantityHandler(index, c)}
            className="text-2xl"
          >
            -
          </button>
          <span className="mx-2 bg-gray-500 px-2 rounded mt-1">
            {c.quantity}
          </span>
          <button
            onClick={() => IncreaseQuantityHandler(index, c)}
            className="text-2xl"
          >
            +
          </button>
        </p>
      </li>
    );
  });
  return <ul className="mt-10">{cartItems}</ul>;
};

export default Cart;
