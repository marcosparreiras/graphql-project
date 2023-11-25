import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { getCompanyById } from "../graphql/queries";
import JobList from "../components/JobList";


function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCompanyById(companyId)
      .then(data => setCompany(data))
      .catch(error => setError(true));
  }, []);

  if (error) return <p>Somethong went wrong 😯</p>
  if (!company) return <p>Loading...</p>
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className="title is-5">Job's at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
