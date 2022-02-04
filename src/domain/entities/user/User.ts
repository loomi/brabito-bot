import { UserInput } from './UserInput';
import { UserError } from './UserError';
import { UserData } from './UserData';

class User {
  private readonly id: string;
  private isAdmin: boolean;
  private enabled: boolean;
  private name: string;
  private email: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(createUserParams: UserInput) {
    const { id, isAdmin, name, email, enabled, createdAt, updatedAt } =
      createUserParams;

    if (id === null || id === undefined) {
      throw new UserError('ID is not passed');
    }

    if (isAdmin === null || isAdmin === undefined) {
      throw new UserError('isAdmin is not passed');
    }

    if (name === null || name === undefined) {
      throw new UserError('Email is not passed');
    }

    this.id = id;
    this.isAdmin = isAdmin;
    this.name = name;
    this.email = email;
    this.enabled = enabled || true;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  toJSON(): UserData {
    return {
      id: this.id,
      isAdmin: this.isAdmin,
      enabled: this.enabled,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateUserTime() {
    this.updatedAt = new Date();
  }

  updateIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
    this.updateUserTime();
  }

  updateEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.updateUserTime();
  }

  updateEmail(email: string) {
    this.email = email;
    this.updateUserTime();
  }

  updateName(name: string) {
    this.name = name;
    this.updateUserTime();
  }

  getId(): string {
    return this.id;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  getEmail(): string {
    return this.email;
  }

  canUpdateThisUser(userToUpdate: User): boolean {
    if (this.isAdmin) {
      return true;
    }

    const userToUpdateId = userToUpdate.getId();

    if (this.id === userToUpdateId) {
      return true;
    }

    return false;
  }
}

export { User };
