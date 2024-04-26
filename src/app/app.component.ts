import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './shared/pages/book-list/book-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './shared/components/category/category/category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BookListForIsbnComponent } from './shared/pages/book-list-for-isbn/book-list-for-isbn.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BookListComponent,NavbarComponent,ToastrModule,CategoryComponent,CategoryListComponent,BookListForIsbnComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
image= 'assets\images\zaini-izzuddin-55btQzyDiO8-unsplash.jpg'
}
