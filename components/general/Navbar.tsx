import Link from "next/link";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return (
        <nav className="text-black p-5  flex items-center justify-between rounded-lg ">
            <div className="flex items-center gap-6">
                <div className="px-4 flex items-center gap-20">
                    <Link href="/">
                        <h1 className="text-3xl font-semibold ">Blogger<span className="text-blue-500">Geen</span></h1>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-blue-500 transition-colors">Home</Link>
                        <Link href="/dashboard" className="text-sm font-medium hover:text-blue-500">Dashboard</Link>

                    </div>
                </div>
            </div>

            {user ? (
                <div className="flex items-center gap-4">
                    <p>
                        {user.given_name}
                    </p>
                    <LogoutLink className={buttonVariants({variant: "secondary"})}>Logout</LogoutLink>
                </div>
            ): (
                <div className="flex items-center gap-4 ">
                    <RegisterLink className= {buttonVariants()}>Sign Up</RegisterLink>
                    <LoginLink className= {buttonVariants({variant : "secondary"})}>Login</LoginLink>   
                </div>
            )}
        </nav>
    );
}