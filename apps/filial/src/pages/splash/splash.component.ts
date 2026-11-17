import { Component, computed, inject, input, OnInit, signal, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorageService';
import { SplashAnimationType } from './splash-animation-type';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  readonly animationDuration = input<number>(0.6);
  readonly duration = input<number>(2.8);
  readonly animationType = input<SplashAnimationType>(SplashAnimationType.FadeOut);

  readonly isExiting = signal(false);
  readonly progress = signal(15);
  readonly currentStepText = signal('Iniciando protocolos de segurança e integridade...');
  readonly systemVersion = signal('v2.4.0 • Edição Corporativa');

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private finishTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.localStorageService.limparLocalStorage();
    this.startLoadingSimulation();
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  private startLoadingSimulation(): void {
    const steps = [
      { progress: 28, text: 'Iniciando protocolos de segurança e integridade...' },
      { progress: 54, text: 'Carregando módulos de auditoria e conformidade...' },
      { progress: 82, text: 'Sincronizando parâmetros de Organizações Militares...' },
      { progress: 100, text: 'Ambiente pronto. Redirecionando...' }
    ];

    let stepIndex = 0;
    const intervalTime = (this.duration() * 1000) / (steps.length + 1);

    this.timerInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        this.progress.set(steps[stepIndex].progress);
        this.currentStepText.set(steps[stepIndex].text);
      } else {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.completeSplash();
      }
    }, intervalTime);
  }

  completeSplash(): void {
    if (this.isExiting()) return;
    this.clearAllTimers();
    this.progress.set(100);
    this.currentStepText.set('Concluído! Acessando portal...');
    this.isExiting.set(true);

    this.finishTimeout = setTimeout(() => {
      this.router.navigateByUrl('access');
    }, this.animationDuration() * 1000);
  }

  skipToAccess(): void {
    this.completeSplash();
  }

  private clearAllTimers(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.finishTimeout) {
      clearTimeout(this.finishTimeout);
      this.finishTimeout = null;
    }
  }
}
