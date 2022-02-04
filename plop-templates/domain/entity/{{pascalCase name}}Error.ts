class {{pascalCase name}}Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = '{{pascalCase name}}Error';
  }
}

export { {{pascalCase name}}Error };
