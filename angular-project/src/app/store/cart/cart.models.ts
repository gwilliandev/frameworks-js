import { Carte } from "src/app/models/carte";

export type CartItem = Carte & {
  count: number
}
