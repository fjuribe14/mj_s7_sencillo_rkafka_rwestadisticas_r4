import { EachMessagePayload } from "kafkajs";
import { BaseConsumer, Logger } from "@ant/framework";
import { Data, Payload } from "../types/kafkaResponse";
import { OperacionBi } from "../database/models/OperacionBi";
import { OperacionMon } from "../database/models/OperacionMon";

export class TpCreditoEntConsumer extends BaseConsumer {
  topic = "tpcreditoent";

  // async handler(_data: any): Promise<any> {
  async handler(data: Data, payload: EachMessagePayload): Promise<any> {
    // const { data, payload }: { data: Data; payload: EachMessagePayload } = _data.body;
    try {
      const operation = await new OperacionBi({
        data,
        payload: payload as Payload,
        topic: this.topic,
      }).save();

      const operationMon = new OperacionMon({
        data,
        payload: payload as Payload,
        topic: this.topic,
      });

      const operationMonToUpdate = await OperacionMon.findOne({
        where: {
          tx_componente: operationMon.tx_componente,
          ts_fecha: operationMon.ts_fecha,
          co_lclinstrm: operationMon.co_lclinstrm,
          co_purp: operationMon.co_purp,
        },
      });

      if (operationMonToUpdate) {
        operationMonToUpdate.ca_recibida = Number(operationMonToUpdate.ca_recibida) + 1;
        operationMonToUpdate.mo_recibida =
          Number(operationMonToUpdate.mo_recibida) + Number(operation.co_amt);

        operationMonToUpdate.ca_liquidada = Number(operationMonToUpdate.ca_liquidada);
        operationMonToUpdate.mo_liquidada = Number(operationMonToUpdate.mo_liquidada);
        operationMonToUpdate.ca_rechazada = Number(operationMonToUpdate.ca_rechazada);
        operationMonToUpdate.mo_rechazada = Number(operationMonToUpdate.mo_rechazada);

        await operationMonToUpdate.save();
      } else {
        operationMon.ca_recibida = 1;
        operationMon.mo_recibida = operation.co_amt;
        operationMon.ca_liquidada = 0;
        operationMon.mo_liquidada = 0;
        operationMon.ca_rechazada = 0;
        operationMon.mo_rechazada = 0;
        await operationMon.save();
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}
