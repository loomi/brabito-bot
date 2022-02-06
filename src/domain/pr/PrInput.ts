import { User } from '../user';

export type PrInput = {
  id: string;
  title: string;
  status:
    | 'open'
    | 'closed'
    | 'reopened'
    | 'review requested'
    | 'review request removed'
    | 'ready for review'
    | 'approved'
    | 'merged';
  urgenceLevel: 'urgent' | 'important';
  githubId: string;
  discordId?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
};
