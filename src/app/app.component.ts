import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './shared/pages/book-list/book-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './shared/components/category/category/category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BookListForIsbnComponent } from './shared/pages/book-list-for-isbn/book-list-for-isbn.component';
import { EditBookComponent } from './components/admin-dashboard/book-dashboard/edit-book/edit-book.component';
import { UpdateBookComponent } from './components/admin-dashboard/book-dashboard/update-book/update-book.component';
import { AddCategoryComponent } from './components/category-dashboard/add-category/add-category.component';
import { EditCategoryComponent } from './components/category-dashboard/edit-category/edit-category.component';
import { UpdateCategoryComponent } from './components/category-dashboard/update-category/update-category.component';
import { AddPublisherComponent } from './components/admin-dashboard/publisher-dashboard/add-publisher/add-publisher.component';
import { EditPublisherComponent } from './components/admin-dashboard/publisher-dashboard/edit-publisher/edit-publisher.component';
import { UpdatePublisherComponent } from './components/admin-dashboard/publisher-dashboard/update-publisher/update-publisher.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BookListComponent,NavbarComponent,ToastrModule,CategoryComponent,CategoryListComponent,BookListForIsbnComponent,EditBookComponent,UpdateBookComponent,AddCategoryComponent,EditCategoryComponent,UpdateCategoryComponent,AddPublisherComponent,EditPublisherComponent,UpdatePublisherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
image= 'assets\images\zaini-izzuddin-55btQzyDiO8-unsplash.jpg'
}
