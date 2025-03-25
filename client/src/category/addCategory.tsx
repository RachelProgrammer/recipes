import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import '../recipe/addRecipe.css'
import Header from "../components/header";
import { useStore } from "../store/storeContext";

const schema = yup
  .object({
    Name: yup.string().required(),
  })
  .required();

const AddCategory = () => {
  const store = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    // values: category,
  });
  const onSubmit = (data: any) => {
    // ... your submit logic
    // data();
    console.log(data);
    store.category.add(data);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: "rgb(232,100,100)", fontWeight: "bold", fontSize: "50px" }}>Name Of Category</h1>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'fit-content' }}>
            <input {...register("Name")} className="addR" placeholder="Name" />
            <p>{errors.Name?.message}</p>
            <input type="submit" style={{ backgroundColor: "rgb(232,100,100)", borderRadius: "7px", borderColor: "white" }} />
          </form>
        </div>
      </div>
    </>
  );
}


export default AddCategory;