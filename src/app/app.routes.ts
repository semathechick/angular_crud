import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { BookListComponent } from './shared/pages/book-list/book-list.component';

import { AddBookComponent } from './features/book/add-book/add-book.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PublisherListComponent } from './components/publisher/publisher-list/publisher-list.component';
import { BookUpdateComponent } from './features/book/book-update/book-update.component';
import { CategoryComponent } from './shared/components/category/category/category.component';
import { BookListForIsbnComponent } from './shared/pages/book-list-for-isbn/book-list-for-isbn.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'books', component: BookListComponent},
  { path:'addBooks',component : AddBookComponent},
  {path:'getAllCategories',component:CategoryListComponent},
  {path:'katalog',component:CategoryComponent},
  {path:'getAllPublisher',component:PublisherListComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'book/:id/book-update',component:BookUpdateComponent},
  {path:'book-list-for-isbn',component:BookListForIsbnComponent}
  
  
];
