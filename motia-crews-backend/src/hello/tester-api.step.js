import { z } from 'zod';

export const config = {
  name: 'TesterAPI',
  type: 'api',
  path: '/api/test',
  method: 'POST',
  description: 'Receives hello request and emits event for processing',
  emits: [],
  flows: ['generate-crew-flow'],
  responseSchema: {
    200: z.object({
      message: z.string(),
      status: z.string(),
      customMessage: z.string()
    })
  }
};

export const handler = async (input, { emit, logger }) => {
  const timestamp = new Date().toISOString();
  console.log('Tester API endpoint called', { timestamp, input });
  logger.info('Tester API endpoint called', { timestamp, input });

  return {
    status: 200,
    body: {
      message: 'Hello request received! Check logs for processing.',
      status: 'processing',
      customMessage: input.body.customMessage || 'No custom message provided'
    }
  };
};
