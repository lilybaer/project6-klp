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
        <v-btn color="primary" @click="createItem(product)">Create</v-btn>
        <v-btn color="primary" @click="deleteItem(product)">Delete</v-btn>
        <v-btn color="primary" @click="modifyItem(product)">Modify</v-btn>
      </v-card>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {ProductDoc } from '../types/product.ts'; 
import { useProductStore } from '../stores/ProductStore.ts';

const createItem = async (product: ProductDoc) => {
  // Confirmation prompt
  console.log('in create item');
  const confirmed = confirm("Are you sure you want to add this item?");
  console.log(product.data.name);
  
  if (confirmed) {
    // Add item to Firestore
    console.log('here');
    
    await addNewItemToFirestore(product);
  }
};

const deleteItem = async (product: ProductDoc) => {}

const modifyItem = async (product: ProductDoc) => {}


const addNewItemToFirestore = async (item: ProductDoc) => {
  // Call the action from the store to add the new item
  console.log('in add ite to firetore');
  console.log(item.data.name);
  await useProductStore().addItemToFirestore(item);
};

const products = defineProps<{
  product: ProductDoc;
}>();

</script>
