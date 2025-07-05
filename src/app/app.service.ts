
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  get isLocalDevelopment(): boolean {
    return location.hostname.startsWith('localhost');
  }

  constructor() { }

  // Add your service methods here
}
