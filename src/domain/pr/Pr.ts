import { PrInput } from './PrInput';
import { PrError } from './PrError';
import { PrData } from './PrData';

class Pr {
  private readonly id: string;
  private status: PrData['status'];
  private githubId: string;
  private urgenceLevel: PrData['urgenceLevel'];
  private discordId: string;
  private userId: PrData['userId'];
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(prms: { createPrParams?: PrInput; createPrFromParams?: PrData }) {
    if (
      (prms.createPrParams?.id === null ||
        prms.createPrParams?.id === undefined) &&
      !prms.createPrFromParams?.id
    ) {
      throw new PrError('ID is not passed');
    }

    if (
      (prms.createPrParams?.status === null ||
        prms.createPrParams?.status === undefined) &&
      !prms.createPrFromParams?.status
    ) {
      throw new PrError('Name is not passed');
    }

    this.id = prms.createPrFromParams?.id || prms.createPrParams?.id || '';
    this.status =
      prms.createPrFromParams?.status ||
      this.convertStatus(
        prms.createPrParams?.status || 'open',
        prms.createPrParams?.title || '',
        prms.createPrParams?.userId || prms.createPrFromParams?.userId || null
      );
    this.githubId =
      prms.createPrFromParams?.githubId || prms.createPrParams?.githubId || '';
    this.discordId =
      prms.createPrFromParams?.discordId ||
      prms.createPrParams?.discordId ||
      '';
    this.urgenceLevel =
      prms.createPrFromParams?.urgenceLevel ||
      prms.createPrParams?.urgenceLevel ||
      'important';
    this.createdAt =
      prms.createPrFromParams?.createdAt ||
      prms.createPrParams?.createdAt ||
      new Date();
    this.userId =
      prms.createPrFromParams?.userId || prms.createPrParams?.userId || null;
    this.updatedAt =
      prms.createPrFromParams?.updatedAt ||
      prms.createPrParams?.updatedAt ||
      new Date();
  }

  private convertStatus(
    githubStatus: PrInput['status'],
    githubTitle: PrInput['title'],
    userId: PrInput['userId']
  ): PrData['status'] {
    if (githubTitle.toLocaleLowerCase().match('wip')) return 'wip';
    else if (githubStatus === 'open') return 'not_allocated';
    else if (githubStatus === 'closed') return 'closed';
    else if (githubStatus === 'review requested') return 'changes_requested';
    else if (githubStatus === 'approved') return 'approved';
    else if (githubStatus === 'merged') return 'merged';
    else if (!userId) {
      if (githubStatus === 'reopened') return 'not_allocated';
      else if (githubStatus === 'review request removed' && !userId)
        return 'not_allocated';
      else if (githubStatus === 'ready for review') return 'not_allocated';
    } else {
      if (githubStatus === 'reopened') return 'allocated';
      else if (githubStatus === 'review request removed' && !userId)
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
      userId: this.userId,
      updatedAt: this.updatedAt,
    };
  }

  updatePrTime() {
    this.updatedAt = new Date();
  }

  updateStatus(status: PrData['status']) {
    this.status = status;
    this.updatePrTime();
  }

  updateUrgenceLevel(urgenceLevel: PrData['urgenceLevel']) {
    if (urgenceLevel !== 'important' && urgenceLevel !== 'urgent') return;
    this.urgenceLevel = urgenceLevel;
    this.updatePrTime();
  }

  updateGithubId(githubId: PrData['githubId']) {
    this.githubId = githubId;
    this.updatePrTime();
  }

  updateDiscordId(discordId: PrData['discordId']) {
    this.discordId = discordId;
    this.updatePrTime();
  }

  updateParams(paramsToUpdate: Partial<PrData>): Pr {
    const entriesOfParamsToUpdate = Object.entries(paramsToUpdate);

    const filteredEntriesToUpdateClient = entriesOfParamsToUpdate.filter(
      ([key, value]) => value !== undefined && value !== null
    );

    filteredEntriesToUpdateClient.forEach(([property, value]) => {
      if (property === 'status') this.updateStatus(value as PrData['status']);
      if (property === 'urgenceLevel')
        this.updateUrgenceLevel(value as PrData['urgenceLevel']);
      if (property === 'githubId')
        this.updateGithubId(value as PrData['githubId']);
      if (property === 'discordId')
        this.updateDiscordId(value as PrData['discordId']);
    });

    return this;
  }

  getId(): string {
    return this.id;
  }
}

export { Pr };
