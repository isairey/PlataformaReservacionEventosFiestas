export class AppError extends Error {
  constructor(messsage:string,public status:number) {
    super(messsage);
    this.status = status;
  }
}
