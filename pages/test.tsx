import { useState, useEffect } from 'react';

const fetchMilestones = (projectKey: string): Promise<Response> =>
  fetchBacklog(`/api/v2/projects/${projectKey}/versions`);

const fetchBacklog = (endpoint: string): Promise<Response> =>
  fetch(
    `${process.env.BACKLOG_URL}${endpoint}?apiKey=${process.env.BACKLOG_API_KEY}`
  );

const Test = (): JSX.Element => {
  const [milestones, setMilestones] = useState(null);

  const milestoneItems = (items: Array<any>) => {
    if (!items) return <></>;
    return items.map((item) => <li>{item.name}</li>)
  }

  useEffect(() => {
    if (milestones) return;
    (async () => {
      const res = await fetchMilestones(process.env.BACKLOG_PROJECT_KEY);
      const json = await res.json();

      console.dir(json);
      setMilestones(json);
    })();
  }, [milestones]);

  return (
    <div>{milestoneItems(milestones)}</div>
  );
};

export default Test;
