import { useEffect, useState } from "react";
import { useStore } from "../store/storeContext";
import { Category } from "../services/DTOs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";


const schema = yup
    .object({
        Name: yup.string().required(),
    })
    .required();

const CategoryForm: React.FC<{categoryId?: string}> = ({categoryId}) => {
    const store = useStore();
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
        // values: category,
    });

    useEffect(() => {
        if (!!categoryId)
            store.category.getById(categoryId).then(setCategory);
    }, [])


    if (!category) {
        return (
            <div>loading...</div>
        )
    }

    const onSubmit = async (data: {Name: string}) => {
        const category = await store.category.add(data.Name);
        navigate(`/category/view/${category.Id}`);
    }

    return (
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
    )
}


export default CategoryForm;