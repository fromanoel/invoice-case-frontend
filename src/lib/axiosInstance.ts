// lib/axiosInstance.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004', // URL do seu backend NestJS
  withCredentials: true,            // Importante para enviar cookies (JWTs)
});

// Interceptor para capturar erros de token expirado
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tenta renovar o token acessando o endpoint de refresh
        await api.post('/refresh', null, { withCredentials: true });

        // Tenta novamente a requisição original com novo access_token
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Erro ao renovar o token:', refreshError);
        // Aqui você pode redirecionar para login, se quiser
        // window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
