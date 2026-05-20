import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import {
  cartItemCount,
  cartSubtotal,
  formatMoney,
  getItemUnitPrice,
  lineTotal,
} from "../lib/cartUtils";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  notes: "",
};

const DELIVERY_FEE = 4.99;

function CheckoutPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items ?? []);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const subtotal = cartSubtotal(items);
  const total = subtotal + DELIVERY_FEE;
  const itemCount = cartItemCount(items);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => {
      dispatch(clearCart());
      setStatus("success");
    }, 800);
  };

  if (items.length === 0 && status !== "success") {
    return (
      <div className="checkout-page checkout-page--centered simple-page">
        <h1 className="checkout-page__title">Checkout</h1>
        <p className="simple-page__text">
          Your cart is empty. Add recipes first, then return here to complete your order.
        </p>
        <div className="checkout-page__empty-actions">
          <Link to="/explore" className="checkout-page__cta">
            Browse recipes
          </Link>
          <Link to="/cart" className="checkout-form__back">
            View cart
          </Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="checkout-page checkout-page--centered">
        <h1 className="checkout-page__title">Order placed</h1>
        <p className="checkout-page__subtitle">
          Thanks{form.fullName ? `, ${form.fullName}` : ""}! Your recipe kit order is confirmed. We will
          email updates to {form.email || "you"}.
        </p>
        <Link to="/explore" className="checkout-page__cta">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <h1 className="checkout-page__title">Checkout</h1>
        <p className="checkout-page__subtitle">
          {itemCount} item{itemCount !== 1 ? "s" : ""} · Review and place your order
        </p>
      </header>

      <div className="checkout-page__grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2 className="checkout-form__heading">Delivery details</h2>
          <div className="checkout-form__row checkout-form__row--2">
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-name">
                Full name
              </label>
              <input
                id="checkout-name"
                className="checkout-form__input"
                type="text"
                autoComplete="name"
                required
                value={form.fullName}
                onChange={update("fullName")}
              />
            </div>
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-email">
                Email
              </label>
              <input
                id="checkout-email"
                className="checkout-form__input"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update("email")}
              />
            </div>
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-phone">
                Phone
              </label>
              <input
                id="checkout-phone"
                className="checkout-form__input"
                type="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={update("phone")}
              />
            </div>
          </div>
          <div className="checkout-form__row">
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-address">
                Street address
              </label>
              <input
                id="checkout-address"
                className="checkout-form__input"
                type="text"
                autoComplete="street-address"
                required
                value={form.address}
                onChange={update("address")}
              />
            </div>
          </div>
          <div className="checkout-form__row checkout-form__row--2">
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-city">
                City
              </label>
              <input
                id="checkout-city"
                className="checkout-form__input"
                type="text"
                autoComplete="address-level2"
                required
                value={form.city}
                onChange={update("city")}
              />
            </div>
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-zip">
                ZIP code
              </label>
              <input
                id="checkout-zip"
                className="checkout-form__input"
                type="text"
                autoComplete="postal-code"
                required
                value={form.zip}
                onChange={update("zip")}
              />
            </div>
          </div>
          <div className="checkout-form__row">
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-notes">
                Delivery notes (optional)
              </label>
              <textarea
                id="checkout-notes"
                className="checkout-form__textarea"
                rows={3}
                value={form.notes}
                onChange={update("notes")}
              />
            </div>
          </div>
          <h2 className="checkout-form__heading">Payment</h2>
          <p className="checkout-form__hint">Demo checkout — no real payment is processed.</p>
          <div className="checkout-form__row checkout-form__row--2">
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-card">
                Card number
              </label>
              <input
                id="checkout-card"
                className="checkout-form__input"
                type="text"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                required
                defaultValue="4242 4242 4242 4242"
              />
            </div>
            <div className="checkout-form__field">
              <label className="checkout-form__label" htmlFor="checkout-exp">
                Expiry
              </label>
              <input
                id="checkout-exp"
                className="checkout-form__input"
                type="text"
                placeholder="MM/YY"
                required
                defaultValue="12/28"
              />
            </div>
          </div>
          <div className="checkout-form__actions">
            <Link to="/cart" className="checkout-form__back">
              Back to cart
            </Link>
            <button type="submit" className="checkout-form__submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Placing order…" : `Place order · ${formatMoney(total)}`}
            </button>
          </div>
        </form>

        <aside className="checkout-summary" aria-labelledby="checkout-summary-heading">
          <h2 id="checkout-summary-heading" className="checkout-summary__title">
            Order summary
          </h2>
          <ul className="checkout-summary__list">
            {items.map((item) => (
              <li key={item.id} className="checkout-summary__item">
                <div
                  className="checkout-summary__thumb"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label=""
                />
                <div className="checkout-summary__info">
                  <span className="checkout-summary__name">{item.title}</span>
                  <span className="checkout-summary__qty">
                    {formatMoney(getItemUnitPrice(item))} × {item.quantity}
                  </span>
                </div>
                <span className="checkout-summary__line-total">{formatMoney(lineTotal(item))}</span>
              </li>
            ))}
          </ul>
          <dl className="checkout-summary__totals">
            <div className="checkout-summary__row">
              <dt>Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            <div className="checkout-summary__row">
              <dt>Delivery</dt>
              <dd>{formatMoney(DELIVERY_FEE)}</dd>
            </div>
            <div className="checkout-summary__row checkout-summary__row--total">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
