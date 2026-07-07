const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-vercel-url.vercel.app/api';

export const api = {
  // Fetch all published issues
  async getIssues() {
    const response = await fetch(`${API_BASE_URL}/issues`);
    if (!response.ok) throw new Error('Failed to fetch issues');
    return response.json();
  },

  // Fetch a single issue by slug
  async getIssueBySlug(slug) {
    const response = await fetch(`${API_BASE_URL}/issues/${slug}`);
    if (!response.ok) throw new Error('Issue not found');
    return response.json();
  },

  // Subscribe a user to the newsletter
  async subscribe(email) {
    const response = await fetch(`${API_BASE_URL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Subscription failed');
    return response.json();
  }
};