import axios from 'axios';

axios.defaults.withCredentials = true; // set auth with cookie

export const getServerSideToken = req => {
  const { signedCookies } = req;
  if (!signedCookies) {
    return {};
  } else if (!signedCookies.token) {
    return {}
  }
  return { user: signedCookies.token }
}

const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

export const getUserScript = user => {
  return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`
}

export const loginUser = async (email, password) => {
  const { data } = await axios.post('/api/login', { email, password });
  if (typeof window !== 'undefined') {
    window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
  }
  return data.success;
}

export const getUserProfile = async () => {
  const { data } = await axios.get('/api/profile');
  return data;
}