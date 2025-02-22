import useRegisterModal from "@/hooks/useRegisterModal"
import Modal from "../ui/modal"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import Button from "../ui/button"
import { Input } from "../ui/input"
import useLoginModal from "@/hooks/useLoginModal"

export default function RegisterModal() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ name: '', email: "" })

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent =
    (step === 1)
      ? <RegisterStep1 setData={setData} setStep={setStep} />
      : <RegisterStep2 data={data} />

  const footer = (
    <div className="text-center text-neutral-400 pb-4">
      <p>Already have an account?{" "}
        <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>Sign in</span>
      </p>
    </div>
  )
  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalSteps={2}
    />
  )
}

function RegisterStep1({ setData, setStep }: {
  setData: Dispatch<SetStateAction<{
    name: string;
    email: string;
  }>>,
  setStep: Dispatch<SetStateAction<number>>
}) {
  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof registerStep1Schema>) {
    console.log(values)
    setStep(2)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label={'Next'} type="submit" fullwidth secondary large />
      </form>
    </Form>
  )
}

function RegisterStep2({ data }: { data: { name: string, email: string } }) {
  const form = useForm<z.infer<typeof registerStep2Schema>>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: "",
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof registerStep2Schema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label={'Register'} type="submit" fullwidth large secondary />
      </form>
    </Form>
  )
}