export function isString(obj: unknown): obj is string {
  return typeof obj === 'string'
}

export function isNumber(obj: unknown): obj is number {
  return typeof obj === 'number'
}

export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean'
}

export function isNull(obj: unknown): obj is null {
  return obj === null
}

export function isDate(obj: unknown): obj is Date {
  return obj instanceof Date
}

export function isBigInt(obj: unknown): obj is BigInt {
  return typeof obj === 'bigint'
}