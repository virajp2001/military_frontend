// const API_BASE_URL = process.env.BASE_URL

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
// const API_BASE_URL  = "http://localhost:5001/api"

const api = {
  get: (endpoint, options = {}) => {
    // Remove leading slash from endpoint to avoid URL constructor issues
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const url = new URL(cleanEndpoint, API_BASE_URL);
    if (options.params) {
      Object.keys(options.params).forEach(key => {
        if (options.params[key]) url.searchParams.append(key, options.params[key]);
      });
    }
    const token = localStorage.getItem("token");
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }).then(res => res.json());
  },
  post: (endpoint, data) => {
    // Remove leading slash from endpoint to avoid URL constructor issues
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const token = localStorage.getItem("token");
    return fetch(`${API_BASE_URL}/${cleanEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },
};

export { api };

