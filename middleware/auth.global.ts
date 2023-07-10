const unprotectedRoutes = ['/auth/login', '/auth/reset-password', '/auth/signup']

export default defineNuxtRouteMiddleware((to, _from) => {
  if (!unprotectedRoutes.includes(to.path)) {
    const user = useSupabaseUser()

    if (!user.value)
      return navigateTo('/auth/login')
  }
})
