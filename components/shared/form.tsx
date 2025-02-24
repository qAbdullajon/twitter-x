"use client"

import { IUser } from "@/types";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Button from "../ui/button";

interface Props {
  placeholder: string;
  user: IUser
}

const Form = ({ placeholder, user }: Props) => {
  const [body, setBody] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => { }

  return (
    <div className="border-b border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <textarea className="disabled:opacity-70 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-[50px]" placeholder={placeholder} disabled={isLoading} value={body} onChange={(e) => setBody(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSubmit()}></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
          <div className="mt-4 flex flex-row justify-end">
            <Button
              label={'Post'}
              className="px-8"
              disabled={isLoading || !body}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form