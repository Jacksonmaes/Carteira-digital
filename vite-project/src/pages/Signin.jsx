export default function Signin() {
    return (
        < div className="flex flex-col items-center justify-around border-zinc-900 
        rounded p-8 w-[35rem] h-[35rem]">
            <form className="flex flex-col justify-center gap-4 w-full text-2xl">
                <input
                type="email"
                placeholder="Email"
                className="rounded p-2 w-full"
                />
                <input
                type="password"
                placeholder="Password"
                className="ronded p-2 w-full"
                />

                <button
                type="submit"
                className="px-4 py-2 rounded w-full font-bold text-white text-2xl"
                >
                    SIGNIN
                </button>


                
            </form>
        </div>
    );
}