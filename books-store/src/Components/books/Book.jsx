function Book({ book, likeBtnPress, like, addBtnClicked }) {
	return (
		<div className="books">
			<svg className={like ? "like" : ""} onClick={() => likeBtnPress(book.id)}>
				<use xlinkHref="#heart"></use>
			</svg>
			<img src={book.img} alt="img" />
			<b>{book.title}</b>
			<i>
				<u>Author:</u> {book.author}
			</i>
			<div className="price">Price: {book.price}€</div>
			<button className="addToCart" onClick={() => addBtnClicked(book.id)}>
				Add to cart
			</button>
		</div>
	);
}

export default Book;
