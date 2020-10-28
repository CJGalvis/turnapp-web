import { Injectable } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarVerticalPosition,
	MatSnackBarHorizontalPosition
} from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	constructor(
		private snackBar: MatSnackBar
	) { }

	shortMessage(
		message: string,
		action?: string,
		duration?: number,
		verticalPosition?: MatSnackBarVerticalPosition,
		horizontalPosition?: MatSnackBarHorizontalPosition) {
		this.snackBar.open(message, action || 'Aceptar', {
			duration: duration || 3000,
			verticalPosition: verticalPosition || 'top',
			horizontalPosition: horizontalPosition || 'center',
		});
	}

	longMessage(
		message: string,
		action?: string,
		duration?: number,
		verticalPosition?: MatSnackBarVerticalPosition,
		horizontalPosition?: MatSnackBarHorizontalPosition) {
		this.snackBar.open(message, action || 'Aceptar', {
			duration: duration || 6000,
			verticalPosition: verticalPosition || 'top',
			horizontalPosition: horizontalPosition || 'center',
		});
	}

	customMessage(
		message: string,
		action: string,
		duration: number,
		verticalPosition: MatSnackBarVerticalPosition,
		horizontalPosition: MatSnackBarHorizontalPosition) {
		this.snackBar.open(message, action, {
			duration,
			verticalPosition,
			horizontalPosition
		});
	}
}
