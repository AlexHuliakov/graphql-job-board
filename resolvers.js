import { getJobs, getJob, getCompanyJobs, createJob, deleteJob, updateJob } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';


export const resolvers = {
    Query: {
        jobs: () => getJobs(),
        job: (parent, { id }) => {
            const job = getJob(id);
            if (!job) {
                throw new GraphQLError(`Job not found: ${id}`);
            }
            return job;
        },
        company: (parent, { id }) => {
            const company = getCompany(id);
            if (!company) {
                throw new GraphQLError(`Company not found: ${id}`);
            }
            return company;
        }
    },
    Job: {
        date: (job) => job.createdAt.split('T')[0],
        company: (job) => getCompany(job.companyId)
    },
    Company: {
        jobs: (company) => getCompanyJobs(company.id)
    },
    Mutation: {
        createJob: (parent, { input: { title, description } }, { user }) => {
            if (!user) {
                throw new GraphQLError('Unauthorized');
            }
            
            return createJob({ title, description, companyId: user.companyId });
        },
        deleteJob: (parent, { id }, { user }) => {
            if (!user) {
                throw new GraphQLError('Unauthorized');
            }
            
            return deleteJob(id, user.companyId);
        },
        updateJob: (parent, { input: { id, title, description } }, { user }) => {
            if (!user) {
                throw new GraphQLError('Unauthorized');
            }
            
            return updateJob({ id, title, description, companyId: user.companyId });
        }
    }
}
