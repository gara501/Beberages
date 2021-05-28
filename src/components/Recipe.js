import { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
	const top = 50;
	const left = 50;
	
	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 600,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2,4,3),
	},
}));


const Recipe= ({recipe}) => {
	// Modal from Material UI
	const [ modalStyle ] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	
	const classes = useStyles();
	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const { setIdRecipe, recipeData, isLoading } = useContext(ModalContext);

	const showIngredients = (data) => {
		let ingredients = [];
		for (let i=1; i < 16; i++) {
			if (data[`strIngredient${i}`]) {
				ingredients.push(
					<li>{data[`strIngredient${i}`]} {data[`strMeasure${i}`]}</li>)
			}
		}
		return ingredients;
	}

	return (

		<div className="col-4 mb-3">
			<div className="card">
				<h2 className="card-header">{recipe.strDrink}</h2>
				<img className="card-img-top" 
							src={recipe.strDrinkThumb} 
							alt={recipe.strDrink} />
				<div className="card-body">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							setIdRecipe(recipe.idDrink);
							handleOpen();
						}}
					>Ver receta</button>
					<Modal
						open={open}
						onClose={() => {
							setIdRecipe(null);
							handleClose();
						}}
					>
						<div style={modalStyle} className={classes.paper}>
							 { isLoading &&
							 	<p>Loading...</p>
							 }
							 { !isLoading &&
							 	<>
								<h2>{recipeData.strDrink}</h2>
								<h4>{recipeData.strAlcoholic}</h4>
								<h5>Recommended glass: {recipeData.strGlass}</h5>
								<h5 className="mt-4">Instructions</h5>
								<p>{recipeData.strInstructions}</p>
								<img className="img-thumbnail my-4" src={recipeData.strDrinkThumb} alt='' />
								<h3>Ingredients</h3>
								<ul>
									{ showIngredients(recipeData) }
								</ul>
								</>
							}
							
						</div>
					</Modal>
				</div>
			</div>
		</div>
	)
}

export default Recipe;