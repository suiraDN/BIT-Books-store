function Cart({ showCart, setShowCart, cartView, remove }) {
	if (!showCart) return null;

	return (
		<div className="nice-cart">
			<h4>Shopping Cart</h4>
			<div className="close" onClick={() => setShowCart(false)}>
				<svg>
					<use xlinkHref="#xBtn"></use>
				</svg>
			</div>
			<div className="cart-list">
				{cartView.map((b) => (
					<div className="cart-line" key={b.id}>
						<h2 onClick={() => remove(b.id)}>X</h2>
						<b>{b.title}</b>
						<i>
							<b>{b.count}</b>vnt
						</i>
						<u>{b.count * b.price.toFixed(2)}€</u>
					</div>
				))}
			</div>
		</div>
	);
}

export default Cart;
