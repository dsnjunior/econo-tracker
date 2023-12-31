import { createId as createIdBase } from "@paralleldrive/cuid2";

export const idContext = {
  user: 'usr',
  session: 'ses',
  productType: 'prd_typ',
  productSize: 'prd_sz',
  productColor: 'prd_clr',
  productInStock: 'prd_stk',
  buy: 'buy',
  buyRegister: 'buyr',
  sell: 'sel',
  sellRegister: 'selr',
} as const


export function createId(context: keyof typeof idContext) {
  return `${idContext[context]}_${createIdBase()}`;
}