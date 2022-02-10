export type PrInput = {
  id: string;
  title: string;
  status:
    | 'open'
    | 'closed'
    | 'reopened'
    | 'changes-requested' // review requested
    | 'changes-approved' // review request removed
    | 'review-requested' // ready for review
    | 'approved';
  urgenceLevel: 'urgent' | 'important';
  githubId: string;
  projectName: string;
  discordId: string;
  userGithubNick: string;
  userId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  lastReviewChecked?: Date;
};
