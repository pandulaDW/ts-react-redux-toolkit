import jwt_decode from "jwt-decode";

interface TokenBody {
  token_use: string;
  "cognito:groups": string[];
}

interface Tokens {
  accessToken: string | null;
  idToken: string | null;
}

export const getToken = (): Tokens => {
  const extract = (id: string) => new URLSearchParams(window.location.hash).get(id);
  let accessToken = extract("#access_token");
  let idToken = extract("id_token");

  if (!accessToken) accessToken = extract("access_token");
  if (!idToken) idToken = extract("#id_token");

  return { accessToken, idToken };
};

export const isValidToken = ({ accessToken, idToken }: Tokens): Boolean => {
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
