import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Tratamento específico por status code
      switch (error.response.status) {
        case 401:
          console.error("Não autorizado");
          break;
        case 404:
          console.error("Recurso não encontrado");
          break;
        case 500:
          console.error("Erro interno do servidor");
          break;
        default:
          console.error("Erro na requisição");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
