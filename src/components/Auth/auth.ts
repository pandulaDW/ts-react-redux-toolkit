import jwt_decode from "jwt-decode";

interface Tokens {
  accessToken: string | null;
  idToken: string | null;
}

export const getToken = (): Tokens => {
  let accessToken: string | null;
  let idToken: string | null;

  try {
    accessToken = new URLSearchParams(window.location.hash).get("access_token");
    idToken = new URLSearchParams(window.location.hash).get("#id_token");
  } catch {
    accessToken = new URLSearchParams(window.location.hash).get("#access_token");
    idToken = new URLSearchParams(window.location.hash).get("id_token");
  }

  console.log(accessToken, idToken);
  return { accessToken, idToken };
};

export const isValidToken = ({ accessToken, idToken }: Tokens): Boolean => {
  let decodedAccessToken: any | null;
  let decodedIdToken: any | null;

  try {
    if (!accessToken || !idToken) {
      console.log("tokens not present");
      return false;
    }
    decodedAccessToken = jwt_decode(accessToken);
    decodedIdToken = jwt_decode(idToken);
  } catch {
    console.log("malformed jwt token");
    return false;
  }

  console.log(decodedAccessToken);
  console.log(decodedIdToken);

  return true;
};
