export interface CarProps{
    id:number;
    model:string;
    type:string;
    year:string;
    image?:string;
    imageUrl:string;
    price:number;
    rentPerDay?:number;
    startRent?:Date;
    finishRent?:Date;
    createdAt?:Date;
    updatedAt?:Date;
    deletedAt?:Date;

}