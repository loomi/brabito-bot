import { AvailableRoles } from '@/shared/types/roles-available';

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
  githubLink: string;
  projectName: string;
  userGithubNick: string;
  discordId: string;
  userId: string | null;
  user: any;
  createdAt: Date;
  updatedAt: Date;
  lastReviewChecked: Date;
  origin: AvailableRoles;
};
