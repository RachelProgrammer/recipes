import { useState } from "react";
import { useLang } from "../resources/langContext";
import { useStore } from "../store/storeContext";
import { toast } from "react-toastify";
import { Recipe } from "../services/DTOs";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "react-bootstrap";
import {RecipeForm}   from "./recipeForm";

export const AddRecipeModal: React.FC<{ show: boolean, onHide: () => void }> = observer(({ show, onHide }) => {
    const store = useStore();
    const user = store.auth.user;

    const { r, dir } = useLang();

    const [recipe, setRecipe] = useState<Recipe | undefined>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!recipe) {
            toast.error(r.recipes.must_have_name)
            return;
        }

        recipe.categoryId ??= store.category.categories[0]._id;
        recipe.userId = user!._id!;
        const success = await store.recipe.addRecipe(recipe);
        if (success)
            onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" dir={dir} aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {r.recipes.add_recipe}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecipeForm recipe={recipe} setRecipe={setRecipe} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} className="btn btn-secondary">{r.recipes.cancel}</Button>
                <Button type="submit" className="btn btn-danger" onClick={handleSubmit}>{r.recipes.save}</Button>
            </Modal.Footer>
        </Modal>
    );
})