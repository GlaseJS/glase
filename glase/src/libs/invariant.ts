class ValueError extends Error {};

export function invariant<T>(value: T, error?: string): NonNullable<T>
{
  if (value == undefined || value == null) throw new ValueError(error || `Value cannot be undefined or null.`);
  return value;
}