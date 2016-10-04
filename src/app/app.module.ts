import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { HomeModule } from './home/home.module';

@NgModule({
	imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes), HomeModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})

export class AppModule {};
