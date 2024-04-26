import { Pipe, type PipeTransform } from '@angular/core';
import { Book } from '../../models/book';

@Pipe({
  name: 'FilterBookListForIsbn',
  standalone: true,
})
export class FilterBookListForIsbnPipe implements PipeTransform {

  transform(value: Book[], searchKey:string): Book[] {
    if (searchKey.length < 2) return value;
    return value.filter((v) => v.isbn.includes(searchKey));

    
}}