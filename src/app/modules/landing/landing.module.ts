import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing-component.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MainRoutingModule } from './landing-routing.module';
import { CincoDiasComponent } from 'src/app/components/cinco-dias/cinco-dias.component';
import { ChatComponent } from 'src/app/components/a-side/a-side.component';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    HeroComponent,
    CincoDiasComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HeroComponent,
    CincoDiasComponent
  ]
})
export class MainModule { }
