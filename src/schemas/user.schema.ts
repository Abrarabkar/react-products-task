import type { User } from "../types/user.types";

export function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.email === "string"
  );
}
