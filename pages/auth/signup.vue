<script setup lang="ts">
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

definePageMeta({
  layout: false,
})

const router = useRouter()
const client = useSupabaseAuthClient()

const validationSchema = toTypedSchema(
  zod.object({
    firstName: zod.string({ required_error: 'First name is required' }).nonempty('First name is required'),
    lastName: zod.string({ required_error: 'Last name is required' }).nonempty('Last name is required'),
    email: zod.string({ required_error: 'Email address is required' }).nonempty('Email address is required').email({ message: 'Invalid Email address' }),
    password: zod.string({ required_error: 'Password is required' }).nonempty('Password is required').min(8, { message: 'Password is too short' }),
  }),
)

const isLoading = ref(false)
const errorMessage = ref()
const onSignup = async (data: any) => {
  try {
    isLoading.value = true
    const { error } = await client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      },
    })
    if (error)
      errorMessage.value = error.message
    navigateTo('/')

    router.push('/')
  }
  catch (e) {
    errorMessage.value = 'Unknown Error occured'
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="isolate flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
      <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6" :validation-schema="validationSchema" @submit="onSignup">
        <div class="sm:col-span-3">
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
          <div class="mt-2">
            <Field id="firstName" type="text" name="firstName" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <ErrorMessage name="firstName" class="text-sm text-red-600 font-medium" />
        </div>

        <div class="sm:col-span-3">
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
          <div class="mt-2">
            <Field id="lastName" type="text" name="lastName" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <ErrorMessage name="lastName" class="text-sm text-red-600 font-medium" />
        </div>

        <div class="sm:col-span-full">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <Field id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <ErrorMessage name="email" class="text-sm text-red-600 font-medium" />
        </div>

        <div class="sm:col-span-full">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <Field id="password" name="password" type="password" autocomplete="new-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <ErrorMessage name="password" class="text-sm text-red-600 font-medium" />
        </div>

        <div class="sm:col-span-full">
          <button type="submit" :disabled="isLoading" class="inline-flex items-center justify-center w-full rounded-md bg-indigo-600 h-9 mt-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:cursor-not-allowed">
            <svg v-if="isLoading" aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            <span v-else>
              Sign up
            </span>
          </button>
          <span v-if="errorMessage" role="alert" class="mt-2 text-sm text-red-600 font-medium">
            {{ errorMessage }}
          </span>
        </div>
      </Form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Already have an account?
        <NuxtLink to="/auth/login" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Log In
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
