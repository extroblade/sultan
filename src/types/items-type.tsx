export default interface ItemsType {
  url: string, //!!!
  name: string,
  type: string, //"weight" | "volume" | "еще какое-то",
  size: number,
  code: string, //!!!
  seller: string,
  brand: string,
  desc: string,
  price: number,
  count?: number
}
