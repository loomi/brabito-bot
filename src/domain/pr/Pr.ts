import { PrInput } from './PrInput';
import { PrError } from './PrError';
import { PrData } from './PrData';
import { User } from '../user';

class Pr {
  private readonly id: string;
  private status: PrData['status'];
  private githubId: string;
  private urgenceLevel: PrData['urgenceLevel'];
  private discordId?: string;
  private user?: User;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(createPrParams: PrInput) {
    const {
      id,
      title,
      status,
      githubId,
      discordId,
      urgenceLevel,
      user,
      createdAt,
      updatedAt,
    } = createPrParams;

    if (id === null || id === undefined) {
      throw new PrError('ID is not passed');
    }

    if (status === null || status === undefined) {
      throw new PrError('Name is not passed');
    }

    this.id = id;
    this.status = this.convertStatus(status, title, user);
    this.githubId = githubId;
    this.discordId = discordId;
    this.urgenceLevel = urgenceLevel;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  private convertStatus(
    githubStatus: PrInput['status'],
    githubTitle: PrInput['title'],
    user?: User
  ): PrData['status'] {
    if (githubTitle.toLocaleLowerCase().match('wip')) return 'wip';
    else if (githubStatus === 'open') return 'not_allocated';
    else if (githubStatus === 'closed') return 'closed';
    else if (githubStatus === 'review requested') return 'changes_requested';
    else if (githubStatus === 'approved') return 'approved';
    else if (githubStatus === 'merged') return 'merged';
    else if (!user) {
      if (githubStatus === 'reopened') return 'not_allocated';
      else if (githubStatus === 'review request removed' && !user)
        return 'not_allocated';
      else if (githubStatus === 'ready for review') return 'not_allocated';
    } else {
      if (githubStatus === 'reopened') return 'allocated';
      else if (githubStatus === 'review request removed' && !user)
        return 'allocated';
      else if (githubStatus === 'ready for review') return 'allocated';
    }
    return 'wip';
  }

  toJSON(): PrData {
    return {
      id: this.id,
      status: this.status,
      createdAt: this.createdAt,
      urgenceLevel: this.urgenceLevel,
      discordId: this.discordId,
      githubId: this.githubId,
      user: this.user,
      updatedAt: this.updatedAt,
    };
  }

  updatePrTime() {
    this.updatedAt = new Date();
  }

  updateStatus(status: PrInput['status'], title: PrInput['title']) {
    this.status = this.convertStatus(status, title, this.user);
    this.updatePrTime();
  }

  getId(): string {
    return this.id;
  }
}

export { Pr };
