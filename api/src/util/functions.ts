// Retorna a data no formato YYYY-MM-DD ou YYYY-MM-DD HH:mm:ss
export function dateToString(date: Date, withTime = false): string {
  const dateISO = date.toISOString();
  return withTime
    ? dateISO.replace('T', ' ').split('.')[0]
    : dateISO.split('T')[0];
}

// Converte uma string no formato YYYY-MM-DD ou YYYY-MM-DD HH:mm:ss para Date
export function stringToDate(date: string): Date {
  let parts = date.split(' ');
  let dateParts = parts[0].split('-');
  let timeParts = parts[1] ? parts[1].split(':') : ['0', '0', '0'];

  return new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[2]),
    parseInt(timeParts[0]),
    parseInt(timeParts[1]),
    parseInt(timeParts[2]),
  );
}
