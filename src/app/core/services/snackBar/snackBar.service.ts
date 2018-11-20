import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  show() {
    this.snackBar.open('Event doesn\'t exist', 'Close', {
      duration: 3500,
    });
  }

}
