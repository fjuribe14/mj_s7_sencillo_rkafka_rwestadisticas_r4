import moment from "moment";
import { OperacionMon } from "../database/models/OperacionMon";
import { io } from "../providers/socketIo.provider";
import { BaseTask } from "@ant/framework/lib/src/scheduler";

export class MonTask extends BaseTask {
  name = "mon_task";
  cronExpression = "*/3 * * * * *";

  async handler(): Promise<void> {
    await OperacionMon.findOne({
      where: { ts_fecha: moment().format("YYYY-MM-DD") },
    }).then((data) => {
      if (data) {
        if (Number.isNaN(data.ca_liquidada)) data.ca_liquidada = 0;
        if (Number.isNaN(data.ca_rechazada)) data.ca_rechazada = 0;
        if (Number.isNaN(data.mo_liquidada)) data.mo_liquidada = 0;
        if (Number.isNaN(data.mo_rechazada)) data.mo_rechazada = 0;

        io.emit("OperacionMon", data);
      }
    });
  }
}
