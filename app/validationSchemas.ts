import { z } from 'zod';

export const createIssueValidation = z.object({
    title: z.string().min(1, 'The title is required').max(255, 'Title cannot be above 225 characters'),
    description: z.string().min(1, 'The description is required')
});
