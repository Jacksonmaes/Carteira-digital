import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Logo (1).png'
import Button from "../components/Button";
import { GoSignOut } from "react-icons/go";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { userLogged } from "../Services/user";
import { findAllTransaction } from "../Services/transactions";



export default function Home(){
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [transactions, setTrasactions] = useState([{name: "Mercado"}])

    function validateToken() {
        
        const token = Cookies.get("token");
        if (!token) navigate("/signin");
    }

    async function getUserLogged() {
        try {
            const userResponse = await userLogged();
            setUser(userResponse.data);
        } catch (err) {
            console.log(err);
        }
      }

      async function getAllTransactions(){
        try {
           const response = await findAllTransaction();
            setTrasactions(response.data)
        } catch (error) {
            console.log(error);
        }
      }

    useEffect(() => {
        validateToken();
        getUserLogged();
        getAllTransactions();
    }, []);

    return (
    <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8
    w-[60rem] h-[35rem] text-2xl">
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
               <p>Tem alguma coisa</p>
            ) :(
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