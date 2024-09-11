import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authentication.js";
import { useState } from "react";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [jwt, setJwt] = useState(cookies.jwt);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return cookies.jwt;
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    const [result, error] = await authApi.logoutApi(cookies.jwt);

    handleResponse([result, error]);
    
  }

  const handleLogin = (e) => { 
    e.preventDefault();
    navigate('/login');
  }

  const handleResponse = async ([response, error]) => {
    if (error) {
      removeCookie('jwt');
    } else {
      removeCookie('jwt');
    }

    setJwt(null);

  }
  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-800">
            Code Challenge
          </p>
          <div className="flex items-center justify-center">
            {jwt ? (
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar