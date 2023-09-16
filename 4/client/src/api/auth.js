import { baseUrl } from "./baseUrl";

export const AuthAPI = () => {
  const login = async (payload) => {
    const params = "/login";

    const response = await fetch(baseUrl + params, {
      body: JSON.stringify(payload),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST"
    });

    if(!response.ok) {
      return null
    }

    const data = await response.json()

    localStorage.setItem("refreshtoken", data.refreshtoken)
    localStorage.setItem("userId", data.userId)

    return data;
  };

  const register = async (payload) => {
    const params = "/register";

    const response = await fetch(baseUrl + params, {
      mode: "cors",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST"
    });

    if(!response.ok) {
      return null
    }

    const data = await response.json()

    return data;
  };

  return {
    login,
    register,
  };
};
