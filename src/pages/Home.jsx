import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import FeaturedIssue from '../components/FeaturedIssue';
import IssueList from '../components/IssueList';
import SubscribeForm from '../components/SubscribeForm';
import { api } from '../services/api';

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getIssues()
      .then(data => setIssues(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="label-caps">
        Loading Signal...
      </div>
    );
  }

  const latestIssue = issues[0];
  const recentIssues = issues.slice(1, 4);

  return (
    <>
      <Hero latestSlug={latestIssue?.slug} />
      <hr className="container" />
      <FeaturedIssue issue={latestIssue} />
      {recentIssues.length > 0 && (
        <>
          <hr className="container" />
          <IssueList issues={recentIssues} />
        </>
      )}
      <hr className="container" />
      <SubscribeForm />
    </>
  );
}