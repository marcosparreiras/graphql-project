import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getJobById } from "../graphql/queries";

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJobById(jobId)
      .then(data => setJob(data))
      .catch(error => setError(true));
  }, [getJobById, setJob, jobId]);

  if (error) return <p>Something went wrong 😯</p>
  if (!job) return <p>Loading...</p>;
  return (
      <div>
            <h1 className="title">
              {job.title}
            </h1>
            <h2 className="subtitle">
              <Link to={`/companies/${job.company.id}`}>
                {job.company.name}
              </Link>
            </h2>
            <div className="box">
              {job.description}
            </div>
    </div>
  );
};

export default JobDetail;
