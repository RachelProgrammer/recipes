
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// import { useDispatch } from "react-redux"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { BsPersonFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { useStore } from "../store/storeContext"
import { User } from "../services/DTOs"
// import { User } from "../store/store"

const schema = yup
  .object({
    UserName: yup.string().required(),
    Password: yup.number().positive().integer().required(),
  })
  .required()


export default function LoginForm() {
  const navig=useNavigate();
  const store = useStore();
  const user = store.auth.user;
  // const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    store.auth.login(data.UserName, data.Password).then(() => {
      navig("/")
    }).catch((err: any) => console.error(err));
  }

  return (
    <div className="">
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
        <h1 style={{ color: "white", fontSize: "4rem", fontWeight: "bold" }}>Login</h1>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <BsPersonFill />
          </span>
          <input
            {...register("UserName")}
            placeholder="UserName"
            className="form-control"
            style={{ color: "rgb(162, 8, 8)", borderColor: "white" }}
          />
        </div>
        <p>{errors.UserName?.message}</p>
  
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FaLock />
          </span>
          <input
            {...register("Password")}
            placeholder="Password"
            type="password"
            className="form-control"
          />
        </div>
        <p>{errors.Password?.message}</p>
  
        <input type="submit" className="btn btn-primary" style={{ backgroundColor: "rgb(162, 8, 8)" }} />
      </form>
    </div>
    </div>
  );
  
}