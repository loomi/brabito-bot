abstract class Message {
  private readonly content: string;

  constructor(content: string) {
    this.content = content;
  }

  toJSON() {
    return {
      content: this.content,
    };
  }
}

export { Message };
