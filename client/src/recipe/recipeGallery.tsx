import React, { useEffect, useState } from "react"
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Recipe } from "../services/DTOs"
import { useStore } from "../store/storeContext"
import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import _ from "lodash"
import { useLang } from "../resources/langContext"
import { toast } from "react-toastify"
import { AddRecipeModal } from "./addRecipeModal"
import { RecipeFilterBar } from "./recipeFilterBar"


const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
  <Link key={recipe._id} to={`/recipes/${recipe._id}/view`} className="no-underline p-3 col-md-4">
    <Card className="!h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <Card.Img variant="top" src={recipe?.image} className="h-[300px] w-full object-cover" />
      <Card.Body>
        <Card.Title>{recipe?.title}</Card.Title>
        <Card.Text className="line-clamp-2 h-[50px]">{recipe.description}</Card.Text>
      </Card.Body>
    </Card>
  </Link>
);

const RecipeGallery: React.FC = observer(() => {
  const store = useStore();
  const recipes = store.recipe.recipes;

  const { r } = useLang();

  const [filteredRecipes, setFilterRecipes] = useState<Recipe[]>(recipes);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);

  useEffect(() => {
    store.recipe.fetchAll();
  }, [])

  useEffect(() => {
    let filtered = recipes;
    if (!_.isEmpty(selectedCategories))
      filtered = filtered.filter(r => selectedCategories.includes(r.categoryId));
    if (!!selectedDifficulty)
      filtered = filtered.filter(r => r.difficulty === selectedDifficulty);

    setFilterRecipes(filtered);
  }, [recipes, selectedDifficulty, selectedCategories])

  const [addRecipeModal, setAddRecipeModal] = useState<boolean>(false);


  const createRecipe = () => {
    if (!store.category.categories.length) {
      toast.error(r.recipes.no_category);
      return;
    }
    setAddRecipeModal(true);
  }

  return (
    <div className="h-full w-full">
      <Button onClick={createRecipe}
        className="fixed bottom-20 right-20 z-50 h-fit !bg-red-600 border-black text-white !text-3xl font-bold px-9 py-3 rounded-full shadow-2xl btn-dark hover:!-translate-y-3 !translate-y-0 !duration-700 hover:!duration-700 hover:!transition-all !transition-all">        {r.recipes.add_recipe}
      </Button>
      <AddRecipeModal show={addRecipeModal} onHide={() => setAddRecipeModal(false)} />
      <RecipeFilterBar selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty} />
      <div className="row">
        {filteredRecipes?.map((recipe: Recipe) => <RecipeCard recipe={recipe} />)}
        {!filteredRecipes.length && <div className="h-[200px] w-full flex justify-center items-center">
          {recipes.length ? r.recipes.not_found : r.recipes.empty}
        </div>}
      </div>
    </div>
  );

});
export default RecipeGallery;
