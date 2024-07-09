import { Link } from "react-router-dom";
import logo from "../assets/logo (1).png";
import Button from "../components/Button";
import Input from "../components/Input";
import { BiArrowBack} from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { signupSchema } from "../schemas/SignupSchema";
import { signup } from "../Services/user";



export default function Signup() {

    const {register, 
        handleSubmit,
        formState: { errors },
    } =  useForm({ resolver: zodResolver(signupSchema) });

   async function handleSubmitForm(data) {
        console.log(data);
        const response = await signup(data);
        console.log(response);

        
    }
    return (
        <div className="flex flex-col items-center justify-around bg-zinc-900 
        rounded p-8 w-[35rem] h-[35rem]relative">
         <Link to="/signin">
         <BiArrowBack className="text-white absolute top-3 left-3 text-2xl hover:text-sky-600" />
         </Link>
         <img src={logo} alt="" className="w-44"/>

         <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">^
            <Input 
            type="text" 
            placeholder="Full Name" 
            register={register} 
            name ="name"
            />
              {errors.name && <ErrorInput text={errors.name.message} />}
            <Input 
            type="email" 
            placeholder="Email" 
            register={register} 
            name ="email"
            />
              {errors.email && <ErrorInput text={errors.email.message} />}
            <Input 
            type="password" 
            placeholder="Password" 
            register={register} 
            name ="password"
            />
              {errors.password && <ErrorInput text={errors.password.message} />}
            <Input 
            type="submit" 
            placeholder="Confirm Password" 
            register={register} 
            name ="confirm password"
            />
              {errors.confirmpassword && <ErrorInput text={errors.confirmpassword.message} />}
            <Button type="submit"  text="SIGNUP" />

         </form>
        </div>
    )
}