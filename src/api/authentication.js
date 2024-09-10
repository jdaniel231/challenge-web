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
      const data = await response.json();
      return [data, ''];
    }
    const errorData = await response.text();
    return ['', `Erro no servidor: ${errorData.errors?.join(', ') || errorData.message || response.statusText}`];
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
      const data = await response.json();
      return [data, ''];
    }
    const errorData = await response.text();
    return ['', `Erro no servidor: ${errorData.errors?.join(', ') || errorData.message || response.statusText}`];
  } catch (error) {
    console.error('Error: ', error);
    return ['', `Erro de conexão: ${error.message}`];
  }
} 

export default { loginApi, registerApi };
