import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PwaService } from './pwa/pwa-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly isInstallButtonVisible$: Observable<boolean> = this.pwaService.isInstallButtonVisible$;

  constructor(private pwaService: PwaService) {}

  ngOnInit(): void {
    this.pwaService.makeInstallable();
  }

  onInstallClick() {
    this.pwaService.install();
  }
}
