import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date 
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const ABC = serverResponds[0]
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2
    const ratio = (priceDEF != 0) ? priceABC/priceDEF : 9
    const upperBound = 1.04
    const lowerBound = 0.965
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      };
   
  }
}
