import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Recipe } from '../services/DTOs';
import { useStore } from '../store/storeContext';
import {RecipeForm}   from './recipeForm';
import { useLang } from '../resources/langContext';


export const EditRecipeModal: React.FC<{ show: boolean, onHide: (updatedRecipe?: Recipe) => void, initialRecipe: Recipe }> = observer(({ show, onHide, initialRecipe }) => {
    const store = useStore();
    const user = store.auth.user;

    const { r, dir } = useLang();

    const [recipe, setRecipe] = useState<Recipe | undefined>(initialRecipe);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!recipe)
            return;

        recipe.categoryId ??= store.category.categories[0]._id;
        recipe.userId = user!._id!;
        const success = await store.recipe.editRecipe(recipe);
        if (success)
            onHide(success);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered dir={dir} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {initialRecipe ? r.recipes.edit_recipe : r.recipes.add_recipe}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecipeForm recipe={recipe} setRecipe={setRecipe} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHide()} className="btn btn-secondary">{r.recipes.cancel}</Button>
                <Button type="submit" className="btn btn-danger" onClick={handleSubmit}>{r.recipes.save}</Button>
            </Modal.Footer>
        </Modal>
    );
})