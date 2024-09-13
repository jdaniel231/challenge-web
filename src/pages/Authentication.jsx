import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { validateEmail, validatePassword } from '../utlities/validations.js';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authentication.js';
import { useCookies } from 'react-cookie';
import Button from '../elements/Button.jsx';


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

  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrorState);

  useEffect(() => {
    if (cookies.jwt) {
      navigate('/');
    }
  }, []);


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
        const [response, error] = await authApi.loginApi({
          user: {
            email: email,
            password: password
          }
        });
        handleResponse([response, error]);
      } else {
        const [response, error] = await authApi.registerApi({
          user: {
            email: email,
            password: password
          }
        });
        handleResponse([response, error]);
      }
    }

  }

  const handleResponse = async ([response, error]) => {
    if (error) {
      setErrors({
        ...errors,
        api: error
      });
      alert(` ${error}`);
    } else {
      const jwt = response.headers.get('Authorization');
      // const result = await response.json();
      // const message = result.message;
      // const user = result.data

      if (jwt) {
        setCookie('jwt', jwt);
      }

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
        <form>
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
          <Button
            handleClick={handleSubmit}
          >
            {pageType === PageType.LOGIN ? "Enter" : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  pageType: PropTypes.number.isRequired
};

export default Authentication;
