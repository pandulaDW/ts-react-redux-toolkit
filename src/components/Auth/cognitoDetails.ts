import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  ISignUpResult,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-southeast-1_3RJsJ6spM",
  ClientId: "4nfe79o6lj43n9g28qf0e86kpk",
};

const UserPool = new CognitoUserPool(poolData);

export const signUp = (
  email: string,
  password: string
): Promise<ISignUpResult | undefined> => {
  return new Promise((resolve, reject) => {
    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export const signIn = (email: string, password: string): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => resolve(data),
      onFailure: (err) => reject(err),
    });
  });
};
