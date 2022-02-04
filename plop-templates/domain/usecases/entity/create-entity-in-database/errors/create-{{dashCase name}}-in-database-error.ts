class Create{{pascalCase name}}InDatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Create{{pascalCase name}}InDatabaseError';
  }
}

export { Create{{pascalCase name}}InDatabaseError };
