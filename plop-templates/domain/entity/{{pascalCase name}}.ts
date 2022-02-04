import { {{pascalCase name}}Input } from './{{pascalCase name}}Input';
import { {{pascalCase name}}Error } from './{{pascalCase name}}Error';
import { {{pascalCase name}}Data } from './{{pascalCase name}}Data';

class {{pascalCase name}} {
  private readonly id: string;
  private name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(create{{pascalCase name}}Params: {{pascalCase name}}Input) {
    const { id, name, createdAt, updatedAt } =
      create{{pascalCase name}}Params;

    if (id === null || id === undefined) {
      throw new {{pascalCase name}}Error('ID is not passed');
    }

    if (name === null || name === undefined) {
      throw new {{pascalCase name}}Error('Name is not passed');
    }

    this.id = id;
    this.name = name;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  toJSON(): {{pascalCase name}}Data {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  update{{pascalCase name}}Time() {
    this.updatedAt = new Date();
  }

  updateName(name: string) {
    this.name = name;
    this.update{{pascalCase name}}Time();
  }

  getId(): string {
    return this.id;
  }
}

export { {{pascalCase name}} };
