/**
 * TeamList Component
 * 
 * Your task: Build this component to display team members from the API.
 * 
 * Requirements:
 *   1. Fetch team members from GET http://localhost:3001/team
 *   2. Display each team member (name, role, department, email)
 *   3. Show a loading state while fetching
 *   4. Show an error state if the request fails
 *   5. Add a text input to filter by name
 *   6. Add a dropdown to filter by department
 * 
 * Helpful files:
 *   - src/types/team.ts - TypeScript types for the API response
 *   - src/api/team.ts - API helper function (optional to use)
 * 
 * Feel free to create additional components if you'd like!
 */
import {useState, useEffect} from 'react';
import {fetchTeamMembers} from '../api/team';
import {TeamMember, Department, DEPARTMENTS, TeamResponse} from '../types/team';

export function TeamList() {
  const [TeamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  
  useEffect(() => {
    fetchTeamMembers().then((response: TeamResponse) => {
      if (response.success && response.data) {
        console.log('Fetched team members:', response.data);
        setTeamMembers(response.data);
      } else {
        // Handle error state at API level
        console.error('Failed to load team members:', response.error);
      }
    }).catch((err) => {
      // Handle fetch error
      console.error('Error fetching team members:', err);
    });
  }, []);

  return (
    <div>
      <h1>Team List</h1>
      {/* Hint: You might want sections for:
          - Filter controls (search input, department dropdown)
          - Loading state
          - Error state  
          - Team member list/grid
      */}

    </div>
  );
}
