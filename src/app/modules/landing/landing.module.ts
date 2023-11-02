import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { MainComponent } from 'src/app/main/main.component';
import { FooterComponent } from 'src/app/footer/footer.component';

import { MainRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing-component/landing-component.component';
import { HeroComponent } from 'src/app/hero/hero.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HeroComponent
  ]
})
export class MainModule { }
