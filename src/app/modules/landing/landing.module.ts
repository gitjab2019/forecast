import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

import { MainRoutingModule } from './landing-routing.module';
import { LandingComponent } from './components/landing/landing-component.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';


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
