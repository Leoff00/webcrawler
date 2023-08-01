export const RABBITMQ_OPTIONS = {
  queueName: "benefits",
  heartbeat: "heartbeat=60",
  url: process.env.RABBITMQ_CLIENT_URL,
};
