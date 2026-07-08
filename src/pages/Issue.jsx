// Instead of importing the whole React object, just pull what you need:
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SubscribeForm from '../components/SubscribeForm';
import { api } from '../services/api';

export default function Issue() {
  const { slug } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    let isMounted = true; // Prevents state updates if you navigate away before it loads

    const fetchIssue = async () => {
      setLoading(true);
      try {
        const data = await api.getIssueBySlug(slug);
        if (isMounted) setIssue(data);
      } catch (err) {
        if (isMounted) console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchIssue();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [slug]);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="label-caps">Reading Canvas...</div>;
  if (!issue) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="label-caps">Issue Lost into Space.</div>;

  return (
    <>
      <article className="container" style={{ padding: '12rem 2rem 4rem 2rem', maxWidth: '750px' }}>
        <header style={{ marginBottom: '4rem' }}>
          <span className="label-caps">
            {new Date(issue.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} &mdash; {issue.reading_time} MIN READ
          </span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1.5rem' }}>{issue.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-dimmed)', fontStyle: 'italic', lineHeight: '1.5' }}>{issue.excerpt}</p>
        </header>
        
        <div 
          className="issue-body" 
          dangerouslySetInnerHTML={{ __html: issue.content }} 
          style={{ lineBreak: 'strict' }}
        />
      </article>

      <div className="container" style={{ maxWidth: '750px', display: 'flex', justifyContent: 'space-between', padding: '4rem 2rem' }}>
        <Link to="/archive" className="label-caps" style={{ fontSize: '0.8rem' }}>&larr; Return to Archive</Link>
      </div>

      <hr className="container" />
      <SubscribeForm />
    </>
  );
}