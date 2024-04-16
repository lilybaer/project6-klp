<template>
  <!-- your answer -->
  <v-container>
    <v-row>
      <!-- Iterate over products and render StoreItem component for each product -->
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <StoreItem :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

import StoreItem from './StoreItem.vue'; 
import { useProductStore } from '../stores/ProductStore';

const productStore = useProductStore();
productStore.init(); 
const products = productStore.products;
</script>
