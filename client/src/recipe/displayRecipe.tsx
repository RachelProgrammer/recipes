import { observer } from 'mobx-react-lite';
import { Form, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { MdShoppingBag } from 'react-icons/md';
import { Recipe } from '../services/DTOs';
import { useStore } from '../store/storeContext';
import { useLang } from '../resources/langContext';


export const DisplayRecipe: React.FC<{ recipe: Recipe }> = observer(({ recipe }) => {
    const store = useStore();
    const { r } = useLang();

    const shoppingItems = store.shoppingBag.shoppingBagItems.map(i => i.name);

    const addToCart = (ingredientName: string) =>
        store.shoppingBag.addIngredient(ingredientName, recipe._id);

    return (
        <div className="p-1">
            <Form className="flex flex-col gap-y-3">
                <div className="flex justify-between gap-x-10 font-bold text-3xl">
                    # {recipe?.title} #
                </div>
                <Image src={recipe.image} rounded />

                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap" >{r.recipes.difficulty}</Form.Label>
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
                    <label className="text-2xl font-bold">{r.recipes.ingredients}</label>
                    <div className="flex flex-col gap-y-2 p-2">
                        {recipe?.ingredients?.map((ingredient, index) => (
                            <div key={index} className="flex justify-between gap-x-2">
                                <div className="w-full flex gap-x-2 hover:bg-gray-200 p-1 rounded-md">
                                    <Form.Text className="text-ellipsis w-1/3 bg-transparent">{ingredient.name}</Form.Text>
                                    <Form.Text className="text-ellipsis w-2/3 bg-transparent">{ingredient.description}</Form.Text>
                                    <Button variant='danger' disabled={shoppingItems.includes(ingredient.name)} title={r.recipes.add_item_to_cart} onClick={() => addToCart(ingredient.name)}>
                                        <MdShoppingBag />
                                    </Button>
                                </div>
                            </div>
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