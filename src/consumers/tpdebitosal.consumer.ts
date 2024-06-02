import { EachMessagePayload } from "kafkajs";
import { BaseConsumer, Logger } from "@ant/framework";

export class TpDebitoSalConsumer extends BaseConsumer {
  topic = "tpdebitosal";

  handler(data: unknown, payload: EachMessagePayload): Promise<void> {
    return new Promise((resolve) => {
      console.log({
        topic: this.topic,
        data: JSON.stringify(data),
        payload: JSON.stringify(payload),
      });

      resolve();
    });
  }
}
