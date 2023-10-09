import { Component, OnInit } from '@angular/core';
import { Carte } from 'src/app/models/carte';
import { ApiService } from 'src/app/services/api.service';
import { CartStoreService } from 'src/app/store/cart/cart.service';

type CarteList = {
	groups: string[];
	menu: Record<string, Carte[]>;
};

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	protected carteSize = 4;
	protected selectedCarte = 0;
	protected carte = {} as CarteList;

	constructor(private apiService: ApiService, private cartStore: CartStoreService) {}

	ngOnInit(): void {
		this.fetchMenuItems();
	}

	get menuItems() {
		return this.carte.menu ? this.carte.menu[this.carte.groups[this.selectedCarte]] : [];
	}

	async fetchMenuItems() {
		try {
			const data = await this.apiService.getCarte();
			this.groupItemByType(data);
		} catch (err) {
			console.log(err);
		}
	}

	handleScrollToMenu() {
		const element = document.getElementById('menu');
		element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
	}

	handleSelectCarte(index: number) {
		this.selectedCarte = index;
	}

	handleAddToCart(item: Carte) {
		this.cartStore.dispatchAddItemToCart({ ...item, count: 1 });
	}

	loadMore() {
		this.carteSize = this.carteSize + 4;
	}

	groupItemByType(items: Carte[]) {
		const carteList: CarteList = {
			groups: [],
			menu: {},
		};

		carteList.groups = items
			.map((item) => item.type)
			.reduce((acc, item) => {
				if (acc.length !== 0 && acc.includes(item)) return acc;
				acc.push(item);
				return acc;
			}, [] as string[]);

		carteList.groups.forEach((group) => {
			carteList.menu[group] = items.filter((item) => item.type === group);
		});

		this.carte.menu = carteList.menu;
		this.carte.groups = carteList.groups;
	}
}
