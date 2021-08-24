export interface ClientCheckin {
  id: string;
  clientId: string;
  pantryId: string;
  checkinDate: number;
  volunteerName: string;
  volunteerEmail: string;
}

const ClientCheckInForKeys: Required<ClientCheckin> = {
  id: "",
  clientId: "",
  pantryId: "",
  checkinDate: 0,
  volunteerEmail: "",
  volunteerName: "",
};

export const CheckInKeys = Object.keys(ClientCheckInForKeys);
