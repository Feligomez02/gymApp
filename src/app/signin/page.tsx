import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/lib/auth";
import { AuthError } from "next-auth";
import SignInForm from "@/app/signin/signInForm";

const SIGNIN_ERROR_URL = "/signin-error";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <SignInForm />

        <div className="mt-6">
          <p className="text-center text-gray-600">Or sign in with:</p>
          <div className="mt-2 space-y-2">
            {Object.values(providerMap).map((provider) => (
              <form
                key={provider.id}
                action={async () => {
                  "use server";
                  try {
                    await signIn(provider.id, {
                      redirectTo: props.searchParams?.callbackUrl ?? "",
                    });
                  } catch (error) {
                    if (error instanceof AuthError) {
                      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                    }
                    throw error;
                  }
                }}
              >
                <button type="submit" className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-md">
                  Continue with {provider.name}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
