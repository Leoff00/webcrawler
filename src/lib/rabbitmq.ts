import amqplib, { ConsumeMessage } from "amqplib";
import { list, options } from "../constants";
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
    const connection = await amqplib.connect(options.url, options.heartbeat);
    const channel = await connection.createChannel();

    await channel.assertQueue(options.queueName);

    logTypes.infoLogger.info("Publishing messages RabbitMQ Queue");
    for (const cpf of list) {
      channel.sendToQueue(options.queueName, Buffer.from(cpf));
    }

    await disconnectQueue(channel, connection);
  } catch (error: unknown) {
    logTypes.errorLog.error(error);
  }
}

export async function consumeQueue(cpf: string): Promise<ConsumeQueueProps> {
  try {
    let hasCache: boolean;
    let messageRes: string;
    const messagesArray = [];
    const connection = await amqplib.connect(options.url, options.heartbeat);
    const channel = await connection.createChannel();

    await channel.assertQueue(options.queueName, { durable: true });
    await channel.consume(
      options.queueName,
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
    logTypes.errorLog.error(error);
  }
}
