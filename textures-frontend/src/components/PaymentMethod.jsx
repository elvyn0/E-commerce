import Title from "./Title";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

function PaymentMethod({ method, setMethod }) {
  const razorpayOnClickHandiler = () => {
    toast.warning("Razorpay is disabled in demo");
  };

  return (
    <div className="mt-12">
      <Title text1={"PAYMENT"} text2={"METHOD"} />
      <div className="flex gap-3 flex-col lg:flex-row">
        <div className="flex items-center gap-3 mb-1 border p-2 px-3 cursor-pointer">
          <p
            onClick={() => setMethod("stripe")}
            className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
          ></p>
          <img className="h-5 mx-4" src={assets.stripe_logo} />
        </div>
        <div className="flex items-center gap-3 mb-1  border p-2 px-3 cursor-pointer">
          <p
            onClick={() => razorpayOnClickHandiler()}
            className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
          ></p>
          <img className="h-5 mx-4" src={assets.razorpay_logo} />
        </div>
        <div className="flex items-center gap-3 mb-1  border  p-2 px-3 cursor-pointer">
          <p
            onClick={() => setMethod("cod")}
            className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
          ></p>
          <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
        </div>
      </div>
      <div className="w-full text-end mt-8">
        <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
          {" "}
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;
