
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { BsPersonFill } from 'react-icons/bs';
import { FaLock, FaUserAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useStore } from "../store/storeContext"
import { useLang } from "../resources/langContext";
import { toast } from "react-toastify";
import { DtoSignup } from "../services/DTOs";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Link } from "react-router-dom";


export default function SignUpForm() {
  const navig = useNavigate();
  const store = useStore();

  const { r } = useLang();

  const schema = yup.object({
    username: yup.string().required(r.auth.field_required).min(2, r.auth.name_too_short).max(20, r.auth.name_too_long),
    password: yup.string().required(r.auth.field_required)
      .min(8, r.auth.password_too_short)
      .max(32, r.auth.password_too_long)
      .matches(/^\S*$/, r.auth.password_should_not_include_spaces)
      .matches(/[A-Z]/, r.auth.password_should_include_capital)
      .matches(/[a-z]/, r.auth.password_should_include_lower)
      .matches(/[0-9]/, r.auth.password_should_include_number),
    name: yup.string().required(r.auth.field_required),
    phone: yup.string().nullable().transform(v => v.replace(/-/g, '')).notRequired().test('is-valid-phone', r.auth.phone_invalid, (v) => {
      if (!v) return true;
      return /^(?:\+972|0)(5\d{8}|7\d{8}|[2348]\d{7})$/.test(v)
    }),
    email: yup.string().required(r.auth.field_required).email(r.auth.email_invalid),
  }).required()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = <K extends yup.InferType<typeof schema>>(data: K) => {
    const dtoUser: DtoSignup = {
      email: data.email,
      name: data.name,
      password: data.password,
      username: data.username,
      phone: data.phone ?? undefined
    }
    store.auth.signUp(dtoUser).then(() => {
      toast.success(r.auth.signup_success.replace("{{username}}", data.username));
      navig("/recipes");
    }).catch(() => {
      toast.error(r.auth.signup_failed)
    })
  }


  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="signup bg-gray-200 rounded-xl h-[600px] w-1/2 p-10 flex justify-between flex-col shadow-xl">
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-column align-items-center gap-y-5">
          <div className="flex flex-col items-end h-[50px] w-[350px]">
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

          <div className="flex flex-col items-end h-[50px] w-[350px]">
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

          <div className="flex flex-col items-end h-[50px] w-[350px]">
            <InputGroup>
              <InputGroupText>
                <FaUserAlt />
              </InputGroupText>
              <FormControl
                {...register("name")}
                placeholder={r.auth.name}
                className="text-md text-black"
              />
            </InputGroup>
            <p className="text-sm text-red-600 !m-0">{errors.name?.message}</p>
          </div>

          <div className="flex flex-col items-end h-[50px] w-[350px]">
            <InputGroup>
              <InputGroupText>
                <FaPhoneAlt />
              </InputGroupText>
              <FormControl
                {...register("phone")}
                placeholder={r.auth.phone}
                className="text-md text-black"
              />
            </InputGroup>
            <p className="text-sm text-red-600 !m-0">{errors.phone?.message}</p>
          </div>

          <div className="flex flex-col items-end h-[50px] w-[350px]">
            <InputGroup>
              <InputGroupText>
                <FaEnvelope />
              </InputGroupText>
              <FormControl
                {...register("email")}
                placeholder={r.auth.email}
                className="text-md text-black"
              />
            </InputGroup>
            <p className="text-sm text-red-600 !m-0">{errors.email?.message}</p>
          </div>

          <Button variant="danger" type="submit" >{r.auth.continue}</Button>

        </Form>
        <div>
          <div className="flex items-center justify-center gap-x-2">
            <span> {r.auth.already_registred} </span>
            <Link to="/signin" className="text-black">
              {r.auth.signin_here}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}