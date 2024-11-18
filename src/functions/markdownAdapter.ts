import { marked, Tokens } from "marked";
import DOMPurify from "dompurify";

const purify = DOMPurify(window);

async function sanitize(html: string | Promise<string>) {
  return new Promise<string>(async res => {
    if (html instanceof Promise) {
      html = await html;
    }

    res(purify.sanitize(html));
  });
}

function headingRenderer({ tokens, depth }: Tokens.Heading) {
  const text = tokens.map(token => token.raw).join("");
  const id = text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "");

  return `<h${depth} id="${id}">${text}</h${depth}>`;
}

export default function markdownAdapter() {
  const renderer = new marked.Renderer();

  renderer.heading = headingRenderer;

  marked.setOptions({ renderer });

  return {
    parse: (text: string) => sanitize(marked(text))
  };
}
