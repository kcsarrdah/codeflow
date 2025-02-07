export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}