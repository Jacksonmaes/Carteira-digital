import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Button from "../components/Button";
import { GoSignOut,  } from "react-icons/go";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { userLogged } from "../Services/user";
import { findAllTransaction } from "../Services/transactions";
import dayjs from "dayjs";
import ErrorInput from "../components/ErrorInput";


export default function Home(){
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [transactions, setTrasactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [apiError, setApiError] = useState("");

    function validateToken() {
        
        const token = Cookies.get("token");
        if (!token) navigate("/signin");
    }

    async function getUserLogged() {
        try {
            const userResponse = await userLogged();
            setUser(userResponse.data);
        } catch (error) {
            console.log(error);
            setApiError(error.message);
        }
      }

      async function getAllTransactions(){
        try {
           const response = await findAllTransaction();
            setTrasactions(response.data);
            calculateBalance(response.data);
        } catch (error) {
            console.log(error);
            setApiError(error.message);
        }
    }

      function calculateBalance(transactions) {
        let total = 0;
        transactions.forEach((transactions) => {
            transactions.type === "input" 
            ? (total += Number(transactions.value))
            : (total -= Number(transactions.value));
        
        });
       setBalance(total);
    }

    useEffect(() => {
        validateToken();
        getUserLogged();
        getAllTransactions();
    }, []);

    return (
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8
    w-[60rem] h-[35rem] text-2xl">
        {apiError && <ErrorInput text={apiError} />}
        <header className="flex flex-col items-center justify-between w-full pb-4">
            <img src={logo} alt="" className="w-32"/>
            <di className = "flex items-center gap-4 text-white text-2xl">
                <h1>Olá, {user.name}</h1>
                <Link to="/signin">
                   <GoSignOut />
                </Link>
            </di>
        </header>
        <section className="bg-zinc-300 p-4 w-full h-full rounded flex items-center justify-center">
            {transactions.length ? (
                <ul className="w-full h-full flex flex-col justify-between">
                    <div className="h[17rem] overflow-auto p-3">
                       {transactions.map((transactions, index) => (
                            <li 
                            key={index}
                            className="flex justify-between items-center w-full"
                            >
                               <span className="flex items-center gap-2">
                                <span className="text-base text-zinc-500">
                                    {dayjs(transactions.created_at).format("DD/MM")}
                                </span>
                                {transactions.description}
                               </span>

                               <span className= {`
                               ${
                                transactions.type === "input"
                                ? "text-green-700"
                                : "text-red-700"
                               }
                               `}
                               >
                                {transactions.value}</span>
                            </li>
                        ))}
                    </div>
                    <li className="flex justify-between items-start w-full px-3">
                        <span>Balance</span>
                        <span className= {`
                               ${
                                balance > 0
                                ? "text-green-700"
                                : "text-red-700"
                               }
                               `}
                               >
                                {balance}
                            </span>
                        </li>
                </ul>
             ) : (
            <p>There is no check-in or check-out</p>
            )}
        </section>
        <footer className="w-full pt-2 flex gap-2 text-white text-lg font-bold">
            <Button type="button"text="New Input" icon="plus" transactions = "input" />
            <Button type="button"text="New Output" icon="minus" transactions = "output" />
            
        </footer>

    </main>
    );
}