import { apiUrl } from './config.js';

// const getChallenges = async () => {
//   try {
//     const response = await fetch(`${apiUrl}/api/v1/challenges`,{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(challengeData),
//       body = await response.json();
//     });
    
//   } catch (error) {
//     console.error('Error: ', error);
//     return ['', `Erro de conexão: ${error.message}`];
//   }
// };

// const getChallengeId = async (id) => {
//   try {
//     const response = await fetch(`${apiUrl}/api/v1/challenges/${id}`);
//     if (response.ok) {
//       return [response.json(), ''];
//     }
//     return ['', 'Erro ao recuperar o desafio'];
//   } catch (error) {
//     console.error('Error: ', error);
//     return ['', `Erro de conexão: ${error.message}`];
//   }
// };

const addChallenge = async (jwtToken, BodyObject) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    },
    body: JSON.stringify(BodyObject)
  };
  try {
    const response = await fetch(`${apiUrl}/api/v1/challenges`, requestOptions);

    if (response.ok) {
      // Aguarde a resposta ser convertida em JSON
      const data = await response.json();
      return [data, '']; // Retorna o JSON e uma string vazia para o erro
    }

    if (response.status === 422) {
      // Retorna um erro específico para o status 422
      return ['', 'Unauthorized'];
    }

    // Para outros erros, obtém a mensagem de erro
    const errorMessage = await response.json();
    return ['', errorMessage.message || 'Erro desconhecido']; // Garante que a mensagem de erro é uma string
  } catch (error) {
    return ['', `Erro de conexão: ${error.message}`]; // Retorna a mensagem de erro de conexão
  }
};

export default { addChallenge };