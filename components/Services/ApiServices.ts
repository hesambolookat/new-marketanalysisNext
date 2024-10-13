// import axios from 'axios';
import axios, { AxiosRequestConfig } from 'axios';

// Base URL for all API requests
const BASE_URL = "https://api.new-marketanalysis.com/api/v1";

// interface for SignUp
interface SignUpData {
  mobile: string;
  countryCode: string;
}

// interface for ForgetPassword
interface ForgetPasswordData {
  mobile: string;
  countryCode: string;
  // سایر فیلدها می‌توانند بر اساس نیاز اضافه شوند
}

// interface for response of signup
interface SignUpResponse {
  userId: string;
  message: string;
}

// interface for response of Forget password
interface ForgetPasswordResponse {
  message: string;
}

// interface for response of Ap
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}


// API Endpoints
export const api = {
    login: (number: string, password: string, code: string) => {
        const config: AxiosRequestConfig = {
          headers: {
            'Content-Type': 'application/json',
            mode:"no-cores",
            "Access-Control-Allow-Origin":"*",
            // Add any other necessary headers here, such as an Authorization token
          },
          // You can include other configurations such as timeout, withCredentials, etc.
        };
    
        return axios.post<ApiResponse<{ accessToken: string }>>(
          `${BASE_URL}/user/login`,
          {
            mobile: number,
            password: password,
            countryCode: `+${code}`,
          },
          config
        );
      },
//   login: (number: string, password: string, code: string) => {
//     return axios.post<ApiResponse<{ accessToken: string }>>(`${BASE_URL}/user/login`, {
//       mobile: number,
//       password: password,
//       countryCode: `+${code}`,
//     }, 
//     {
//         headers: {
//           // Include any additional headers if required
//         },
//         mode: 'no-cors', // Add the mode option here
//       }
//     // <modeResponse<{
//     //     mode: 'no-cors', // Add the mode option here
//     //   }>>
//     );
//   },
  signUp: (data: SignUpData) => {
    return axios.post<ApiResponse<SignUpResponse>>(`${BASE_URL}/user/signup`, {
      mobile: data.mobile,
      countryCode: `+${data.countryCode}`,
    });
  },
  forgetPassword: (data: ForgetPasswordData) => {
    return axios.post<ApiResponse<ForgetPasswordResponse>>(`${BASE_URL}/user/forgetpassword`, {
      mobile: data.mobile,
      countryCode: `+${data.countryCode}`,
    });
  },
};
