import { jwtDecode } from "jwt-decode";

export const getLocalUserInfo = (token) => {
  const decoded = jwtDecode(token);
  const baseURL = "http://127.0.0.1:8000";
  return {
    username: decoded.username,
    userId: decoded.user_id,
    avatar: `${baseURL}${decoded.avatar}`,
  };
};
