export default function resolve(basePath: string, path: string): string {
  let base = String(basePath);

  if (path[0] === '/') return path;

  if (path.slice(0, 2) === './') {
    path = path.slice(2);
    base = base.slice(0, base.lastIndexOf('/'));
  }

  while (path.slice(0, 2) === '..') {
    path = path.slice(3);
    base = base.slice(0, base.lastIndexOf('/'));
  }

  if (path) return `${base}/${path}`;
  return base || '/';
}
