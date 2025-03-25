import { useParams, useLocation } from "react-router-dom";
import RecipeForm from "./recipeForm";
import DisplayRecipe from "./displayRecipe";

const RecipePage = () => {
    const { recipeId } = useParams();
    const location = useLocation();

    if (location.pathname.includes("add")) {
        return <RecipeForm recipeId={recipeId} />;
    } else if (location.pathname.includes("edit")) {
        return <RecipeForm recipeId={recipeId} />;
    } else if (location.pathname.includes("view") && !!recipeId) {
        return <DisplayRecipe recipeId={recipeId} />;
    } else {
        return <p>404 Not Found</p>;
    }
};

export default RecipePage;
