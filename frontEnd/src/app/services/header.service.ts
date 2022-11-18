import { Injectable } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private offcanvasService: NgbOffcanvas) {}
  openCanvas(content: any, position: any) {
    return this.offcanvasService.open(content, { position: position });
  }
}
