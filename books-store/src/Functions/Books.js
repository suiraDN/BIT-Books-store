class Books {
	static getCartCount(cart) {
		let count = 0;
		cart.forEach((product) => {
			count += product.count;
		});
		return count;
	}

	static getCartTotal(cart, booksStore) {
		let amount = 0;
		cart.forEach((c) => {
			amount += this.getBookById(c.id, booksStore).price * c.count;
		});
		return amount;
	}

	static getBookById(id, booksStore, returnIndex = false) {
		let index = -1;
		booksStore.forEach((b, i) => {
			if (id === b.id) {
				index = i;
			}
		});
		return returnIndex ? index : booksStore[index];
	}

	static getCartView(cart, booksStore) {
		const view = [];
		cart.forEach((c) => {
			view.push({ ...this.getBookById(c.id, booksStore), count: c.count });
		});
		return view;
	}

	static addToCart(id, cartIn) {
		const cart = [...cartIn];
		const index = this.getBookById(id, cart, true);
		if (index === -1) {
			cart.push({ id: id, count: 1 });
		} else {
			cart[index].count++;
		}
		return cart;
	}
}

export default Books;
