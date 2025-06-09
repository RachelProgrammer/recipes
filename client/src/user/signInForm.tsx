
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { BsPersonFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { useStore } from "../store/storeContext"
import { useLang } from "../resources/langContext";
import { toast } from "react-toastify";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Link } from "react-router-dom";

export default function SignInForm() {
  const navig = useNavigate();
  const store = useStore();

  const { r } = useLang();

  const schema = yup
    .object({
      username: yup.string().required(r.auth.field_required),
      password: yup.string().required(r.auth.field_required),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = <K extends yup.InferType<typeof schema>>(data: K) => {
    store.auth.signIn(data).then(() => {
      toast.success(r.auth.signin_success.replace("{{username}}", data.username));
      navig("/recipes")
    }).catch((err: any) => {
      console.error(err);
      toast.error(r.auth.signin_failed);
    });
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="login bg-gray-200 rounded-xl w-1/2 p-10 flex justify-between flex-col shadow-xl h-[360px]">
        <div className="flex flex-col gap-y-5 items-center">
          <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-column align-items-center gap-y-5">
            <div className="flex flex-col items-end h-[50px] w-[300px]">
              <InputGroup>
                <InputGroupText>
                  <BsPersonFill />
                </InputGroupText>
                <FormControl
                  {...register("username")}
                  placeholder={r.auth.username}
                  className="text-md text-black"
                />
              </InputGroup>
              <p className="text-sm text-red-600 !m-0">{errors.username?.message}</p>
            </div>

            <div className="flex flex-col items-end h-[50px] w-[300px]">
              <InputGroup>
                <InputGroupText>
                  <FaLock />
                </InputGroupText>
                <FormControl
                  {...register("password")}
                  placeholder={r.auth.password}
                  type="password"
                  className="text-md text-black"
                />
              </InputGroup>
              <p className="text-sm text-red-600 !m-0">{errors.password?.message}</p>
            </div>

            <Button variant="danger" type="submit" >{r.auth.continue}</Button>
          </Form>

        </div>
        <div>
          <div className="flex items-center justify-center gap-x-2">
            <span>
              {r.auth.not_registred}
            </span>
            <Link to="/signup" className="text-black">
              {r.auth.signup_here}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

}