export interface ISendOtpRequestPayload {
  phone: string;
}

export interface IVerifyOtpRequestPayload {
  phone: string;
  otp: string;
}

export interface IVerifyOtpResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
  };
  message: string;
  error: string;
}
