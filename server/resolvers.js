import { Job, Company, User } from './db.js';

export const resolvers = {
  Query: {
    job: async (_root, args) => {
      const job = await Job.findById(args.id);
      return job;
    },
    jobs: async () => {
      const jobs = await Job.findAll();
      return [...jobs];
    },
    company: async (_root, args) => {
      const company = await Company.findById(args.id);
      return company;
    },
  },
  Mutation: {
    createJob: async (_root, args, context) => {
      if (!context.user) {
        return new Error('Unauthorized');
      }
      const job = await Job.create({
        ...args.input,
        companyId: context.user.companyId,
      });
      return job;
    },
    deleteJob: async (_root, args, context) => {
      if (!context.user) {
        return new Error('Unauthorized');
      }
      const job = await Job.findById(args.id);
      console.log(context.user.companyId, job.companyId);
      if (context.user.companyId !== job.companyId) {
        return new Error('You cannot delete this job');
      }
      const deletedJob = await Job.delete(args.id);
      return deletedJob;
    },
    updateJob: async (_root, args, context) => {
      const { input } = args;
      if (!context.user) {
        return new Error('Unauthorized');
      }
      const job = await Job.findById(input.id);
      if (context.user.companyId !== job.companyId) {
        return new Error('You cannot delete this job');
      }
      const updatedJob = await Job.update({
        ...input,
        companyId: context.user.companyId,
      });
      return updatedJob;
    },
  },
  Job: {
    company: async (root) => {
      const company = await Company.findById(root.companyId);
      return { ...company };
    },
  },
  Company: {
    jobs: async (root) => {
      const jobs = await Job.findAll((job) => job.companyId === root.id);
      return jobs;
    },
  },
};
