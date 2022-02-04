export type UserInput = {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
