import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from "./Components/account/account.component";
import {ContentComponent} from "./Components/content/content.component";
import {AppComponent} from "./Components/app.component";
import {NavComponent} from "./Components/nav/nav.component";
import {LoadingComponent} from "./loading/loading.component";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AccountComponent,
    ContentComponent,
    NavComponent
  ],
  imports: [
    AppRoutingModule,
    LoadingComponent,
    NgIf,
    NgClass,
    FormsModule
  ],
  providers: [],
  exports: [
    AccountComponent,
    ContentComponent,
    NavComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
