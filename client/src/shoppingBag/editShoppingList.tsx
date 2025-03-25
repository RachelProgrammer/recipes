

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useLocation } from "react-router"
import '../recipe/addRecipe.css'
import Header from "../components/header"
import { useStore } from "../store/storeContext"
const schema = yup
    .object({
        Id: yup.string().required(),
        Name: yup.string().required(),
        Count: yup.number().positive().integer().required(),
    })
    .required()


export default function EditShoppingList() {
    const store = useStore();
    const user = store.auth.user;
  const{state}=useLocation();
  const id=state.Id
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        values:{Id:id,Name:state.Name,Count:state.Count}
    })
    const onSubmit = (data: any) => {
        // console.log("data",data)
        // axios.post("http://localhost:8080/api/bay/edit", {data})
        //     .then(x => {
        //         console.log("edit")
        //         store.setShoppingList(x.data);
        //         // dispatch({ type: 'SET_SHOPPING', data: x.data });
        //     })
        //     .catch(err => console.log(err))
        //     .finally()
    }


   
    return (
        <>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", marginBottom: "10px" }}>
       <h1 style={{ color: "rgb(232,100,100)",fontWeight:"bold",borderColor:"red",fontSize:"60px"}}>Set Your ShoppingList</h1>
            <input {...register("Id")} className="addR" />
            <p>{errors.Id?.message?.toString()}</p>
      
            <input {...register("Name")} className="addR" placeholder="שם"/>
            <p>{errors.Name?.message?.toString()}</p>
      
            <input {...register("Count")} className="addR" placeholder="כמות"/>
            <p>{errors.Count?.message?.toString()}</p>
      
            <input type="submit" style={{ backgroundColor: "rgb(232,100,100)", borderRadius: "7px", borderColor: "white" }} />
          </form>
        </div>
        </>
      )
}