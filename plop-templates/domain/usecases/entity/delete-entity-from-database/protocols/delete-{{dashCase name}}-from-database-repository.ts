export interface Delete{{pascalCase name}}FromDatabaseRepository {
  delete(
    {{camelCase name}}Params: Delete{{pascalCase name}}FromDatabaseRepository.Params
  ): Promise<Delete{{pascalCase name}}FromDatabaseRepository.Result>;
}

export namespace Delete{{pascalCase name}}FromDatabaseRepository {
  export type Params = { id: string };
  export type Result = void;
}
