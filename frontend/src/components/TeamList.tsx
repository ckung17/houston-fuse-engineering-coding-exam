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
import '../index.css';

export function TeamList() {
  const [TeamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<Department | 'All'>('All');
  
  useEffect(() => {
    async function getTeamMembers() {
      try {
        const response: TeamResponse = await fetchTeamMembers();
        if (response.success && response.data) {
          setTeamMembers(response.data);
        } else {
          setError(response.error ?? 'Failed to load team members.');
        }
      } catch (err) {
          setError('Error fetching team members.');
      }
      setLoading(false);
    }
    getTeamMembers();
  }, []);

  if (loading) return <p>Loading team members…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const filteredMembers = TeamMembers.filter((member) => {
      const matchesName = member.name.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter === 'All' || member.department === deptFilter;
      return matchesName && matchesDept;
    });

  return (
    <div>
      <div>
        <input className='search-bar'
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className='dept-filter'
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value as Department | 'All')}
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.department}</td>
              <td>{member.email}</td>
            </tr>
          ))}

          {filteredMembers.length === 0 && (
            <tr>
              <td colSpan={4} className='no-results'>
                No team members matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
