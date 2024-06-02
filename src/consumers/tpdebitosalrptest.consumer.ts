import { EachMessagePayload } from "kafkajs";
import { BaseConsumer, Logger } from "@ant/framework";

export class TpDebitoSalRptestConsumer extends BaseConsumer {
  topic = "tpdebitosalrptest";

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
