import { getServerSession } from "next-auth";
import LoginForm from "./loginForm";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession();
    if(session){
        redirect("/");
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4 mx-auto mt-10">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Inicia Sesion!</h2>
        <LoginForm />
        </div>
        </div>
      );

    }
