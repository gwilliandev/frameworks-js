import { Component } from '@angular/core';

@Component({
	selector: 'app-default-layout',
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
	handleScrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	handleScrollToMenu() {
		const element = document.getElementById('menu');
		element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}
}
