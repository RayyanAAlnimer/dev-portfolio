import { useEffect, useState } from 'react';

// Share one request per page load, including Strict Mode's effect replay.
let visitorRequest;

function getVisitorCount() {
  if (!visitorRequest) {
    visitorRequest = fetch('https://sarrzo6vq7.execute-api.eu-north-1.amazonaws.com/visitors')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => data.count ?? '—')
      .catch(error => {
        console.error('Failed to retrieve visitor count:', error);
        return '—';
      });
  }
  return visitorRequest;
}

export default function VisitorCount() {
  const [count, setCount] = useState('...');

  useEffect(() => {
    let active = true;
    getVisitorCount().then(value => {
      if (active) setCount(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return <span id="visitor-count" aria-live="polite">{count}</span>;
}
