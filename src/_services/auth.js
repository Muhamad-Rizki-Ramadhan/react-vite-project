import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const register = async (formData) => {
  try {
    const { data } = await API.post("/register", formData); 
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async ({ token }) => {
  try {
    const { data } = await API.post('/logout', { token }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    
    localStorage.removeItem('accessToken')
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const getRole = () => {
    try {
        const userInfoString = localStorage.getItem('userInfo'); 
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            return userInfo?.role || null;
        }
    } catch (e) {
        console.error("Gagal parse userInfo:", e);
        return null;
    }
    return null;
}


export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token expired",
        data: null,
      };
    }

    return {
      success: true,
      message: "Token valid",
      data: decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
