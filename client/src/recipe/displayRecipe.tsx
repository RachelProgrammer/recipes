import { observer } from 'mobx-react-lite';
import { Form, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Ingrident, Recipe } from '../services/DTOs';
import { useStore } from '../store/storeContext';
import { useLang } from '../resources/langContext';
import { useState } from 'react';

export const DisplayRecipe: React.FC<{ recipe: Recipe }> = observer(({ recipe }) => {
    const store = useStore();
    const { r } = useLang();

    const shoppingItems = store.shoppingBag.shoppingBagItems.reduce((acc, item) => {
        const count = item.refs.find(r => r.recipeId === recipe._id)?.count ?? 0;
        acc[item.name] = count;
        return acc;
    }, {} as Record<string, number>);

    // מצב מקומי לעריכה
    const [ingredients, setIngredients] = useState<Ingrident[]>([...recipe.ingredients]);

    const handleIngredientChange = (index: number, field: keyof Ingrident, value: string) => {
        const newIngredients = [...ingredients];
        (newIngredients[index] as any)[field] = value;
        setIngredients(newIngredients);
    };

    const handleSaveRecipe = () => {
        store.recipe.editRecipe({
            ...recipe,
            ingredients, // חשוב: מעדכן את כל הרכיבים עם השינויים
        });
    };

    const addAllIngredients = () => store.shoppingBag.addAllIngredients(recipe._id);

    return (
        <div className="p-1">
            <Form className="flex flex-col gap-y-3">
                <div className="flex justify-between gap-x-10 font-bold text-3xl">
                    # {recipe?.title} #
                </div>
                <Image src={recipe.image} rounded />

                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap">{r.recipes.difficulty}</Form.Label>
                    <div className="!w-11/12 flex gap-x-1">
                        <Form.Label className="text-red-500">{r.recipes.easy}</Form.Label>
                        <Form.Range
                            color="#b91c1c"
                            className="fill-red-700 text-red-700"
                            max={3}
                            min={1}
                            step={1}
                            value={recipe.difficulty}
                            disabled
                        />
                        <Form.Label className="text-red-500">{r.recipes.complex}</Form.Label>
                    </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-2">
                    <div className="flex justify-between pl-3">
                        <label className="text-2xl font-bold">{r.recipes.ingredients}</label>
                        <Button variant="outline-danger" title={r.recipes.add_items_to_cart} onClick={addAllIngredients}>
                            {r.recipes.add_items_to_cart}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-2 p-2">
                        {ingredients.map((ingredient, idx) => (
                            <div key={idx} className="flex justify-between gap-x-2 hover:bg-gray-200 p-1 rounded-md">
                                <Form.Control
                                    value={ingredient.name}
                                    onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                                    className="w-1/4"
                                />
                                <Form.Control
                                    value={ingredient.amount}
                                    onChange={e => handleIngredientChange(idx, 'amount', e.target.value)}
                                    className="w-1/4"
                                />
                                <Form.Control
                                    value={ingredient.description}
                                    onChange={e => handleIngredientChange(idx, 'description', e.target.value)}
                                    className="w-1/2"
                                />
                                <div className="flex gap-x-2 print:invisible">
                                    <Button variant='danger' onClick={() => store.shoppingBag.addIngredient(ingredient.name, recipe._id)} className="h-[30px] hover:shadow-lg">
                                        <MdAdd />
                                    </Button>
                                    <span className='w-[20px] text-lg font-bold text-center'>{shoppingItems[ingredient.name] ?? 0}</span>
                                    <Button variant='danger' disabled={!shoppingItems[ingredient.name]} onClick={() => store.shoppingBag.removeIngredient(ingredient.name, recipe._id)} className="h-[30px] hover:shadow-lg">
                                        <MdRemove />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <Button variant="success" className="mt-2" onClick={handleSaveRecipe}>
                        {r.recipes.save}
                    </Button> */}
                </div>
            </Form>
        </div>
    );
});
