import moment from "moment";
import { Data } from "../../types/kafkaResponse";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
  name: "tb_operacion_bi",
})
export class OperacionBi extends BaseEntity {
  @Column()
  tx_componente!: string;

  @PrimaryColumn()
  tx_direccion!: string;

  @Column()
  id_msgid_entrada!: string;

  @Column()
  fe_credttm!: string;

  @Column()
  fe_fctvintrbksttlmdt!: string;

  @Column()
  co_lclinstrm!: string;

  @Column()
  co_channel!: string;

  @PrimaryColumn()
  id_endtoendid!: string;

  @Column()
  co_ccy!: string;

  @Column()
  co_amt!: number;

  @Column()
  co_purp!: string;

  @Column()
  co_dbtragt!: string;

  @Column()
  id_dbtracct!: string;

  @Column()
  co_schema_dbtracct!: string;

  @Column()
  nb_dbtr_nm!: string;

  @Column()
  id_dbtr!: string;

  @Column()
  co_schema_dbtr!: string;

  @Column()
  co_cdtragt!: string;

  @Column()
  id_cdtracct!: string;

  @Column()
  co_schema_cdtracct!: string;

  @Column()
  nb_cdtr_nm!: string;

  @Column()
  id_cdtr!: string;

  @Column()
  co_schema_cdtr!: string;

  @Column()
  tx_sts!: string;

  @Column()
  co_rsn!: string;

  @Column()
  tx_ip!: string;

  @Column()
  ts_fecha_timestamp_ins!: string;

  @Column()
  ts_fecha_timestamp_upd!: string;

  constructor(private res?: any) {
    super();

    if (this.res?.data) {
      const { CstmrCdtTrfInitn, CstmrPmtStsRpt } = this.res?.data as Data;

      /** Crédito */
      if (CstmrCdtTrfInitn) {
        /** Estatus */
        this.tx_sts = "AC00";

        /** GrpHdr */
        this.fe_credttm = CstmrCdtTrfInitn?.GrpHdr?.CreDtTm?.trim() || "";
        this.co_channel = CstmrCdtTrfInitn?.GrpHdr?.Channel?.trim() || "";
        this.id_msgid_entrada = CstmrCdtTrfInitn?.GrpHdr?.MsgId?.trim() || "";
        this.co_lclinstrm = CstmrCdtTrfInitn?.GrpHdr?.LclInstrm?.trim() || "";
        this.fe_fctvintrbksttlmdt = CstmrCdtTrfInitn?.GrpHdr?.IntrBkSttlmDt?.trim() || "";

        /** PmtInf */
        this.co_amt = CstmrCdtTrfInitn?.PmtInf?.[0]?.Amount?.Amt || 0;
        this.co_purp = CstmrCdtTrfInitn?.PmtInf?.[0]?.Purp?.trim() || "";
        this.co_ccy = CstmrCdtTrfInitn?.PmtInf?.[0]?.Amount?.Ccy?.trim() || "";
        this.id_endtoendid = CstmrCdtTrfInitn?.PmtInf?.[0]?.EndToEndId?.trim() || "";

        /** Acreedor */
        this.id_cdtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Cdtr?.Id?.trim() || "";
        this.co_cdtragt = CstmrCdtTrfInitn?.PmtInf?.[0]?.CdtrAgt?.trim() || "";
        this.nb_cdtr_nm = CstmrCdtTrfInitn?.PmtInf?.[0]?.Cdtr?.Nm?.trim() || "";
        this.id_cdtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.CdtrAcct?.Id?.trim() || "";
        this.co_schema_cdtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Cdtr?.SchmeNm?.trim() || "";
        this.co_schema_cdtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.CdtrAcct?.Tp?.trim() || "";

        /** Deudor */
        this.id_dbtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Dbtr?.Id?.trim() || "";
        this.co_dbtragt = CstmrCdtTrfInitn?.PmtInf?.[0]?.DbtrAgt?.trim() || "";
        this.nb_dbtr_nm = CstmrCdtTrfInitn?.PmtInf?.[0]?.Dbtr?.Nm?.trim() || "";
        this.id_dbtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.DbtrAcct?.Id?.trim() || "";
        this.co_schema_dbtr = CstmrCdtTrfInitn?.PmtInf?.[0]?.Dbtr?.SchmeNm?.trim() || "";
        this.co_schema_dbtracct = CstmrCdtTrfInitn?.PmtInf?.[0]?.DbtrAcct?.Tp?.trim() || "";
      }

      /** Estatus report */
      if (CstmrPmtStsRpt) {
        this.co_rsn = CstmrPmtStsRpt.OrgnlPmtInfAndSts?.[0].Rsn || "";
        this.tx_sts = CstmrPmtStsRpt.OrgnlPmtInfAndSts?.[0].TxSts || "";
        this.id_endtoendid = CstmrPmtStsRpt.OrgnlPmtInfAndSts?.[0].OrgnlEndToEndId || "";

        /** Fecha de actualización */
        this.ts_fecha_timestamp_upd = moment().toISOString();
      }
    }

    if (this.res?.payload) {
      const { message } = this.res.payload;

      /** Dirección */
      this.tx_direccion = "ENTRADA";

      /** Componente */
      this.tx_componente = "MFIBP";

      /** Ip */
      this.tx_ip =
        Buffer.from(message?.headers?.origen?.data || "").toString("utf8") || "localhost";
    }
  }
}
