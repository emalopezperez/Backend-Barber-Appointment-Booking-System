export interface Appointment {
  userId: string;
  barberId: string;
  slotDate: string;
  slotTime: string;
  userData: Record<string, any>;
  barberData: Record<string, any>;
  date: number;
  cancelled: boolean;
  isCompleted: boolean;
  message: string;
}
