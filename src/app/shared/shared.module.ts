import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    MaterialModule
  ],
  exports: [HeaderComponent, FooterComponent, MaterialModule]
})
export class SharedModule { }
