import Book from "./Book";

function BooksList({ books, likeBtnPress, likes, addBtnClicked }) {
	return (
		<div className="kvc">
			{books.length ? (
				books.map((b) => (
					<Book
						key={b.id}
						book={b}
						likeBtnPress={likeBtnPress}
						like={likes.has(b.id)}
						addBtnClicked={addBtnClicked}
					></Book>
				))
			) : (
				<div className="loader"></div>
			)}
		</div>
	);
}

export default BooksList;
