
import { Link } from 'react-router-dom';

export default function IssueList({ issues }) {
  return (
    <section className="container" style={{ padding: '4rem 2rem' }}>
      <p className="label-caps" style={{ marginBottom: '2rem' }}>Recent Issues</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {issues.map((issue) => (
          <div key={issue.id} style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', padding: '1.5rem 0', borderTop: '1px solid var(--border-color)', alignItems: 'baseline' }}>
            <span className="label-caps" style={{ fontSize: '0.8rem' }}>
              {new Date(issue.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                <Link to={`/issue/${issue.slug}`}>{issue.title}</Link>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{issue.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}