/* eslint-disable indent */
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Data } from "../../types/kafkaResponse";
import moment from "moment";

@Entity({
  name: "tb_operacion_mon",
})
export class OperacionMon extends BaseEntity {
  @PrimaryColumn()
  tx_componente!: string;

  @PrimaryColumn()
  tx_direccion!: string;

  @PrimaryColumn()
  ts_fecha!: string;

  @PrimaryColumn()
  co_lclinstrm!: string;

  @PrimaryColumn()
  co_purp!: string;

  @Column()
  ca_liquidada!: number;

  @Column("numeric", { precision: 21, scale: 5 })
  mo_liquidada!: number;

  @Column()
  ca_rechazada!: number;

  @Column("numeric", { precision: 21, scale: 5 })
  mo_rechazada!: number;

  @Column()
  ca_recibida!: number;

  @Column("numeric", { precision: 21, scale: 5 })
  mo_recibida!: number;

  constructor(private res?: any) {
    super();
    if (res?.data) {
      const { CstmrCdtTrfInitn, CstmrPmtStsRpt } = this.res?.data as Data;

      if (CstmrCdtTrfInitn) {
        /** Dirección */
        this.tx_direccion = "ENTRADA";

        /** Componente */
        this.tx_componente = "MFIBP";

        this.co_lclinstrm = CstmrCdtTrfInitn?.GrpHdr?.LclInstrm?.trim() || "";
        this.co_purp = CstmrCdtTrfInitn?.PmtInf?.[0]?.Purp?.trim() || "";
        this.ts_fecha = moment().format("YYYY-MM-DD");
      }

      if (CstmrPmtStsRpt) {
        switch (CstmrPmtStsRpt.OrgnlGrpInfAndSts?.GrpSts) {
          case "RJCT":
            this.ca_liquidada = 0;
            this.mo_liquidada = 0;
            this.ca_rechazada = 1;
            this.mo_rechazada = CstmrPmtStsRpt?.OrgnlGrpInfAndSts?.OrgnlCtrlSum?.Amt || 0;
            break;

          default:
            this.ca_rechazada = 0;
            this.mo_rechazada = 0;
            this.ca_liquidada = 1;
            this.mo_liquidada = CstmrPmtStsRpt?.OrgnlGrpInfAndSts?.OrgnlCtrlSum?.Amt || 0;
            break;
        }
      }
    }
  }
}
