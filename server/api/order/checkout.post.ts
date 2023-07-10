import { serverSupabaseUser } from '#supabase/server'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  try {
    // TODO - move this to middleware
    const user = await serverSupabaseUser(event)
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    const stripe = await useServerStripe(event)

    // simulate fetch total price from DB
    const price: number = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(9999)
      }, 250)
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'usd',
      payment_method_types: ['link', 'card'],
    })

    return {
      secret: paymentIntent.client_secret,
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.message || 'failed to initiate payment',
    })
  }
})
