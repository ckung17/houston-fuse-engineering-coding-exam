/**
 * Lambda: getTeam
 * 
 * Returns team member data. This Lambda is invoked via API Gateway.
 * 
 * The `event` object contains information about the HTTP request:
 *   - event.httpMethod: The HTTP method (GET, POST, etc.)
 *   - event.queryStringParameters: Query params as an object (e.g., { limit: "5" })
 *   - event.headers: Request headers
 *   - event.body: Request body (for POST/PUT requests)
 * 
 * BONUS TASK: 
 *   Modify this function to support a `limit` query parameter.
 *   Example: GET /team?limit=5 should return only the first 5 team members.
 */

// Simulated database of team members
const teamMembers = [
  {
    id: "1",
    name: "Alice Chen",
    email: "alice.chen@company.com",
    role: "Senior Engineer",
    department: "Engineering",
    startDate: "2022-03-15"
  },
  {
    id: "2",
    name: "Bob Martinez",
    email: "bob.martinez@company.com",
    role: "Product Manager",
    department: "Product",
    startDate: "2021-08-01"
  },
  {
    id: "3",
    name: "Carol Johnson",
    email: "carol.johnson@company.com",
    role: "UX Designer",
    department: "Design",
    startDate: "2023-01-10"
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Junior Engineer",
    department: "Engineering",
    startDate: "2023-06-20"
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma.wilson@company.com",
    role: "Marketing Lead",
    department: "Marketing",
    startDate: "2020-11-05"
  },
  {
    id: "6",
    name: "Frank Lopez",
    email: "frank.lopez@company.com",
    role: "Staff Engineer",
    department: "Engineering",
    startDate: "2019-04-12"
  },
  {
    id: "7",
    name: "Grace Patel",
    email: "grace.patel@company.com",
    role: "Product Designer",
    department: "Design",
    startDate: "2022-09-01"
  },
  {
    id: "8",
    name: "Henry Zhang",
    email: "henry.zhang@company.com",
    role: "Engineering Manager",
    department: "Engineering",
    startDate: "2018-07-15"
  },
  {
    id: "9",
    name: "Iris Thompson",
    email: "iris.thompson@company.com",
    role: "Content Strategist",
    department: "Marketing",
    startDate: "2023-02-28"
  },
  {
    id: "10",
    name: "Jack Robinson",
    email: "jack.robinson@company.com",
    role: "Associate PM",
    department: "Product",
    startDate: "2023-04-15"
  }
];

exports.handler = async (event) => {
  try {
    // TODO (Bonus): Add support for `limit` query parameter
    // Hint: Access query params via event.queryStringParameters
    // Example: const limit = event.queryStringParameters?.limit;

    const data = teamMembers;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        data: data,
      }),
    };
  } catch (error) {
    console.error('Error in getTeam Lambda:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch team members',
      }),
    };
  }
};
