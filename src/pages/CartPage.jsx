import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setItemQuantity } from "../features/cart/cartSlice";
import { cartSubtotal, formatMoney, getItemUnitPrice, lineTotal } from "../lib/cartUtils";

function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items ?? []);
  const totalPieces = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = cartSubtotal(items);

  if (items.length === 0) {
    return (
      <div className="simple-page">
        <h1 className="simple-page__title">Cart</h1>
        <p className="simple-page__text">Your cart is empty. Browse recipes and tap Add to cart.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Cart</h1>
      <p className="cart-page__summary">
        {items.length} recipe{items.length !== 1 ? "s" : ""} · {totalPieces} item{totalPieces !== 1 ? "s" : ""}{" "}
        total
      </p>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <div
              className="cart-row__thumb"
              style={{ backgroundImage: `url(${item.image})` }}
              role="img"
              aria-label=""
            />
            <div className="cart-row__body">
              <h2 className="cart-row__title">{item.title}</h2>
              <p className="cart-row__meta">
                <span>{item.badge}</span>
                <span aria-hidden> · </span>
                <span>{item.minutes} min</span>
                <span aria-hidden> · </span>
                <span>★ {item.rating}</span>
                <span aria-hidden> · </span>
                <span className="cart-row__price">{formatMoney(getItemUnitPrice(item))} each</span>
              </p>
              <p className="cart-row__line-total">
                Line total: <strong>{formatMoney(lineTotal(item))}</strong>
              </p>
              <div className="cart-row__qty">
                <label className="cart-row__qty-label" htmlFor={`qty-${item.id}`}>
                  Count
                </label>
                <input
                  id={`qty-${item.id}`}
                  className="cart-row__qty-input"
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(setItemQuantity({ id: item.id, quantity: e.target.value }))
                  }
                />
                <button
                  type="button"
                  className="cart-row__remove"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <footer className="cart-page__footer">
        <p className="cart-page__subtotal">
          Subtotal: <strong>{formatMoney(subtotal)}</strong>
        </p>
        <Link to="/checkout" className="cart-page__checkout-btn">
          Proceed to checkout
        </Link>
      </footer>
    </div>
  );
}

export default CartPage;
