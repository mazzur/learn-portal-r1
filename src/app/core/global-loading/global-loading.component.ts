import { Component, OnInit } from '@angular/core';
import { GlobalLoadingService } from 'App/core/global-loading/global-loading.service';

@Component({
  selector: 'lp-global-loading',
  templateUrl: './global-loading.component.html',
  styleUrls: ['./global-loading.component.scss']
})
export class GlobalLoadingComponent implements OnInit {
  showSpinner$ = this.globalLoadingService.showSpinner$;

  constructor(private globalLoadingService: GlobalLoadingService) { }

  ngOnInit(): void {
  }

}
