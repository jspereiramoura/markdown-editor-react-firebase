export default function debounce(delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (fn: Function) {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}
