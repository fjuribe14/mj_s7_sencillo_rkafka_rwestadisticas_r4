import { CstmrCdtTrfInitn } from "./operacion";
import { CstmrPmtStsRpt } from "./estatusReport";

export interface KafkaResponse {
  data?: Data;
  payload?: Payload;
}

export interface Data {
  CstmrCdtTrfInitn?: CstmrCdtTrfInitn;
  CstmrPmtStsRpt?: CstmrPmtStsRpt;
}

export interface Payload {
  topic?: string;
  partition?: number;
  message?: Message;
}

export interface Message {
  magicByte?: number;
  attributes?: number;
  timestamp?: string;
  offset?: string;
  key?: null;
  value?: Value;
  headers?: Headers;
  isControlRecord?: boolean;
  batchContext?: BatchContext;
}

export interface BatchContext {
  firstOffset?: string;
  firstTimestamp?: string;
  partitionLeaderEpoch?: number;
  inTransaction?: boolean;
  isControlBatch?: boolean;
  lastOffsetDelta?: number;
  producerId?: string;
  producerEpoch?: number;
  firstSequence?: number;
  maxTimestamp?: string;
  timestampType?: number;
  magicByte?: number;
}

export interface Headers {
  origen?: Value;
  "fecha-inicio-recepcion"?: Value;
}

export interface Value {
  type?: string;
  data?: number[];
}
