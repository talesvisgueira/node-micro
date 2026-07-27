import { NgStyle } from '@angular/common';
import * as dotenv from 'dotenv';
import { CommonModule } from '@angular/common'
import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { SplashAnimationType } from './splash-animation-type';
import { Router } from '@angular/router';
import { LocalStorageService } from '@/src/services/LocalStorageService'

@Component({
  selector: 'app-splash',
  imports: [CommonModule,NgStyle],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class SplashComponent {

  windowWidth: string = "";
  showSplash: boolean = true;
  opacityChange: number = 1;
  splashTransition: string = "";

  @Input() animationDuration: number = 0.5;
  @Input() duration: number = 3;
  @Input() animationType: SplashAnimationType = SplashAnimationType.FadeOut;

  localStorageService: LocalStorageService = inject(LocalStorageService);

  // SYSTEM_APP_NAME = APP_NAME;
  // SYSTEM_APP_DESCRIPTION = APP_DESCRIPTION;
  // SYSTEM_APP_SHORT_NAME = APP_SHORT_NAME;
  // SYSTEM_APP_VERSION = APP_VERSION;

  constructor(public router:Router) {

  }

  ngOnInit(): void {

    this.localStorageService.limparLocalStorage();

    setTimeout(() => {
        let transitionStyle = "";
        switch (this.animationType) {
          case SplashAnimationType.SlideLeft:
            this.windowWidth = '-' + window.innerWidth +  'px';
            transitionStyle = 'left ' + this.animationDuration + 's';
            break;
          case SplashAnimationType.SlideRight:
            this.windowWidth =  window.innerWidth +  'px';
            transitionStyle = 'left ' + this.animationDuration + 's';
            break;
          case SplashAnimationType.FadeOut:
            transitionStyle = 'opacity ' + this.animationDuration + 's';
            this.opacityChange = 0;
            break;
          default:
            this.windowWidth = '-' + window.innerWidth +  'px';
            transitionStyle = 'left ' + this.animationDuration + 's';
        }

        this.splashTransition = transitionStyle;

        setTimeout(() => {
            this.showSplash = !this.showSplash;
            this.router.navigateByUrl('access');
         }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }
}
