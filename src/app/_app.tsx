import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3004",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post("http://localhost:3004/refresh", null, {withCredentials: true});

        if (response.status === 200 || response.status === 201) {
          return axiosInstance(originalRequest);
        } else {

          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("Erro ao tentar renovar o token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
