export interface Barber {
  name: string;
  email: string;
  password: string;
  image: string;
  about: string;
  available: boolean;
  slots_booked: Record<string, any>;
  address: Record<string, any>;
  date: number;
}
