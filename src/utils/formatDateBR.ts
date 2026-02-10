export function formatDateBR(input: Date | string): string {
  const original = typeof input === 'string' ? input : input.toString();
  const parsed = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(parsed.getTime())) {
    return original;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(parsed);
}
