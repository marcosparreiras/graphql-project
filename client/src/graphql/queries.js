import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                title
                id
                company {
                    name
                }
            }
        }
    `;
    const { jobs } = await request(GRAPHQL_URL, query);
    return jobs;
};

export async function getJobById(id) {
    const query = gql`
        query JobQuery($id: ID!) {
            job(id: $id) {
                title
                description
                id
                company {
                    name
                    id
                }
            }
        }
    `;
    const variables = { id };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
};

export async function getCompanyById(id) {
    const query = gql`
        query CompanyId($id: ID!) {
            company(id: $id) {
                name
                id
                description
                jobs {
                    title
                    id
                    description
                }
            }
        }
    `;
    const variables = { id };
    const { company } = await request(GRAPHQL_URL, query, variables);
    return company;
};

export async function createJob(input) {
    const query = gql`
        mutation JobData($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;
    const variables = { input };
    const token = localStorage.getItem("accessToken");
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const { job } = await request(GRAPHQL_URL, query, variables, headers);
    return job;
};
