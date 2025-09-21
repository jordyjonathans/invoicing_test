export class Order {
  public id?: number;
  public invoiceID?: number;
  public quantity: number;
  public totalCogs: number;
  public totalPrice: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor({
    id,
    invoiceID,
    quantity,
    totalCogs,
    totalPrice,
    createdAt,
    updatedAt,
  }: Order) {
    this.id = id;
    this.invoiceID = invoiceID;
    this.quantity = quantity;
    this.totalCogs = totalCogs;
    this.totalPrice = totalPrice;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
