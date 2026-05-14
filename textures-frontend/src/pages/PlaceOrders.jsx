import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import PaymentMethod from "../components/PaymentMethod";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrders() {
  const [method, setMethod] = useState("cod");

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChageHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //Api Calls for COD
        case "cod": {
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case "stripe": {
          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
            console.log("session_url:", session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/*----- Left side ----- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-x1 sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChageHandler}
            required
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            onChange={onChageHandler}
            required
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChageHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
          type="text"
          placeholder="Email address"
          name="email"
          value={formData.email}
        />
        <input
          onChange={onChageHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
          type="text"
          name="street"
          value={formData.street}
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            onChange={onChageHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
          />
          <input
            onChange={onChageHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
            type="text"
            name="state"
            value={formData.state}
            placeholder="Sate"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChageHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
            type="text"
            name="zipcode"
            value={formData.zipcode}
            placeholder="Zipcode"
          />
          <input
            onChange={onChageHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            required
            type="text"
            name="country"
            value={formData.country}
            placeholder="Country"
          />
        </div>
        <input
          onChange={onChageHandler}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          required
          name="phone"
          value={formData.phone}
          placeholder="Phone"
        />
      </div>

      {/* ----- Right Side ----- */}
      <div className="mt-8 ml-3">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        {/*---- PAYMENT METHOD ---- */}
        <PaymentMethod method={method} setMethod={setMethod} />
      </div>
    </form>
  );
}

export default PlaceOrders;
