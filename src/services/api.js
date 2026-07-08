// src/services/api.js
// Complete frontend client layer

const API_BASE = '/api';

export const api = {
  // 1. Fetches all issues/posts for the main feed list in Home.jsx
  async getIssues() {
    const response = await fetch(`${API_BASE}/issues`);
    if (!response.ok) {
      throw new Error('Failed to transmit issues archive.');
    }
    return response.json();
  },

  // 2. Fetches a specific standalone article for Issue.jsx
  async getIssueBySlug(slug) {
    const response = await fetch(`${API_BASE}/issues/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to transmit individual issue data.');
    }
    return response.json();
  },

  // 3. Handles email newsletter subscription pipelines
  async subscribe(email) {
    const response = await fetch(`${API_BASE}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Subscription transmission failed.');
    }
    return response.json();
  }
};

export default api;