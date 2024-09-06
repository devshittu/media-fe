import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const serverApiClient = Axios.create({
  baseURL: process.env.NEXT_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// serverApiClient.interceptors.request.use(
//   async (config) => {
//     // try {
//     //   const session = await auth();  // Fetch the session

//     //   if (session?.accessToken) {
//     //     config.headers['Authorization'] = `Bearer ${session.accessToken}`;
//     //   }
//     // } catch (error) {
//     //   console.error('Error fetching session for authorization', error);
//     //   // Handle the error if session fetching fails
//     // }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor (if needed)
// serverApiClient.interceptors.response.use(
//   (response: AxiosResponse) => response.data,
//   (error) => {
//     // Handle response errors here
//     return Promise.reject(error);
//   }
// );

export default serverApiClient;
