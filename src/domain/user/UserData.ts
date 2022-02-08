import { Pr } from '../pr';

export type UserData = {
  id: string;
  name: string;
  discordId: string;
  prs?: Array<Pr>;
  createdAt: Date;
  updatedAt: Date;
};
