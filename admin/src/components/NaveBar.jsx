import { assets } from "../assets/assets";

const NaveBar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div className="flex items-center py-2 px[4%] justify-between">
      <img className="w-[max(10%,100px)]" src={assets.logo} />
      <button
        onClick={logout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default NaveBar;
