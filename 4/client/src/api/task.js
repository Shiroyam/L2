import { baseUrl } from "./baseUrl";

export const TaskAPI = () => {
  const get = async (payload) => {
    const params = "/get";

    const subscription = localStorage.getItem("subscription")

    const response = await fetch(baseUrl  + params, {
      body: JSON.stringify({...payload, notification: JSON.parse(subscription)}),
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok) {
      return null
    }

    const data = await response.json()

    return data;
  };

  const create = async (payload) => {
    const params = "/create";

    const response = await fetch(baseUrl + params, {
      body: JSON.stringify(payload),
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok) {
      return null
    }

    const data = await response.json()

    return data;
  };

  const update = async (payload) => {
    const params = "/update";

    const response = await fetch(baseUrl + params, {
      body: JSON.stringify(payload),
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok) {
      return null
    }

    const data = await response.json()

    return data;
  };

  const remove = async (payload) => {
    const params = "/remove";

    const response = await fetch(baseUrl + params, {
      body: JSON.stringify(payload),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response.ok) {
      return null
    }

    const data = await response.json()

    return data;
  };

  return {
    get,
    create,
    update,
    remove
  };
};