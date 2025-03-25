import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import './addRecipe.css'
import Header from "../components/header";
import { useStore } from "../store/storeContext";


// // export default function AddRecipe({ recipe }) {
export const AddOrEditRecipe: React.FC<{mode: "add" | "edit"}> = ({mode}) => {

  const store = useStore();
  const location = useLocation();
  const user = store.auth.user;
  // const recipeToEdit: Recipe | undefined = location.state.activeRecipe;
  

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState('');
  const [hour, setHour] = useState('');
  const [instructions, setInstructions] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<{quantity: string, type: string, name: string}[]>([{ quantity: '', type: '',name:'' }]);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState('');


  const applyRecipeData = async (rid: string) => {
    const recipeToEdit = await store.recipe.getById(rid);
    if (!recipeToEdit)
      return;

    setName(recipeToEdit?.Name);
    setDifficulty(recipeToEdit?.Difficulty);
    setHour(recipeToEdit?.Duration);
    setInstructions(recipeToEdit?.Instructions);
    setIngredients(recipeToEdit?.Ingrident);
    setDescription(recipeToEdit?.Description);
    setPhoto(recipeToEdit?.Img);
    setCategory(recipeToEdit?.CategoryId);
  }

  useEffect(() => {
    const rid = location.pathname;
    if (!!rid)
      applyRecipeData(rid);
  }, []);

  const handleInstructionChange = (index: any, value: any) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };
    const handleIngredientChange = (index: number, key: any, value: string) => {
      const updatedIngredients = [...ingredients];
      (updatedIngredients as any)[index][key] = value;
      setIngredients(updatedIngredients);

    }
    ; const addInstructionField = () => {
      setInstructions([...instructions, '']);
    };
  
    const removeInstructionField = (index: number) => {
      const updatedInstructions = [...instructions];
      updatedInstructions.splice(index, 1);
      setInstructions(updatedInstructions);
    };
  
    const addIngredientField = () => {
      setIngredients([...ingredients, { quantity: '', type: '',name:'' }]);
    };
  
    const removeIngredientField = (index: number) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    };

  
  const handleSubmit = (data: any) => {
    data.preventDefault()

    if (mode == "add")
      handleAddRecipe();
    else
      handleEditRecipe();
  }

  const handleEditRecipe = () => {
    const rid = location.pathname;
    const recipe = {
      Id: rid,
      Name: name,
      Instructions: instructions,
      Difficulty: difficulty,
      Duration: hour,
      UserId: user?.Id,
      Ingrident: ingredients,
      Description: description,
      Img: photo,
      CategoryId: category
    }
    axios.post("http://localhost:8080/api/recipe/edit", recipe).then((data) => {
      // refresh recipes
    })

  }

  const handleAddRecipe = () => {
    const recipe = {
      Name: name,
      Instructions: instructions,
      Difficulty: difficulty,
      Duration: hour,
      UserId: user?.Id,
      Ingrident: ingredients,
      Description: description,
      Img: photo,
      CategoryId: category
    }

    // axios.post<Recipe>("http://localhost:8080/api/recipe", recipe)
    //   .then(x => {
    //     console.log(x.data)
    //     store.addRecipe(x.data);
    //   })
    //   .catch(err => console.log(err))
  }

return (
  <>
    <h1 style={{ color: "rgb(232,100,100)",fontWeight:"bold",fontSize:"50px",textAlign:"center"}}>Add your Recipe</h1>
    <br/>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}>
   
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" , marginBottom: "10px" }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="addR" />

        <input value={difficulty} onChange={(e) => setDifficulty(e.target.value)} placeholder="Difficulty" className="addR" />

        <input value={hour} onChange={(e) => setHour(e.target.value)} placeholder="Duration" className="addR" />

        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="addR" />

        <input value={user?.Id} placeholder="userId" className="addR" />
        <br />

        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="CategoryId" className="addR" />

        <input value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Img" className="addR" />

        <label>Instructions:</label>

        {instructions?.map((instruction, index) => (
          <div key={index}>
            <input
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              className="addR"
            />
            <button className="btn btn-danger" type="button" onClick={() => removeInstructionField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-danger" type="button" onClick={addInstructionField}>
          Add Step
        </button>
        <br />
        <br />

        <label>Ingredients:</label>
        {ingredients?.map((ingredient, index) => (
          <div key={index}>
            <input
              type="number"
              value={ingredient.quantity}
              placeholder="כמות"
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              className="addR"
            />
            <input
              type="text"
              value={ingredient.type}
              placeholder=" סוג"
              onChange={(e) => handleIngredientChange(index, 'type', e.target.value)}
              className="addR"
            />
            <input
              type="text"
              value={ingredient.name}
              placeholder="שם"
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className="addR"
            />
            <button className="btn btn-danger" type="button" onClick={() => removeIngredientField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-danger" type="button" onClick={addIngredientField}>
          Add Ingredient
        </button>
        <br />

        <input type="submit" style={{ backgroundColor: "rgb(232,100,100)", borderRadius: "7px", borderColor: "white" }} />
      </form>
    </div>
  </>
);

}
