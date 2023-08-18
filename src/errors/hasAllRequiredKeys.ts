import { AppError } from "./appError";

export function hasAllRequiredKeys(obj: any) {
  const requiredKeys = Object.keys(obj);
  for (const key of requiredKeys) {
    if (!obj[key]) {
      throw new AppError(`${key} is required`);
    }
  }
  return true
}