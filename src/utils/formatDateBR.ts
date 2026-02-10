export function formatDateBR(input: Date | string): string {
  const parsed = input instanceof Date ? input : new Date(input);
  const original =
    typeof input === 'string' ? input : input.toString();

  if (Number.isNaN(parsed.getTime())) {
    return original;
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}