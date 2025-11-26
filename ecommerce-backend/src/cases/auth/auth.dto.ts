export interface CredentialDTO{
  email: string;
  password: string;
}

export interface UserDTO{
    id: string;
    name: string;
    email: string;
    supabaseId: string;
  }

export interface AuthDTO{
  accessToken: string;
  user: UserDTO;
}