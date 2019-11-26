import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SvgClientComponent } from './svg-client/svg-client.component';
import { D3Service } from './d3/d3.service';
import { ZoomableDirective } from './d3/zoomable.directive';
import { SvgApComponent } from './svg-ap/svg-ap.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, SvgClientComponent, ZoomableDirective, SvgApComponent ],
  bootstrap:    [ AppComponent ],
  providers: [D3Service]
})
export class AppModule { }
