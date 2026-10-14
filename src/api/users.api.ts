import { apiGet } from "./axios";
import type { User } from "../types/user.types";

export function getUsers(): Promise<User[]> {
  return apiGet<User[]>("/users");
}
