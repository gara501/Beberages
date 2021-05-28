import { useContext, useState } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'
import { RecipesContext } from '../context/RecipesContext'

const Form = () => {

	const [search, setSearch] = useState({
		name: '',
		category: ''
	});

	const { categories } = useContext(CategoriesContext);
	const { setSearchRecipes, setConsult } = useContext(RecipesContext);

	const getDataRecipe = e => {
		setSearch({
			...search,
			[e.target.name]: e.target.value
		})
	}

	return (
		<>
			<form className="col"
				onSubmit={e => { 
					e.preventDefault();
					setSearchRecipes(search);
					setConsult(true);
				}}
				>
				<fieldset className="text-center mt-4">
					<legend>Busca bebidas por catetgoria o ingrediente</legend>

				</fieldset>
				<div className="row mt-4">
					<div className="col-4 align-self-start">
						<input
							name="name"
							className="form-control"
							type="text"
							onChange={getDataRecipe}
							placeholder="Buscar por ingrediente">
						</input>
					</div>
					<div className="col-4 align-self-start">
						<select
							className="form-control"
							onChange={getDataRecipe}
							name="category">
								<option value="">-- Seleccione categoria --</option>
								{categories.map(category => (
									<option key={category.strCategory} 
													value={category.strCategory}>
														{category.strCategory}
									</option>
								))}
						</select>
					</div>
					<div className="col-4 align-self-start">
						<input type="submit" className="btn btn-primary" value="Buscar Bebidas"></input>
					</div>
				</div>
			</form>
		</>
	)
}

export default Form;