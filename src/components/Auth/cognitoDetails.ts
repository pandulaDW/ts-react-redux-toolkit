import { CognitoUserPool, ISignUpResult } from "amazon-cognito-identity-js";

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
