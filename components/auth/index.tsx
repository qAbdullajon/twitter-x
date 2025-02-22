"use client"

import Image from "next/image"
import Button from "../ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useCallback } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import RegisterModal from "../modals/register-modal";
import LoginModal from "../modals/login-modal";
import { signIn, useSession } from "next-auth/react";

const Auth = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen()
    loginModal.onClose()
  }, [registerModal])

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen()
    registerModal.onClose()
  }, [loginModal])

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image className="hidden md:block justify-self-center" src={'/images/x.svg'} width={450} height={450} alt="X" priority unoptimized />
        <div className="flex flex-col justify-center gap-10 md:justify-between h-screen md:h-[70vh]">
          <div className="block md:hidden">
            <Image src={'/images/x.svg'} width={50} height={50} alt="X" priority unoptimized />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">Happening now</h1>
          <div className="w-full md:w-[70%]">
            <h2 className="text-3xl font-bold pb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => signIn("google")}
                fullwidth
                secondary
                label={
                  <div className="flex items-center gap-2 justify-center">
                    <FcGoogle />
                    Sign up with Google
                  </div>
                } />
              <Button
                onClick={() => signIn("github")}
                fullwidth
                secondary
                label={
                  <div className="flex items-center gap-2 justify-center">
                    <FaGithub />
                    Sign up with Github
                  </div>
                } />
              <div className="flex items-center">
                <div className="w-1/2 h-px bg-gray-700"></div>
                <p className="mx-2">or</p>
                <div className="w-1/2 h-px bg-gray-700"></div>
              </div>
              <Button onClick={onOpenRegisterModal} label="Create account" fullwidth />
              <div className="text-[10px] text-gray-400 ">
                By signing up, you agree to the{" "}
                <span className="text-sky-500">Terms of Service</span> and
                <span className="text-sky-500"> Privacy Policy</span>, including
                <span className="text-sky-500"> Cookie Use</span>.
              </div>
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <h3>Already have an account?</h3>
            <Button
              onClick={onOpenLoginModal}
              label="Sign In"
              fullwidth
              outline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth