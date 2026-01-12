/**
 * TypeScript types for the Team Directory API
 * 
 * These types match the API response structure.
 * Use them to ensure type safety in your components.
 */

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  startDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type TeamResponse = ApiResponse<TeamMember[]>;

// Available departments for filtering
export const DEPARTMENTS = ['Engineering', 'Design', 'Product', 'Marketing'] as const;
export type Department = typeof DEPARTMENTS[number];
