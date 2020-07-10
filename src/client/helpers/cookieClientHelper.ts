import CryptoJS from "crypto-js";

export const getUsernameAndToken = async (): Promise<{
  username: string;
  accessToken: string;
}> => {
  // PARSE TOKEN AND USERNAME FROM COOKIES
  let username;
  let token;
  const nameAndToken = document.cookie.split(";");
  /* the cookie comes in with either token or username first since we dont know when or why that happens
   this function is supposed to check which one comes first and assign it respectively before parsing */
  if (nameAndToken[0].slice(0,9) === "username"){
    username = nameAndToken[0];
    token = nameAndToken[1];
  } else {
    username = nameAndToken[1];
    token = nameAndToken[0];
  }
  username = username.replace("username=", "").trim();
  token = token.replace("token=", "").trim();
  const parsedToken = decodeURIComponent(token);

  // DECRYPT TOKEN FROM COOKIES
  const decryptedToken = await CryptoJS.AES.decrypt(
    parsedToken,
    "super_secret"
  ).toString(CryptoJS.enc.Utf8);

  return { username, accessToken: decryptedToken };
};
