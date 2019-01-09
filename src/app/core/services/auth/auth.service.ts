import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId = '-LRuxC_3Bxj6keYnY4BT';

  constructor() { }

  getUserId(): string {
    return this.userId;
  }
}
