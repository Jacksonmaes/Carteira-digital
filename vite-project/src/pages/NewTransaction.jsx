import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { transactionSchema } from "../schemas/TransactionSchema";
import Input from "../components/Input";
import ErrorInput from "../components/ErrorInput";
import Button from "../components/Button";
import { createNewTransaction } from "../Services/transactions";
import { useState } from "react";


export default function NewTransaction() {
    const { type } = useParams();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(transactionSchema),
    });

   async function onSubmitForm(data) {
        try {
            const body = { ...data, type}
            await createNewTransaction(body);
            navigate("/");
        } catch( error ) {
            setApiError(error.message);
            console.log(data);        
        }
    }

    return(
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 gap-7 relative">
            <header>
                <Link to="/">
                <BiArrowBack className="text-white absolute top-3 left-3 text-2xl " />
                </Link>
                <h1 className="ext-white font-bold text-5xl">New {type}</h1>

            </header>
            {apiError && <ErrorInput text={apiError} />}

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