import { SignupInput } from "@traskar/bllog-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { SHA256 } from "crypto-js";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    });
    const auth = useAuth();

    const handleSubmit = () => {
        const hashedPassword = SHA256(postInputs.password).toString();
        const secureInputs = {
            ...postInputs,
            password: hashedPassword
        };

        toast.promise(
            auth.authenticate(secureInputs, type),
            {
                loading: type === "signup" ? 'Creating account...' : 'Signing in...',
                success: type === "signup" ? 'Account created successfully!' : 'Signed in successfully!',
                error: (err) => err?.message || 'Something went wrong!'
            }
        );
    };

    return <div className="h-screen">
        <div className="absolute font-logo text-5xl ml-3 px-10 py-3">
            Bllog
        </div>
        <div className="h-full flex justify-center flex-col px-10">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="font-extrabold text-3xl">
                            {type === "signup" ? "Create an account" : "Welcome back"}
                        </div>
                        <div className="text-slate-600  font-extralight text-center">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            <Link className="pl-2 underline" to={type === "signup" ? '/signin' : '/signup'}>{type === "signup" ? "Login" : "Sign up"}</Link>
                        </div>
                    </div>
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="Enter your email" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="Enter your password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={handleSubmit} type="button" className="mt-6 w-full text-white bg-[#000000] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-bold text-gray-900 pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}