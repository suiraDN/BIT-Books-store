import "./App.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BooksList from "./Components/books/BooksList";
import Ranger from "./Components/books/Ranger";
import Cart from "./Components/books/Cart";
import Books from "./Functions/Books";

function App() {
	const [books, setBooks] = useState([]);
	const [likes, setLikes] = useState(new Set());
	const [sort, setSort] = useState("");
	const [filter, setFilter] = useState(0);
	const [minMax, setMinMax] = useState([0, 0]);
	const [showCart, setShowCart] = useState(0);
	const [cartView, setCartView] = useState([]);
	const [dataReceived, setDataReceived] = useState(false);
	const booksStore = useRef([]);
	const [booksCartCount, setBooksCartCount] = useState(0);
	const [booksCartTotal, setBooksCartTotal] = useState(0);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		if (!dataReceived) {
			return;
		}

		setCartView(Books.getCartView(cart, booksStore.current));
	}, [dataReceived, cart]);

	useEffect(() => {
		setBooksCartCount(Books.getCartCount(cart));
	}, [cart]);

	useEffect(() => {
		if (!dataReceived) {
			return;
		}
		setBooksCartTotal(Books.getCartTotal(cart, booksStore.current));
	}, [dataReceived, cart]);

	useEffect(() => {
		axios.get("https://in3.dev/knygos/").then((res) => {
			booksStore.current = res.data;
			setDataReceived(true);
			setBooks([...booksStore.current]);
			let min = booksStore.current[0].price;
			let max = min;
			booksStore.current.forEach((b) => {
				min = min > b.price ? b.price : min;
				max = max < b.price ? b.price : max;
			});
			setMinMax([min, max]);
			setFilter(Math.floor(min));
		});
	}, []);

	useEffect(() => {
		let l = localStorage.getItem("booksLikes");
		if (null === l) {
			l = JSON.stringify([]);
		}
		l = JSON.parse(l);
		setLikes(new Set(l));
	}, []);

	useEffect(() => {
		localStorage.setItem("booksLikes", JSON.stringify([...likes]));
	}, [likes]);

	useEffect(() => {
		const actionObject = {
			type: "change_list",
			payload: {
				filter: filter,
				sort: sort,
			},
		};
		doChangeList(actionObject);
	}, [filter, sort]);

	const addBtnClicked = (id) => {
		setCart(Books.addToCart(id, cart));
	};

	const doChangeList = (action) => {
		const booksCopy = [...booksStore.current];
		switch (action.payload.sort) {
			case "asc":
				booksCopy.sort((a, b) => a.price - b.price);
				break;
			case "desc":
				booksCopy.sort((b, a) => a.price - b.price);
				break;
			default:
		}
		setBooks(booksCopy.filter((b) => b.price > action.payload.filter));
	};

	const likeBtnPress = (id) => {
		const likesCopy = new Set(likes);
		likesCopy.has(id) ? likesCopy.delete(id) : likesCopy.add(id);
		setLikes(likesCopy);
	};

	const remove = (id) => {
		setCart((c) => c.filter((b) => b.id !== id));
	};

	return (
		<div className="App">
			<div className="App-header">
				<h1>Books store 📚</h1>
			</div>
			<div className="booksSort">
				<div>
					<svg className="aup" onClick={() => setSort("asc")}>
						<use xlinkHref="#arrowup"></use>
					</svg>
					<svg className="adown" onClick={() => setSort("desc")}>
						<use xlinkHref="#arrowdown"></use>
					</svg>
				</div>
				<div>
					<Ranger
						minMax={minMax}
						filter={filter}
						setFilter={setFilter}
					></Ranger>
				</div>
			</div>
			<BooksList
				likeBtnPress={likeBtnPress}
				books={books}
				likes={likes}
				addBtnClicked={addBtnClicked}
			></BooksList>

			<div className="cart">
				<div className="count">{booksCartCount}</div>
				<svg onClick={() => setShowCart((s) => !s)}>
					<use xlinkHref="#cart"></use>
				</svg>
				<span>
					<b>{booksCartTotal.toFixed(2)}€</b>
				</span>
				<div className="bin">
					<Cart
						remove={remove}
						showCart={showCart}
						setShowCart={setShowCart}
						cartView={cartView}
					></Cart>
				</div>
			</div>
		</div>
	);
}

export default App;
