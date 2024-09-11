import { apiUrl } from './config.js';


const loginApi = async (BodyObject) => {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(BodyObject)
  };

  try {
    const response = await fetch(`${apiUrl}/login`, requestOptions);
    if (response.ok) {
      return [response, ''];
    }
    if(response.status === 401) {
      return ['', 'Usuário ou senha incorretos'];
    }
    // const errorData = await response.text();
    // return ['', `Erro no servidor: ${errorData.errors?.join(', ') || errorData.message || response.statusText}`];
  } catch (error) {
    console.error('Error: ', error);
    return ['', `Erro de conexão: ${error.message}`];
  }
}

const registerApi = async (BodyObject) => {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(BodyObject)
  };

  try {
    const response = await fetch(`${apiUrl}/signup`, requestOptions);
    if (response.ok) {
      return [response, ''];
    }
    if(response.status === 422) {
      return ['', 'Usuário ja esta cadastrado'];
    }
    // const errorData = await response.text();
    // return ['', `Erro no servidor: ${errorData.errors?.join(', ') || errorData.message || response.statusText}`];
  } catch (error) {
    console.error('Error: ', error);
    return ['', `Erro de conexão: ${error.message}`];
  }
}

const logoutApi = async (jwtToken) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
  };

  try {
    const response = await fetch(`${apiUrl}/logout`, requestOptions);
    if (response.ok) {
      return [response, ''];
    }
    if(response.status === 401) {
      return ['', 'Algo deu errado, tente novamente'];
    }
  } catch (error) {
    console.error('Error: ', error);
    return ['', `Erro de conexão: ${error.message}`];
  }
}
export default { loginApi, registerApi, logoutApi };
