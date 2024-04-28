import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/pages/homepage/homepage.component';
import { BookListComponent } from './shared/pages/book-list/book-list.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PublisherListComponent } from './components/publisher/publisher-list/publisher-list.component';
import { CategoryComponent } from './shared/components/category/category/category.component';
import { BookListForIsbnComponent } from './shared/pages/book-list-for-isbn/book-list-for-isbn.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { EditBookComponent } from './components/admin-dashboard/book-dashboard/edit-book/edit-book.component';
import { UpdateBookComponent } from './components/admin-dashboard/book-dashboard/update-book/update-book.component';
import { AddCategoryComponent } from './components/category-dashboard/add-category/add-category.component';
import { EditCategoryComponent } from './components/category-dashboard/edit-category/edit-category.component';
import { UpdateCategoryComponent } from './components/category-dashboard/update-category/update-category.component';
import { UpdatePublisherComponent } from './components/admin-dashboard/publisher-dashboard/update-publisher/update-publisher.component';
import { EditPublisherComponent } from './components/admin-dashboard/publisher-dashboard/edit-publisher/edit-publisher.component';
import { AddPublisherComponent } from './components/admin-dashboard/publisher-dashboard/add-publisher/add-publisher.component';
import { UserAccountComponent } from './core/user-account/user-account.component';
import { UserEditComponent } from './core/user-edit/user-edit.component';
import { AddBookComponent } from './components/admin-dashboard/book-dashboard/add-book/add-book.component';

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
  {path:'book/:id/book-update',component:UpdateBookComponent},
  {path:'book-list-for-isbn',component:BookListForIsbnComponent},
  {path:"user",component:UserAccountComponent,
  children:[
    {
        path:'useredit', component:UserEditComponent
    }
  ]
},
    {
    path:'admin',
    component: AdminDashboardComponent,
    canActivate:[authGuard],
    children:[
        {
            path:'bookadd',
           component:AddBookComponent,
        },
        {
         path:'bookedit',
         component:EditBookComponent,
        },
        {
         path:'bookedit/update/:bookId',
         component:UpdateBookComponent,
        },
        {
         path:'categoryadd',
         component:AddCategoryComponent,
        },
        {
         path:'categoryedit',
         component:EditCategoryComponent,
        },
        {
         path:'categoryedit/update/:categoryId',
         component:UpdateCategoryComponent,
        },
        {
         path:'publisheradd',
         component:AddPublisherComponent,
        },
        {
         path:'publisheredit',
         component:EditPublisherComponent,
        },
        {
         path:'publisheredit/update/:publisherId',
         component:UpdatePublisherComponent,
        }
        
   ]
 }
  
];
