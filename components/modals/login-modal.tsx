import useLoginModal from '@/hooks/useLoginModal'
import Modal from '../ui/modal'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Button from '../ui/button'
import { useCallback, useState } from 'react'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'

export default function LoginModal() {
  const [error, setError] = useState("")
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const onToggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [registerModal, loginModal])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { data } = await axios.post("/api/auth/login", values)
      if (data.success) {
        loginModal.onClose()
      }
    } catch (error: any) {
      if (error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong")
      }
    }
  }

  const bodyContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4 md:px-12">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label="Login" fullwidth secondary large type='submit' />
      </form>
    </Form>
  )

  const footer = (
    <div className="text-neutral-400 text-center mb-4">
      <p>
        First time using X?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );


  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={bodyContent}
      footer={footer}
    />
  )
}
