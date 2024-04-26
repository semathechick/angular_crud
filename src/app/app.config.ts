import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),provideToastr(), provideAnimationsAsync()]
};
