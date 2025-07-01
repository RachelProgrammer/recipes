import { useNavigate, useParams } from "react-router-dom";
import { DisplayRecipe } from "./displayRecipe";
import { EditRecipeModal } from "./editRecipeModal";
import { Recipe } from "../services/DTOs";
import React, { useEffect, useState } from "react";
import { useStore } from "../store/storeContext";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { useLang } from "../resources/langContext";
import { MdDelete, MdEdit, MdPrint } from "react-icons/md";
import _ from "lodash";

const RecipeActions: React.FC<{onEdit: () => void, onPrint: () => void, onDelete: () => void}> = (({onEdit, onPrint, onDelete}) => {
    const { r } = useLang();

    return (
        <div className='flex justify-center items-center p-3 gap-x-3 ignore-print'>
            <Button className='!flex gap-x-1 items-center' variant="outline-danger" type="button" onClick={onPrint}>
                <span>{r.recipes.print}</span>
                <MdPrint />
            </Button>
            <Button className='!flex gap-x-1 items-center' variant="outline-danger" type="button" onClick={onEdit} >
                <span>{r.recipes.edit}</span>
                <MdEdit />
            </Button>
            <Button className='!flex gap-x-1 items-center' variant="outline-danger" type="button" onClick={onDelete} >
                <span>{r.recipes.delete}</span>
                <MdDelete />
            </Button>
        </div>
    );
});

const RecipePage: React.FC<{isEditMode: boolean}> = observer(({isEditMode}) => {
    const { recipeId } = useParams();

    const store = useStore();
    const navigate = useNavigate();
    const { r } = useLang();

    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        store.recipe.getById(recipeId!).then(setRecipe);
    }, [recipeId, store.recipe])

    const [editRecipeModal, setEditRecipeModal] = useState<boolean>(isEditMode);

    useEffect(() => {
        const mode = editRecipeModal ? "edit" : "view";
        navigate(`/recipes/${recipeId}/${mode}`);
    }, [editRecipeModal, recipeId, navigate])

    const onHideEditRecipeModal = (updatedRecipe?: Recipe) => {
        setEditRecipeModal(false);
        if (updatedRecipe)
            setRecipe(updatedRecipe)
    }

    const deleteRecipe = (recipeId: string) => {
        store.recipe.deleteRecipe(recipeId);
        navigate("/recipes")
    }

    if (!recipe) return <div> {r.recipes.recipe_not_found} </div>;

    return (
        <div className="recipe bg-gray-200 rounded-xl w-4/5 p-10 flex justify-between flex-col shadow-xl min-h-full h-fit">
            <DisplayRecipe recipe={recipe} />
            <EditRecipeModal show={editRecipeModal} onHide={onHideEditRecipeModal} initialRecipe={_.cloneDeep(recipe)} />
            <RecipeActions onEdit={() => setEditRecipeModal(true)} onPrint={() => window.print()} onDelete={() => deleteRecipe(recipe._id)} />
        </div>
    );
});

export default RecipePage;
