import Image from "next/image"
import Button from "../ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  return (
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
              fullwidth
              secondary
              label={
                <div className="flex items-center gap-2 justify-center">
                  <FcGoogle />
                  Sign up with Google
                </div>
              } />
            <Button
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
            <Button label="Create account" fullwidth />
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
            label="Sign In"
            fullwidth
            outline />
        </div>
      </div>
    </div>
  )
}

export default Auth