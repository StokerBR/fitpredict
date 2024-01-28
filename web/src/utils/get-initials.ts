// ** Returns initials from string
export function getInitials(string: string) {
  const arr = string.split(/\s/);
  if (arr.length > 1) {
    return arr[0].slice(0, 1) + arr[arr.length - 1].slice(0, 1);
  } else {
    return arr[0].slice(0, 1);
  }
}
