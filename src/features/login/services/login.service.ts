import { trpc } from "@/src/trpc/trpcClient"
import { ISendOtpRequestPayload, IVerifyOtpRequestPayload } from "../models/login.interface"

// export const sendOtp = (payload: ISendOtpRequestPayload) => {
//     return ApiClient.post('/users/send-otp', payload)
// }

export function sendOtp(payload: ISendOtpRequestPayload) {
    return trpc.user.sendOtp.mutate(payload)
}

export const verifyOtp = (payload: IVerifyOtpRequestPayload) => {
    // return ApiClient.post<IVerifyOtpResponse>('/users/verify-otp', payload)
    return trpc.user.verifyOtp.mutate(payload)
}