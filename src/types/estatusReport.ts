export interface CstmrPmtStsRpt {
  GrpHdr?: GrpHdr;
  OrgnlGrpInfAndSts?: OrgnlGrpInfAndSts;
  OrgnlPmtInfAndSts?: OrgnlPmtInfAndSt[];
}

export interface GrpHdr {
  MsgId?: string;
  CreDtTm?: Date;
}

export interface OrgnlGrpInfAndSts {
  OrgnlMsgId?: string;
  OrgnlCreDtTm?: Date;
  OrgnlNbOfTxs?: number;
  OrgnlCtrlSum?: OrgnlCtrlSum;
  IntrBkSttlmDt?: Date;
  GrpSts?: string;
}

export interface OrgnlCtrlSum {
  Ccy?: string;
  Amt?: number;
}

export interface OrgnlPmtInfAndSt {
  OrgnlRegId?: number;
  OrgnlEndToEndId?: string;
  AccptncDtTm?: Date;
  ClrSysRef?: string;
  OrgnlTxId?: string;
  TxSts?: string;
  Rsn?: string;
  Amount?: OrgnlCtrlSum;
  Purp?: string;
  DbtrAgt?: string;
  CdtrAgt?: string;
  DbtrAcct?: TrAcct;
  CdtrAcct?: TrAcct;
  RmtInf?: string;
}

export interface TrAcct {
  Tp?: string;
  Id?: string;
}

// {
//     "CstmrPmtStsRpt": {
//       "GrpHdr": { "MsgId": "0157012021073011253200222015", "CreDtTm": "2021-07-30T11:25:33.351" },
//       "OrgnlGrpInfAndSts": {
//         "OrgnlMsgId": "0116012021073011253058553026",
//         "OrgnlCreDtTm": "2021-07-30T11:25:30.423",
//         "OrgnlNbOfTxs": 1,
//         "OrgnlCtrlSum": { "Ccy": "VES", "Amt": 1480239038.54091 },
//         "IntrBkSttlmDt": "2021-07-30",
//         "GrpSts": "RJCT"
//       },
//       "OrgnlPmtInfAndSts": [
//         {
//           "OrgnlRegId": 1,
//           "OrgnlEndToEndId": "01712022110219353390111379",
//           "AccptncDtTm": "2021-07-30T11:25:30.423",
//           "ClrSysRef": "VES011601162021073011253085717999",
//           "OrgnlTxId": "011601162021073011253032394204",
//           "TxSts": "RJCT",
//           "Rsn": "AC01",
//           "Amount": { "Ccy": "VES", "Amt": 1480239038.54091 },
//           "Purp": "",
//           "DbtrAgt": "0116",
//           "CdtrAgt": "0174",
//           "DbtrAcct": { "Tp": "CNTA", "Id": "1561231315132132" },
//           "CdtrAcct": { "Tp": "CNTA", "Id": "01741561231315132128" },
//           "RmtInf": "BTC - Mensaje de prueba"
//         }
//       ]
//     }
//   }
