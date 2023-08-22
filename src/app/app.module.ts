import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemComponent } from 'src/component/menu-item/menu-item.component';
import { MenuService } from 'src/service/menu.service';
import { ActionEvent } from 'src/helper/actionEvent';
import { InserAfterFormComponent } from 'src/component/inser-after-form/inser-after-form.component';
import { ToggleEvent } from 'src/helper/toggleEvent';
import { FormsModule } from '@angular/forms';
import { UpdateFormComponent } from 'src/component/update-form/update-form.component';
import { DeleteMenuModalComponent } from 'src/component/delete-menu-modal/delete-menu-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemComponent,
    InserAfterFormComponent,
    UpdateFormComponent,
    DeleteMenuModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [MenuService, ActionEvent, ToggleEvent],
  bootstrap: [AppComponent],
})
export class AppModule {}
