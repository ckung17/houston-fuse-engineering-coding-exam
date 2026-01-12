/**
 * API configuration and helpers
 * 
 * The API base URL is configured here. Use these helpers
 * or write your own fetch calls - your choice!
 */

export const API_BASE_URL = 'http://localhost:3001';

/**
 * Fetches team members from the API
 * 
 * Example usage:
 *   const response = await fetchTeamMembers();
 *   if (response.success) {
 *     console.log(response.data);
 *   }
 */
export async function fetchTeamMembers() {
  const response = await fetch(`${API_BASE_URL}/team`);
  return response.json();
}
