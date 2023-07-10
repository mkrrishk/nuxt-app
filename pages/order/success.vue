<script setup lang="ts">

</script>

<template>
  <div class="p-6 md:mx-auto">
    <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
      <path
        fill="currentColor"
        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
      />
    </svg>
    <div class="text-center">
      <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
        Payment Done!
      </h3>
      <p class="text-gray-600 my-2">
        Thank you for completing your secure online payment.
      </p>
      <div class="py-10 text-center">
        <button class="font-sans inline-flex items-center justify-center w-full rounded-md bg-indigo-600 h-9 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-75 disabled:cursor-not-allowed" @click="navigateTo('/')">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>
