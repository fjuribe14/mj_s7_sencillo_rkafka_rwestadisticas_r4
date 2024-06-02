// import { IsNull } from "typeorm";
import { EachMessagePayload } from "kafkajs";
import { BaseConsumer, Logger } from "@ant/framework";
import { OperacionBi } from "../database/models/OperacionBi";
import { Data, Payload } from "../types/kafkaResponse";
import { OperacionMon } from "../database/models/OperacionMon";

export class TpCreditoEntRptestConsumer extends BaseConsumer {
  topic = "tpcreditoentrptest";

  // async handler(_data: any): Promise<any> {
  async handler(data: Data, payload: EachMessagePayload): Promise<any> {
    // const { data, payload }: { data: Data; payload: EachMessagePayload } = _data;

    console.log(JSON.stringify(data, null, 2));

    // const { data, payload }: { data: Data; payload: EachMessagePayload } = _data.body;
    const existOperation = new OperacionBi({
      data,
      payload: payload as Payload,
      topic: this.topic,
    });

    try {
      const operation = await OperacionBi.findOne({
        where: {
          // TODO: Cambiar esto para que busque por id_endtoendid y no por tx_sts
          // id_endtoendid: existOperation.id_endtoendid,
          tx_sts: "AC00",
          tx_direccion: existOperation.tx_direccion,
          // co_rsn: IsNull(),
        },
      });

      if (operation) {
        operation.tx_sts = existOperation.tx_sts;
        operation.co_rsn = existOperation.co_rsn;
        operation.ts_fecha_timestamp_upd = existOperation.ts_fecha_timestamp_upd;
        await operation.save();

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
          operationMonToUpdate.ca_rechazada =
            Number(operationMonToUpdate.ca_rechazada) + Number(operationMon.ca_rechazada);

          operationMonToUpdate.mo_rechazada =
            Number(operationMonToUpdate.mo_rechazada) + Number(operationMon.mo_rechazada);

          operationMonToUpdate.ca_liquidada =
            Number(operationMonToUpdate.ca_liquidada) + Number(operationMon.ca_liquidada);

          operationMonToUpdate.mo_liquidada =
            Number(operationMonToUpdate.mo_liquidada) + Number(operationMon.mo_liquidada);

          await operationMonToUpdate.save();
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}
