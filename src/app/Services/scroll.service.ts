import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private anchor: string | null = null;

  setAnchor(anchor: string) {
    this.anchor = anchor;
  }

  getAnchor(): string | null {
    const a = this.anchor;
    this.anchor = null;
    return a;
  }
}
