import PropTypes from 'prop-types';
import { useState } from 'react';
import { validateEmail, validatePassword } from '../utlities/validations.js';
import { Link, useNavigate } from 'react-router-dom';
// import {registerApi, loginApi} from '../api/authentication.js';
import authApi from '../api/authentication.js';

// Agora você pode usar authApi.loginApi e authApi.registerApi


export const PageType = Object.freeze({
  LOGIN: 0,
  REGISTER: 1
});

const initialErrorState = {
  email: ' ',
  password: ' ',
  api: ' ',
}

const Authentication = ({ pageType }) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrorState);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors(initialErrorState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErros = {
      email: ' ',
      password: ' ',
      api: ' ',
    };
    
    if (!validateEmail(email)) {
      newErros.email = "Invalid email";
    }
    if (!validatePassword(password)) {
      newErros.password = "A senha deve ter pelo menos 6 caracteres";
    }
    
    setErrors(newErros);
    

    const hasErros = Object.values(newErros).some(erro => erro !== ' ');
    
    if (!hasErros) {
      if (pageType === PageType.LOGIN) {
        const [result, error] = await authApi.loginApi({
          user: {
            email: email,
            password: password
          }
        });
        handleResponse(result, error);
      } else {
        const [result, error] = await authApi.registerApi({
          user: {
            email: email,
            password: password
          }
        });
        handleResponse(result, error);
      }
    }
    
    
  }
  const handleResponse = (result, error) => {
    if (error) {
      setErrors({
        ...errors,
        api: error
      });
      alert(`Erro: ${error}`);
    } else {
      const message = result.message;
      const user = result.user;
  
      if (pageType === PageType.LOGIN) {
        alert("Login realizado com sucesso!");
        navigate('/');
      } else {
        alert("Registro com sucesso!");
        resetForm();
        navigate('/login');
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-96 px-2 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold">
          {pageType === PageType.LOGIN ? "Login" : "Register"}
        </h3>

        {
          <p className="text-sm text-gray-500 mt-4">
            {pageType === PageType.LOGIN ? "Don't have an account?" : "Already have an account?"}
            <Link
              to={pageType === PageType.LOGIN ? "/register" : "/login"}
              className="text-indigo-600 hover:text-indigo-500 ml-1"
            >
              {pageType === PageType.LOGIN ? " Register" : " Login"}
            </Link>
          </p>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="mt-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && errors.email !== ' ' && <p className='text-red-500 text-sm text-medium mt-1'>{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="mt-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && errors.password !== ' ' && <p className='text-red-500 text-sm text-medium mt-1'>{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {pageType === PageType.LOGIN ? "Enter" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  pageType: PropTypes.number.isRequired
};

export default Authentication;
