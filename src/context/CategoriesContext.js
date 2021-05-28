import { createContext, useState, useEffect } from "react";

export const CategoriesContext = createContext();

const CategoriesProvider = (props) => {

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const getCategories = async() => {
			const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
			await fetch(url)
			.then(response => response.json())
			.then(data => setCategories(data.drinks));
		}
		getCategories();
	}, []);

	return (
		<CategoriesContext.Provider
			value={{
				categories
			}}
		>
			{props.children}
		</CategoriesContext.Provider>
	)
}

export default CategoriesProvider;