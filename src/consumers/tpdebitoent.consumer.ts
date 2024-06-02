import { EachMessagePayload } from "kafkajs";
import { BaseConsumer, Logger } from "@ant/framework";

export class TpDebitoEntConsumer extends BaseConsumer {
  topic = "tpdebitoent";

  handler(data: unknown, payload: EachMessagePayload): Promise<void> {
    return new Promise((resolve) => {
      Logger.info({
        topic: this.topic,
        data: JSON.stringify(data),
        payload: JSON.stringify(payload),
      });

      resolve();
    });
  }
}
