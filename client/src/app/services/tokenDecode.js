import { jwtDecode } from "jwt-decode";

export const getLocalUsername = (token) => {
  const decoded = jwtDecode(token);
  return decoded.username;
};
