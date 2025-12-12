import type { User } from '../user/user';
import type { MoveVehicle } from './move-vehicle';

export type MoveTransportRequest = {
  id?: number;
  rider_type?: string;
  passenger_name?: string;
  passenger_department?: string;
  passenger_email?: string;
  pickup_location?: string;
  dropoff_location?: string;
  pickup_date_time?: string;
  dropoff_date_time?: string;
  purpose?: string;
  status?: string;
  move_driver_id?: number;
  move_vehicle_id?: string;
  external_service_flag?: boolean;
  external_service_provider?: string;
  notes?: string;
  move_driver?: User;
  move_vehicle?: MoveVehicle;
  created_at?: string;
  updated_at?: string;
};
