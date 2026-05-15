import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, getCartAmount, products } = useContext(ShopContext);

  if (!products || products.length === 0) {
    return <dv>Loading cart totals...</dv>;
  }

  const cartAmount = getCartAmount();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <Title text1={"CART"} text2={"TOTALS"} />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {cartAmount}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
