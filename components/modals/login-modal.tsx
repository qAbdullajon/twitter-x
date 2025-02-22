import useLoginModal from '@/hooks/useLoginModal'
import Modal from '../ui/modal'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Button from '../ui/button'
import { useCallback } from 'react'
import useRegisterModal from '@/hooks/useRegisterModal'

export default function LoginModal() {
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

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }

  const bodyContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
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
