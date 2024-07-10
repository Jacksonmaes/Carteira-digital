import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { transactionSchema } from "../schemas/TransactionSchema";
import Input from "../components/Input";
import ErrorInput from "../components/ErrorInput";
import Button from "../components/Button";


export default function NewTransaction() {
    const { type } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(transactionSchema),
    });

    function onSubmitForm(data) {
        console.log(data);
    }

    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 gap-7 relative">
            <header>
                <Link to="/">
                <BiArrowBack className="text-white absolute top-3 left-3 text-2xl " />
                </Link>
                <h1 className="ext-white font-bold text-5xl">New {type}</h1>

            </header>

            <form onSubmit={handleSubmit(onSubmitForm)}
                 className="flex flex-col justify-center gap-4 w-full text-2xl"
                 > 

            <Input 
                type="number" 
                placeholder="Value" 
                register={register} 
                name ="value" 
                />
                {errors.value && <ErrorInput text={errors.value.message} />}
            <Input 
                type="text" 
                placeholder="Descripton"
                register={register} 
                name ="descripton" 
                />
                {errors.description && <ErrorInput text={errors.description.message} />}
            <Button type="submit" text="SAVE" />


            </form>
        </div>
    );
}