import markdownAdapter from "../functions/markdownAdapter";

export default class MarkdownDocument {
  #text: string;
  #parsedText: string;
  #renderer: Renderer;

  constructor(text = "") {
    this.#text = text;
    this.#parsedText = "";
    this.#renderer = markdownAdapter();
  }

  async #parse(onParse?: Function) {
    const text = this.#renderer.parse(this.#text);
    this.#parsedText = text instanceof Promise ? await text : text;
    
    onParse?.(this.#parsedText);
  }

  toHtml() {
    return this.#parsedText;
  }

  setText(text: string, onParse?: Function) {
    this.#text = text;
    this.#parse(onParse);
  }

  getText() {
    return this.#text;
  }

  toJson() {
    return { markdown: this.#text, html: this.toHtml() };
  }
}
