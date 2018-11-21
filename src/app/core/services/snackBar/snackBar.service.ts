import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string = 'Event doesn\'t exist', action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3500,
    });
  }

}
