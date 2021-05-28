import Header from './components/Header'
import Form from './components/Form'
import RecipesList from './components/RecipesList'
import CategoriesProvider from './context/CategoriesContext'
import RecipesProvider from './context/RecipesContext'
import ModalProvider from './context/ModalContext'

function App() {
  return (
    <CategoriesProvider>
      <RecipesProvider>
        <ModalProvider>
          <Header />
          <div className="container">
            <div className="row align-items-start">
              <Form />
            </div>
            <RecipesList />
          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoriesProvider>
  );
}

export default App;
