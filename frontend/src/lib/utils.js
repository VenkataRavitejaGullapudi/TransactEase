const AUTH_TOKEN_KEY = "r_token";
const AUTH_USERNAME_KEY = "r_username";

export function storeAuthToken(token, userName = "Ravi") {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    userName && localStorage.setItem(AUTH_USERNAME_KEY, userName);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USERNAME_KEY);
  }
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthUserName() {
  return localStorage.getItem(AUTH_USERNAME_KEY);
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USERNAME_KEY);
}

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
