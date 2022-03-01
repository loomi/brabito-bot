export type PrInput = {
  id: string;
  title: string;
  status:
    | 'opened'
    | 'closed'
    | 'reopened'
    | 'changes-requested' // review requested
    | 'changes-approved' // review request removed
    | 'review-requested' // ready for review
    | 'approved';
  urgenceLevel: 'urgent' | 'important';
  githubId: string;
  githubLink: string;
  projectName: string;
  discordId: string;
  userGithubNick: string;
  userId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  lastReviewChecked?: Date;
  origin: 'back' | 'front';
};
