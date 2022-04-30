export function randomid() {
  return (Date.now().toString(36) + Math.random().toString(36)).replace('.', '');
}
