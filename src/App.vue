<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <v-btn color="primary" @click="addProduct">Add Product</v-btn>
    </v-app-bar>
    <v-dialog v-model="showDialog" max-width="500px">
        <v-card>
          <v-card-title>Add New Product</v-card-title>
          <v-card-text v-if="showDialog">
            <!-- Form fields for adding a new product -->
            <v-text-field v-model="newProduct.name" label="Name"></v-text-field>
            <v-text-field v-model="newProduct.image" label="Image URL"></v-text-field>
            <v-textarea v-model="newProduct.description" label="Description"></v-textarea>
            <v-text-field v-model.number="newProduct.price" label="Price" type="number"></v-text-field>
            <v-text-field v-model.number="newProduct.rating" label="Rating" type="number"></v-text-field>
            <v-text-field v-model.number="newProduct.stock" label="Stock" type="number"></v-text-field>
          </v-card-text>
          <v-select
            v-model="newProduct.category"
            :items="categories"
            label="Category"
            required
          ></v-select>
          <v-card-actions>
            <v-btn color="primary" @click="saveProduct">Save</v-btn>
            <v-btn @click="showDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import db from "./firestore";
import { collection, doc, setDoc } from 'firebase/firestore';

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

const categories = ['Groceries', 'Electronics', 'Clothing'];
const showDialog = ref(false);

const newProduct = ref({
  name: '',
  image: '', 
  description: '',
  price: 0,
  rating: 0, 
  stock: 0,
  category: '' 
});

const addProduct = async () => {
  showDialog.value = true; // Open the dialog
};

const saveProduct = async () => {
  const confirmed = confirm("Are you sure you want to add this item?");
  if (confirmed) {
    const productData = {
      name: newProduct.value.name,
      image: newProduct.value.image,
      rating: newProduct.value.rating,
      description: newProduct.value.description,
      price: Number(newProduct.value.price),
      stock: Number(newProduct.value.stock),
      category: newProduct.value.category
    };

    try {
      const newProduct = doc(collection(db, "products"));
      await setDoc(newProduct, productData);
      console.log("Product added with ID:", newProduct.id);
      showDialog.value = false;
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  }
};

</script>