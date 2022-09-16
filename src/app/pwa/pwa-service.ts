import { Inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { BeforeInstallPromptEvent } from './models/beforeInstallPromptEvent.model';

import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  deferredPrompt: BeforeInstallPromptEvent | null = null;

  installButtonSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isInstallButtonVisible$: Observable<boolean> = this.installButtonSubject$.asObservable();

  constructor(@Inject(DOCUMENT) private readonly window: Window) {}

  makeInstallable() {
    console.log('makeInstallable');

    this.window.addEventListener('beforeinstallprompt', (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();

      console.log('👍', 'beforeinstallprompt', event);

      this.deferredPrompt = event as BeforeInstallPromptEvent;

      this.installButtonSubject$.next(true);
    });

    this.window.addEventListener('appinstalled', (event: Event) => {
      console.log('👍', 'appinstalled', event);
      this.deferredPrompt = null;
    });
  }

  install() {
    this.deferredPrompt?.prompt();
    this.deferredPrompt?.userChoice.then((result: unknown) => {
      console.log('👍', 'userChoice', result);
    });
  }
}
