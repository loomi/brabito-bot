import { UserInput } from './UserInput';
import { UserError } from './UserError';
import { UserData } from './UserData';

class User {
  private readonly id: string;
  private name: string;
  private discordId: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(createUserParams: UserInput) {
    const { id, name, discordId, createdAt, updatedAt } = createUserParams;

    if (id === null || id === undefined) {
      throw new UserError('ID is not passed');
    }

    if (name === null || name === undefined) {
      throw new UserError('Name is not passed');
    }

    this.id = id;
    this.name = name;
    this.discordId = discordId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  toJSON(): UserData {
    return {
      id: this.id,
      name: this.name,
      discordId: this.discordId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateUserTime() {
    this.updatedAt = new Date();
  }

  updateName(name: string) {
    this.name = name;
    this.updateUserTime();
  }

  getId(): string {
    return this.id;
  }
}

export { User };
