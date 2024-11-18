interface Renderer {
  parse: (text: string) => string | Promise<string>;
}