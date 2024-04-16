export interface AccessToken {
    token: string;
    expirationDate: string; 
  }
  export interface LoginResponse {
    accessToken: AccessToken;
    requiredAuthenticatorType: null | string; 
  }