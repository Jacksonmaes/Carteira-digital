import Signin from "./Signin";

export default function Home () {
    return (
        <main className="flex flex-col items-center justify-center bg-zinc-900
        rounded p-8 w-[60rem] h-[35rem] text-2xl">
            <Signin />
        </main>
    )
}