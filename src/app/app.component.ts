import { Component, OnInit } from '@angular/core';
import { PwaService } from './pwa/pwa-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pwaService: PwaService) {}

  ngOnInit(): void {
    this.pwaService.makeInstallable();
  }
}
