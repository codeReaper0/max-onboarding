export interface RegisterInput {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  phone_number: string;
  location: string;
  password: string;
  confirm_password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
