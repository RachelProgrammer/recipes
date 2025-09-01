import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Ingrident, Recipe } from "../services/DTOs";
import { useStore } from "../store/storeContext";
import { useLang } from "../resources/langContext";

export const RecipeForm: React.FC<{ recipe?: Recipe; setRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>> }> = observer(({ recipe, setRecipe }) => {
    const store = useStore();
    const { r } = useLang();
    const [imageSrc, setImageSrc] = useState<string>("");

    // עדכון כללי של שדות ב-Recipe
    const handleSet = <K extends keyof Recipe>(key: K, value: Recipe[K]) =>
        setRecipe(prev => ({ ...prev, [key]: value }) as Recipe);

    // עדכון אינגרדיינט ספציפי לפי סוג השדה
    const handleIngredientChange = <K extends keyof Ingrident>(index: number, key: K, value: Ingrident[K]) => {
        const updatedIngredients = [...recipe?.ingredients ?? []];
        updatedIngredients[index][key] = value;
        handleSet("ingredients", updatedIngredients);
    };

    // עדכון הוראות הכנה
    const handleInstructionChange = (index: number, value: string) => {
        const updatedInstructions = [...recipe?.instructions ?? []];
        updatedInstructions[index] = value;
        handleSet("instructions", updatedInstructions);
    };

    const addInstructionField = () =>
        handleSet("instructions", [...recipe?.instructions ?? [], ""]);

    const removeInstructionField = (index: number) => {
        const updatedInstructions = [...recipe?.instructions ?? []];
        updatedInstructions.splice(index, 1);
        handleSet("instructions", updatedInstructions);
    };

    const addIngredientField = () => {
        const updatedIngredients = [
            ...recipe?.ingredients ?? [],
            { name: "", amount: 0, description: "" } // חובה לכלול את כל השדות של Ingrident
        ];
        handleSet("ingredients", updatedIngredients);
    };

    const removeIngredientField = (index: number) => {
        const updatedIngredients = [...recipe?.ingredients ?? []];
        updatedIngredients.splice(index, 1);
        handleSet("ingredients", updatedIngredients);
    };

    const onImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageSrc(event.target.value);
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            handleSet("image", base64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="p-1">
            <Form className="flex flex-col gap-y-2">
                {/* כותרת */}
                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap">{r.recipes.name}</Form.Label>
                    <Form.Control
                        value={recipe?.title ?? ""}
                        onChange={(e) => handleSet("title", e.target.value)}
                        className="!w-11/12"
                    />
                </div>

                {/* דרגת קושי */}
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
                            value={recipe?.difficulty ?? 1}
                            onChange={(e) => handleSet("difficulty", Number(e.target.value))}
                        />
                        <Form.Label className="text-red-500">{r.recipes.complex}</Form.Label>
                    </div>
                </div>

                {/* תיאור */}
                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap">{r.recipes.description}</Form.Label>
                    <Form.Control
                        value={recipe?.description ?? ""}
                        onChange={(e) => handleSet("description", e.target.value)}
                        className="!w-11/12"
                    />
                </div>

                {/* קטגוריה */}
                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap">{r.recipes.category}</Form.Label>
                    <Form.Select
                        className="!w-11/12"
                        onClick={() => store.category.fetchAll()}
                        onChange={(e) => handleSet("categoryId", e.target.value)}
                    >
                        {store.category.categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </Form.Select>
                </div>

                {/* תמונה */}
                <div className="flex justify-between gap-x-10">
                    <Form.Label className="!w-1/12 whitespace-nowrap">{r.recipes.image}</Form.Label>
                    <Form.Control
                        value={imageSrc}
                        type="file"
                        onChange={onImageSelect}
                        className="!w-11/12"
                    />
                </div>

                {/* הוראות */}
                <div className="bg-gray-100 rounded-lg p-2">
                    <Form.Label className="text-2xl font-bold">{r.recipes.instructions}</Form.Label>
                    <div className="flex flex-col gap-y-2 p-2">
                        {recipe?.instructions?.map((instruction, index) => (
                            <div key={index} className="w-full flex gap-x-2px">
                                <Form.Control
                                    type="text"
                                    value={instruction}
                                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                                    className="w-full bg-transparent"
                                    as="textarea"
                                />
                                <button
                                    className="btn p-0 hover:fill-red-400 fill-red-600 border-none shadow-none"
                                    type="button"
                                    onClick={() => removeInstructionField(index)}
                                >
                                    <MdDelete className="fill-inherit" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-danger" type="button" onClick={addInstructionField}>
                        {r.recipes.add_step}
                    </button>
                </div>

                {/* מרכיבים */}
                <div className="bg-gray-100 rounded-lg p-2">
                    <label className="text-2xl font-bold">{r.recipes.ingredients}</label>
                    <div className="flex flex-col gap-y-2 p-2">
                        {recipe?.ingredients?.map((ingredient, index) => (
                            <div key={index} className="flex justify-between gap-x-2">
                                <div className="w-full flex gap-x-2">
                                    {/* שם */}
                                    <Form.Control
                                        type="text"
                                        value={ingredient.name}
                                        placeholder={r.recipes.ingredient_name}
                                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                        className="text-ellipsis w-1/3 bg-transparent"
                                    />
                                    {/* כמות */}
                                    <Form.Control
                                        type="number"
                                        value={ingredient.amount}
                                        placeholder={r.recipes.ingredient_amount}
                                        onChange={(e) => handleIngredientChange(index, 'amount', Number(e.target.value))}
                                        className="text-ellipsis w-1/3 bg-transparent"
                                    />
                                    {/* תיאור */}
                                    <Form.Control
                                        type="text"
                                        value={ingredient.description}
                                        placeholder={r.recipes.ingredient_quantity}
                                        onChange={(e) => handleIngredientChange(index, 'description', e.target.value)}
                                        className="text-ellipsis w-1/3 bg-transparent"
                                    />
                                </div>
                                <button
                                    className="btn p-0 hover:fill-red-400 fill-red-600 border-none shadow-none"
                                    type="button"
                                    onClick={() => removeIngredientField(index)}
                                >
                                    <MdDelete className="fill-inherit" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-danger" type="button" onClick={addIngredientField}>
                        {r.recipes.add_ingredient}
                    </button>
                </div>

            </Form>
        </div>
    );
});