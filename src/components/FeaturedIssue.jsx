
import { Link } from 'react-router-dom';

export default function FeaturedIssue({ issue }) {
  if (!issue) return null;

  return (
    <section className="container" style={{ padding: '4rem 2rem' }}>
      <p className="label-caps" style={{ marginBottom: '2rem' }}>Latest Issue</p>
      <div style={{ maxWidth: '800px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {new Date(issue.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} — {issue.reading_time} MIN READ
        </span>
        <h2 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>{issue.title}</h2>
        <p style={{ color: 'var(--text-dimmed)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '650px' }}>
          {issue.excerpt}
        </p>
        <Link to={`/issue/${issue.slug}`} style={{ textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em', fontWeight: 600, borderBottom: '1px solid currentColor', paddingBottom: '2px' }}>
          Read Issue &rarr;
        </Link>
      </div>
    </section>
  );
}