import { createContext, useState, useEffect } from "react";
import Recipe from "../components/Recipe";

export const ModalContext = createContext();

const ModalProvider = (props) => {

	const [idRecipe, setIdRecipe] = useState(null);
	const [recipeData, setRecipeData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	// Call Api when we have a recipe

	useEffect(()=> {
		const getRecipe = async () => {
			if(!idRecipe) return;
			setIsLoading(true);

			const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
			await fetch(url)
				.then(response => response.json())
				.then(data => setRecipeData(data.drinks[0]));
				setIsLoading(false);
		}
		getRecipe();
	}, [idRecipe])

	return (
		<ModalContext.Provider
			value={{
				recipeData,
				isLoading,
				setIdRecipe			
			}}>
			{props.children}
		</ModalContext.Provider>
	)
}

export default ModalProvider;
