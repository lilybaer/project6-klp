<template>
  <div>
    <template v-for="product in products">
      <v-card>
        <!-- Product Name -->
        <v-card-title>{{ product.data.name }}</v-card-title>

        <!-- Rating, Price, Stock in the same row -->
        <v-card-subtitle class="d-flex align-center">
          <!-- Rating as Stars -->
          <v-rating v-model="product.data.rating" half-increments disabled></v-rating>

          <!-- Price -->
          <span class="ml-2 text-h6 font-weight-bold">Price: ${{ product.data.price }}</span>

          <!-- Stock -->
          <span class="ml-2" v-if="product.data.stock > 0">In Stock: {{ product.data.stock }}</span>
          <span v-else class="ml-2 red--text">Out of Stock</span>
        </v-card-subtitle>

        <!-- Product Photo -->
        <v-img :src="product.data.image" height="300"></v-img>

        <!-- Product Description -->
        <v-card-text>{{ product.data.description }}</v-card-text>
      </v-card>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ProductDoc } from '../types/product.ts'; 

const products = defineProps<{
  product: ProductDoc;
}>();

</script>
