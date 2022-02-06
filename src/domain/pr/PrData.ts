import { User } from '../user';

export type PrData = {
  id: string;
  status:
    | 'wip'
    | 'not_allocated'
    | 'allocated'
    | 'changes_requested'
    | 'approved'
    | 'closed'
    | 'merged';
  urgenceLevel: 'urgent' | 'important';
  githubId: string;
  discordId?: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
};
