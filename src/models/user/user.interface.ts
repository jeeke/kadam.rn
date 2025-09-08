export interface IUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  avatar_url: string;
  preferred_language: "en" | "hi";
  plan_type: "free" | "premium" | "pro";
  created_at: string;
  updated_at: string;
  is_active: boolean;
  last_active_at: string;
  paid_at: string;
  dob: string;
  bio: string;
  gender: "male" | "female" | "others";
  onboarding_completed: boolean;
  whatsapp_allowed: boolean;
}

export interface IFetchUserResponse {
  success: boolean;
  data: IUser;
  message: string;
  error: string;
}

export interface IPatchUserRequestPayload {
  email?: string;
  name?: string;
  avatar_url?: string;
  preferred_language?: "en" | "hi";
  plan_type?: "free" | "premium" | "pro";
  dob?: string;
  bio?: string;
  gender?: "male" | "female" | "others";
  whatsapp_allowed?: boolean;
  onboarding_completed?: boolean;
}

export interface IPatchUserResponse {
  success: boolean;
  data: IUser;
  message: string;
  error: string;
}
