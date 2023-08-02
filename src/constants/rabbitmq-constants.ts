/**
 * RabbitMQ configuration object.
 * @author Leoff00
 */
export const RABBITMQ_OPTIONS = {
  queueName: "benefits",
  heartbeat: "heartbeat=60",
  url: process.env.RABBITMQ_CLIENT_URL || "amqp://localhost:5672",
};
