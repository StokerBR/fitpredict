import * as moment from 'moment';

// Retorna a data no formato YYYY-MM-DD ou YYYY-MM-DD HH:mm:ss
export function dateToString(date: Date, withTime = false): string {
  return moment(date).format(withTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');

  /* const pad = (num: number): string => {
    return (num < 10 ? '0' : '') + num;
  };

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    (withTime
      ? ' ' +
        pad(date.getHours()) +
        ':' +
        pad(date.getMinutes()) +
        ':' +
        pad(date.getSeconds())
      : '')
  ); */
}

// Converte uma string no formato YYYY-MM-DD ou YYYY-MM-DD HH:mm:ss para Date, usando moment
export function stringToDate(date: string, ajustTimezone = false): Date {
  let momentObj = moment(date);
  if (ajustTimezone) {
    momentObj = momentObj.add(3, 'hours');
  }
  return momentObj.toDate();

  /* let parts = date.split(' ');
  let timeParts = parts[1] ?? '00:00:00';

  let dateObj: Date = new Date(parts[0] + 'T' + timeParts + '.000Z'); */

  /* let dateParts = parts[0].split('-');
  let timeParts = parts[1] ? parts[1].split(':') : ['0', '0', '0'];

  let dateObj: Date = new Date();
  dateObj.setFullYear(parseInt(dateParts[0]));
  dateObj.setMonth(parseInt(dateParts[1]) - 1);
  dateObj.setDate(parseInt(dateParts[2]));
  dateObj.setHours(parseInt(timeParts[0]));
  dateObj.setMinutes(parseInt(timeParts[1]));
  dateObj.setSeconds(parseInt(timeParts[2])); */

  // return dateObj;
}

export function getWeekDays(): Date[] {
  const weekDays: Date[] = [];
  const startOfWeek = moment().startOf('week');

  for (let i = 0; i < 7; i++) {
    weekDays.push(moment(startOfWeek).add(i, 'days').toDate());
  }
  console.log(weekDays);
  return weekDays;
}
