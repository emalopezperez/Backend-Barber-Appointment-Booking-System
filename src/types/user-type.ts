export interface User {
  name: string;
  email: string;
  image: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
  };
  gender: string;
  dob: string;
  password: string;
}
