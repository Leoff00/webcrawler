import amqplib, { ConsumeMessage } from "amqplib";
import { CPF_LIST, RABBITMQ_OPTIONS } from "../constants";
import { logTypes } from "../logger";
import { getCachedData } from "./redis";

type ConsumeQueueProps = {
  hasCache: boolean;
  messageRes: string;
};

async function disconnectQueue(
  channel: amqplib.Channel,
  connection: amqplib.Connection
): Promise<void> {
  await channel.close();
  await connection.close();
}

export async function produceMessages(): Promise<void> {
  try {
    const connection = await amqplib.connect(
      RABBITMQ_OPTIONS.url,
      RABBITMQ_OPTIONS.heartbeat
    );
    const channel = await connection.createChannel();

    await channel.assertQueue(RABBITMQ_OPTIONS.queueName);

    logTypes.infoLogger.info("[RABBITMQ] - Publishing messages RabbitMQ Queue");
    for (const cpf of CPF_LIST) {
      channel.sendToQueue(RABBITMQ_OPTIONS.queueName, Buffer.from(cpf));
    }

    await disconnectQueue(channel, connection);
  } catch (error: unknown) {
    logTypes.errorLog.error(`[RABBITMQ] - ${error}`);
  }
}

export async function consumeQueue(cpf: string): Promise<ConsumeQueueProps> {
  try {
    let hasCache: boolean;
    let messageRes: string;
    const messagesArray = [];
    const connection = await amqplib.connect(
      RABBITMQ_OPTIONS.url,
      RABBITMQ_OPTIONS.heartbeat
    );
    const channel = await connection.createChannel();

    await channel.assertQueue(RABBITMQ_OPTIONS.queueName, { durable: true });
    await channel.consume(
      RABBITMQ_OPTIONS.queueName,
      async (message: ConsumeMessage) => {
        const content = message.content.toString();
        messagesArray.push(content);
        channel.ack(message);
      }
    );
    const hasCPF = messagesArray.includes(cpf);
    const cachedData = await getCachedData(cpf);
    if (hasCPF && cachedData) {
      hasCache = true;
      messageRes = cachedData;
    }

    await disconnectQueue(channel, connection);
    return { hasCache, messageRes };
  } catch (error: unknown) {
    logTypes.errorLog.error(`[RABBITMQ] - ${error}`);
  }
}
