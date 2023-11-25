import React, { useEffect, useState } from "react";
import JobList from './JobList';
import { getJobs } from "../graphql/queries";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJobs()
      .then(data => setJobs(data))
      .catch(error => setError(true));
  }, [setJobs, getJobs]);

  if (error) return <p>Somethong went wrong 😯</p>
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
