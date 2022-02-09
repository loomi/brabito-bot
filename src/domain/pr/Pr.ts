import { PrInput } from './PrInput';
import { PrError } from './PrError';
import { PrData } from './PrData';

class Pr {
  private readonly id: string;
  private status: PrData['status'];
  private urgenceLevel: PrData['urgenceLevel'];
  private userGithubNick: PrData['userGithubNick'];
  private projectName: PrData['projectName'];
  private discordId: string;
  private githubId: string;
  private userId: PrData['userId'];
  private user: PrData['user'];
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
    this.projectName =
      prms.createPrFromParams?.projectName ||
      prms.createPrParams?.projectName ||
      '';
    this.urgenceLevel =
      prms.createPrFromParams?.urgenceLevel ||
      prms.createPrParams?.urgenceLevel ||
      'important';
    this.userGithubNick =
      prms.createPrFromParams?.userGithubNick ||
      prms.createPrParams?.userGithubNick ||
      '';
    this.user = prms.createPrFromParams?.user || null;
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
    console.log(
      '============================================> this is the status',
      githubStatus
    );
    console.log(
      '============================================> this is the title',
      githubTitle
    );

    if (githubTitle.toLocaleLowerCase().match('wip')) {
      console.log(
        '============================================> shouldReturn = WIP # 1'
      );
      return 'wip';
    } else if (githubStatus === 'open') {
      console.log(
        '============================================> shouldReturn = NOT_ALLOCATED # 1'
      );
      return 'not_allocated';
    } else if (githubStatus === 'closed') {
      console.log(
        '============================================> shouldReturn = CLOSED'
      );
      return 'closed';
    } else if (githubStatus === 'review requested') {
      console.log(
        '============================================> shouldReturn = CHANGES_REQUESTED'
      );
      return 'changes_requested';
    } else if (githubStatus === 'approved') {
      console.log(
        '============================================> shouldReturn = APPROVED'
      );
      return 'approved';
    } else if (githubStatus === 'merged') {
      console.log(
        '============================================> shouldReturn = MERGED'
      );
      return 'merged';
    } else {
      if (
        !userId &&
        (githubStatus === 'reopened' ||
          githubStatus === 'review request removed' ||
          githubStatus === 'ready for review')
      ) {
        console.log(
          '============================================> shouldReturn = NOT_ALLOCATED # 2'
        );
        return 'not_allocated';
      } else {
        if (
          userId &&
          (githubStatus === 'reopened' ||
            githubStatus === 'review request removed' ||
            githubStatus === 'ready for review')
        ) {
          console.log(
            '============================================> shouldReturn = ALLOCATED'
          );
          return 'allocated';
        }
      }
    }
    console.log(
      '============================================> shouldReturn = PREVIOUS STATUS'
    );
    return this.status;
  }

  toJSON(): PrData {
    return {
      id: this.id,
      status: this.status,
      createdAt: this.createdAt,
      urgenceLevel: this.urgenceLevel,
      userGithubNick: this.userGithubNick,
      projectName: this.projectName,
      discordId: this.discordId,
      githubId: this.githubId,
      user: this.user,
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

  updateParams(paramsToUpdate: Partial<PrData> & { title?: string }): Pr {
    const entriesOfParamsToUpdate = Object.entries(paramsToUpdate);

    const filteredEntriesToUpdateClient = entriesOfParamsToUpdate.filter(
      ([key, value]) => value !== undefined && value !== null
    );

    filteredEntriesToUpdateClient.forEach(([property, value]) => {
      if (property === 'status') {
        const statusUpdated = this.convertStatus(
          value as PrInput['status'],
          paramsToUpdate.title || '',
          paramsToUpdate.userId || null
        );
        this.updateStatus(statusUpdated);
      }
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
