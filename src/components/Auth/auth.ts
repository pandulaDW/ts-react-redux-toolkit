import jwt_decode from "jwt-decode";

interface TokenBody {
  username: string;
  token_use: string;
  "cognito:groups": string[];
}

interface Tokens {
  accessToken: string | null;
  idToken: string | null;
}

const getToken = (): Tokens => {
  const extract = (id: string) => new URLSearchParams(window.location.hash).get(id);
  let accessToken = extract("#access_token");
  let idToken = extract("id_token");

  if (!accessToken) accessToken = extract("access_token");
  if (!idToken) idToken = extract("#id_token");

  return { accessToken, idToken };
};

const isValidToken = ({ accessToken, idToken }: Tokens): Boolean => {
  let decodedAccessToken: TokenBody | null;

  try {
    if (!accessToken || !idToken) {
      console.log("tokens not present");
      return false;
    }
    decodedAccessToken = jwt_decode<TokenBody>(accessToken);
  } catch {
    console.log("malformed jwt token");
    return false;
  }

  if (!decodedAccessToken) {
    console.log("access token null");
    return false;
  }

  if (decodedAccessToken.token_use !== "access") {
    console.log("not an access token");
    return false;
  }

  if (decodedAccessToken["cognito:groups"].includes("Lei-Tools-ReadAccess")) {
    console.log("access token valid");
    return true;
  }

  return false;
};

// sets the tokens in localStorage and returns if its valid
export const setTokens = (): Boolean => {
  const { accessToken, idToken } = getToken();

  if (accessToken) localStorage.setItem("accessToken", accessToken);
  if (idToken) localStorage.setItem("idToken", idToken);

  return isValidToken({ accessToken, idToken });
};

export const getUserName = (): string => {
  const regex = /_(.*?)@/;
  const { accessToken } = getToken();

  if (accessToken) {
    const { username } = jwt_decode<TokenBody>(accessToken);
    const match = regex.exec(username);
    if (match) {
      if (match.length < 2) return username;
      return match[1].split(".").join(" ");
    }
  }

  return "";
};
