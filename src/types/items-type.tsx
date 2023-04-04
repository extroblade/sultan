export default interface ItemsType {
  url: string,
  name: string,
  type: "weight" | "volume" | string,
  size: number,
  code: string,
  seller: string,
  brand: string,
  desc: string,
  price: number,
}
