export class Book {
    id:number;
    name:string;
    isbn:string;
    page:number;
    categoryId:number;
    publisherId:number;
    language:string;
    description:string;
    unitsInStock:number;

    constructor(data: any) {
        this.id=data.id;
        this.name=data.name;
        this.isbn=data.isbn;
        this.page=data.page;
        this.categoryId=data.categoryId;
        this.publisherId=data.publisherId;
        this.language=data.language;
        this.description=data.description;
        this.unitsInStock=data.unitsInStock;
    }
}
