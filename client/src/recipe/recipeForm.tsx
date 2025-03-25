import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/storeContext";
import { Recipe } from "../services/DTOs";
import { he } from "../resources/he";


const r = he.recipes;
// import { fetchRecipeById, saveRecipe } from "../services/recipeService";

const RecipeForm: React.FC<{ recipeId?: string }> = ({ recipeId }) => {
    const navigate = useNavigate()
    const store = useStore();
    const user = store.auth.user;

    const [recipe, setRecipe] = useState<Recipe | undefined>();


    useEffect(() => {
        if (recipeId)
            store.recipe.getById(recipeId).then(setRecipe);
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // await saveRecipe(recipe);
        navigate("/recipe/view/" + recipe?.Id); // Redirect after save
    };

    const handleSet = (key: keyof Recipe, value: any) => { // TODO typeof value
        setRecipe({ ...recipe, [key]: value as any } as Recipe);
    }

    const handleIngredientChange = (index: number, key: any, value: string) => {
        const updatedIngredients = [...recipe?.Ingrident ?? []];
        (updatedIngredients as any)[index][key] = value;
        handleSet("Ingrident", updatedIngredients);

    }


    const handleInstructionChange = (index: any, value: any) => {
        const updatedInstructions = [...recipe?.Instructions ?? []];
        updatedInstructions[index] = value;
        handleSet("Instructions", updatedInstructions);
    };

    ; const addInstructionField = () => {
        handleSet("Instructions", [...recipe?.Instructions ?? [], '']);
    };

    const removeInstructionField = (index: number) => {
        const updatedInstructions = [...recipe?.Instructions ?? []];
        updatedInstructions.splice(index, 1);
        handleSet("Instructions", updatedInstructions);
    };

    const addIngredientField = () => {
        const updatedIngredients = [...recipe?.Ingrident ?? [], { quantity: '', type: '', name: '' }];
        handleSet("Ingrident", updatedIngredients);
    };

    const removeIngredientField = (index: number) => {
        const updatedIngredients = [...recipe?.Ingrident ?? []];
        updatedIngredients.splice(index, 1);
        handleSet("Ingrident", updatedIngredients);
    };



    if (!!recipeId && !recipe) {
        return (
            <div>loading...</div>
        )
    }


    return (
        <div style={{width: "40%", height: "100%"}}>
            <h1 style={{ color: "rgb(232,100,100)", fontWeight: "bold", fontSize: "50px", textAlign: "center" }}>// New Recipe //</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexFlow: "column", "rowGap": "5px", height: "calc(100% - 60px)", overflow: "auto"}}>
                <input value={recipe?.Name} onChange={(e) => handleSet("Name", e.target.value)} className="addR" placeholder={r.name} />
                <input value={recipe?.Difficulty} onChange={(e) => handleSet("Difficulty", e.target.value)} placeholder={r.difficulty} className="addR" />
                <input value={recipe?.Duration} onChange={(e) => handleSet("Duration", e.target.value)} placeholder={r.duration} className="addR" />
                <input value={recipe?.Description} onChange={(e) => handleSet("Description", e.target.value)} placeholder={r.description} className="addR" />
                <input value={recipe?.CategoryId} onChange={(e) => handleSet("CategoryId", e.target.value)} placeholder="CategoryId" className="addR" />
                <input value={recipe?.Img} onChange={(e) => handleSet("Img", e.target.value)} placeholder={r.image} className="addR" />

                <label style={{fontWeight: "bold"}}>{r.instructions}</label>
                <div>
                    {recipe?.Instructions?.map((instruction, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                className="addR"
                            />
                            <button className="btn btn-danger" type="button" onClick={() => removeInstructionField(index)}>
                                {r.remove}
                            </button>
                        </div>
                    ))}
                    <button className="btn btn-danger" type="button" onClick={addInstructionField}>
                        {r.add_step}
                    </button>
                </div>

                <label>{r.ingredients}</label>
                {recipe?.Ingrident?.map((ingredient, index) => (
                    <div key={index} style={{display: "flex", "justifyContent": "space-between"}}>
                        <input
                            type="number"
                            value={ingredient.quantity}
                            placeholder={r.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            className="addR"
                        />
                        <input
                            type="text"
                            value={ingredient.name}
                            placeholder={r.ingredient_name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            className="addR"
                        />
                        <button className="btn btn-danger" type="button" onClick={() => removeIngredientField(index)}>
                            {r.remove}
                        </button>
                    </div>
                ))}
                <button className="btn btn-danger" type="button" onClick={addIngredientField}>
                    {r.add_ingredient}
                </button>
                <br />

                <input type="submit" style={{ backgroundColor: "rgb(232,100,100)", borderRadius: "7px", borderColor: "white" }} />
            </form>
        </div>
    );
};

export default RecipeForm;
