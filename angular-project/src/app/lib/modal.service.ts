import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

	watch(): Observable<'open' | 'close'> {
		return this.display.asObservable();
	}

	open() {
		const body = document.querySelector('body');
		if (body) {
			body.style.overflow = 'hidden';
		}
		this.display.next('open');
	}

	close() {
		const body = document.querySelector('body');
		if (body) {
			body.style.overflow = '';
		}

		document.querySelector('.modal-container')?.classList.remove('modal-fadeIn');
		document.querySelector('.modal-container')?.classList.add('modal-fadeOut');

		setTimeout(() => this.display.next('close'), 300);
	}
}
