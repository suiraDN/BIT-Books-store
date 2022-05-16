function Ranger({ minMax, filter, setFilter }) {
	return (
		<div className="priceFilter">
			<label>Min price from: {filter}€</label>
			<input
				type="range"
				min={Math.floor(minMax[0])}
				max={Math.ceil(minMax[1])}
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</div>
	);
}

export default Ranger;
