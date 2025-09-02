import { observer } from 'mobx-react-lite';
import { Form, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Ingrident, Recipe } from '../services/DTOs';
import { useStore } from '../store/storeContext';
import { useLang } from '../resources/langContext';


export const DisplayRecipe: React.FC<{ recipe: Recipe }> = observer(({ recipe }) => {
    const store = useStore();
    const { r } = useLang();

    const shoppingItems = store.shoppingBag.shoppingBagItems.reduce((acc, item) => {
        const count = item.refs.find(r => r.recipeId === recipe._id)?.count ?? 0;
        acc[item.name] = count;
        return acc;
    }, {} as Record<string, number>);

    const addAllIngredients = () =>
        store.shoppingBag.addAllIngredients(recipe._id);

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
                        <Form.Range color="#b91c1c" className="fill-red-700 text-red-700" max={3} min={1} step={1} value={recipe.difficulty} disabled={true} />
                        <Form.Label className="text-red-500">{r.recipes.complex}</Form.Label>
                    </div>
                </div>
                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap" >{r.recipes.description}</Form.Label>
                    <Form.Text className="!w-11/12" >{recipe?.description}</Form.Text>
                </div>
                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap" >{r.recipes.category}</Form.Label>
                    <Form.Text className="text-ellipsis w-full bg-transparent">{store.category.categories.find(c => c._id === recipe.categoryId)?.name}</Form.Text>
                </div>

                <div className="bg-gray-100 rounded-lg p-2">
                    <div className="flex justify-between pl-3">
                        <label className="text-2xl font-bold">{r.recipes.ingredients}</label>
                        <Button variant="outline-danger" title={r.recipes.add_items_to_cart} onClick={addAllIngredients}>
                            {r.recipes.add_items_to_cart}
                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-2 p-2">
                        {recipe?.ingredients?.map((i, idx) => (
                            <Ingredient ingredient={i} recipeId={recipe._id} count={shoppingItems[i.name]} key={idx} />
                        ))}
                    </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-2" >
                    <Form.Label className="text-2xl font-bold">{r.recipes.instructions}</Form.Label>
                    <div className="flex flex-col gap-y-2 p-2">
                        {recipe?.instructions?.map((instruction, index) => (
                            <div key={index} className="w-full flex gap-x-2 p-1">
                                <Form.Text className="text-ellipsis w-full bg-transparent">{instruction}</Form.Text>
                            </div>
                        ))}
                    </div>
                </div>
            </Form>
        </div>
    );
})


const Ingredient: React.FC<{ingredient: Ingrident, recipeId: string, count: number}> = observer(({ingredient, recipeId, count}) => {
    const store = useStore();

    const addIngredient = (name: string) =>
        store.shoppingBag.addIngredient(name, recipeId);

    const removeIngredient = (name: string) =>
        store.shoppingBag.removeIngredient(name, recipeId);

    return (
        <div className="flex justify-between gap-x-2">
            <div className="w-full flex gap-x-2 hover:bg-gray-200 p-1 rounded-md">
                <Form.Text className="text-ellipsis w-1/3 bg-transparent">{ingredient.name}</Form.Text>
                <Form.Text className="text-ellipsis w-1/3 bg-transparent">{ingredient.amount}</Form.Text>
                <Form.Text className="text-ellipsis w-1/3 bg-transparent">{ingredient.description}</Form.Text>
                <div className="flex gap-x-2 print:invisible">
                    <Button variant='danger' onClick={() => addIngredient(ingredient.name)} className="h-[30px] hover:shadow-lg">
                        <MdAdd />
                    </Button>
                    <span className='w-[20px] text-lg font-bold text-center'>{(count ?? 0) / ingredient.amount}</span>
                    <Button variant='danger' disabled={!count} onClick={() => removeIngredient(ingredient.name)} className="h-[30px] hover:shadow-lg">
                        <MdRemove />
                    </Button>
                </div>
            </div>
        </div>
    )
});