export function getFullName(firstName: string, middleName: string, lastName: string) {
  const name = [firstName, middleName, lastName]
    .map((x) => (x ? x.trim() : ''))
    .filter((x) => x.trim())
    .join(' ');

  return name;
}
