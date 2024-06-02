export interface Operacion {
  CstmrCdtTrfInitn?: CstmrCdtTrfInitn;
}

export interface CstmrCdtTrfInitn {
  GrpHdr?: GrpHdr;
  PmtInf?: PmtInf[];
}

export interface GrpHdr {
  MsgId?: string;
  CreDtTm?: string;
  NbOfTxs?: number;
  CtrlSum?: CtrlSum;
  IntrBkSttlmDt?: string;
  LclInstrm?: string;
  Channel?: string;
}

export interface CtrlSum {
  Ccy?: string;
  Amt?: number;
}

export interface PmtInf {
  RegId?: number;
  EndToEndId?: string;
  ClrSysRef?: string;
  TxId?: string;
  Amount?: CtrlSum;
  Purp?: string;
  DbtrAgt?: string;
  CdtrAgt?: string;
  Dbtr?: Cdtr;
  DbtrAcct?: TrAcct;
  Cdtr?: Cdtr;
  CdtrAcct?: TrAcct;
  RmtInf?: string;
}

export interface Cdtr {
  Nm?: string;
  Id?: string;
  SchmeNm?: string;
}

export interface TrAcct {
  Tp?: string;
  Id?: string;
}

// {
//     "CstmrCdtTrfInitn": {
//       "GrpHdr": {
//         "MsgId": "0157012024052713101189968838",
//         "CreDtTm": "2024-05-27T13:10:11.708",
//         "NbOfTxs": 1,
//         "CtrlSum": {
//           "Ccy": "VES",
//           "Amt": 17167.46
//         },
//         "IntrBkSttlmDt": "2024-05-27",
//         "LclInstrm": "040",
//         "Channel": "0003"
//       },
//       "PmtInf": [
//         {
//           "RegId": 1,
//           "EndToEndId": "01572024052713101149509374",
//           "ClrSysRef": "VES015701572024052713101136324147",
//           "TxId": "015701572024052713101195736784",
//           "Amount": {
//             "Ccy": "VES",
//             "Amt": 17167.46
//           },
//           "Purp": "",
//           "DbtrAgt": "0157",
//           "CdtrAgt": "0001",
//           "Dbtr": {
//             "Nm": "Justin F. Ibarra",
//             "Id": "V19516502",
//             "SchmeNm": "SCID"
//           },
//           "DbtrAcct": {
//             "Tp": "CNTA",
//             "Id": "8718351413875461"
//           },
//           "Cdtr": {
//             "Nm": "Walter M. Taylor",
//             "Id": " V34894613",
//             "SchmeNm": "SCID"
//           },
//           "CdtrAcct": {
//             "Tp": "CNTA",
//             "Id": "00011561231315132133"
//           },
//           "RmtInf": "BTC - Mensaje de prueba"
//         }
//       ]
//     }
//   }
