"use client"
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";



export function SubmitButton() {
    const { pending } = useFormStatus()
    return <Button className="w-fit" type="submit" disabled={pending}>{pending ? "Submiting" : "Submit"}</Button>
}