import amqplib, { ConsumeMessage } from "amqplib";
import { list, options } from "../constants";
import { logTypes } from "../logger";

export async function produceMessages(): Promise<void> {
  try {
    const connection = await amqplib.connect(options.url, options.heartbeat);
    const channel = await connection.createChannel();

    await channel.assertQueue(options.queueName);

    for (const cpf of list) {
      channel.sendToQueue(options.queueName, Buffer.from(cpf));
    }

    logTypes.infoLogger.info("Producing messages to RABBITMQ SERVER");
    await channel.close();
    await connection.close();
  } catch (error: unknown) {
    logTypes.errorLog.error(error);
  }
}

export async function consumeQueue() {
  try {
    let messageRes: string;
    const connection = await amqplib.connect(options.url, options.heartbeat);
    const channel = await connection.createChannel();

    await channel.consume(options.queueName, (message: ConsumeMessage) => {
      messageRes = message.content.toString();
      channel.ack(message);
    });

    await channel.close();
    await connection.close();
    return messageRes;
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
  }
}
