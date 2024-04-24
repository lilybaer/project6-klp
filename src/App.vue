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
      <template #activator="{ on }">
        <v-card>
          <v-card-title>Add New Product</v-card-title>
          <v-card-text v-if="showDialog">
            <!-- Form fields for adding a new product -->
            <v-text-field v-model="newProduct.data.name" label="Name"></v-text-field>
            <v-textarea v-model="newProduct.data.description" label="Description"></v-textarea>
            <v-text-field v-model.number="newProduct.data.price" label="Price" type="number"></v-text-field>
            <v-text-field v-model.number="newProduct.data.rating" label="Rating" type="number"></v-text-field>
            <v-text-field v-model.number="newProduct.data.stock" label="Stock" type="number"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="saveProduct">Save</v-btn>
            <v-btn @click="showDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </template>
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
import { ref, reactive } from "vue";
import { useProductStore } from "./stores/ProductStore";
import { ProductDoc } from "./types/product";

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);
const productStore = useProductStore();

const showDialog = ref(false);
const newProduct = reactive<ProductDoc>({
  id: "", 
  data: {
    name: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
  },
});

const addProduct = async () => {
  showDialog.value = true; // Open the dialog
};

const saveProduct = async () => {
  const confirmed = confirm("Are you sure you want to add this item?");
  if (confirmed) {
    await productStore.addItemToFirestore(newProduct);
    showDialog.value = false; // Close the dialog after adding
    // Reset newProduct object for next use
    newProduct.data.name = "";
    newProduct.data.description = "";
    newProduct.data.price = 0;
    newProduct.data.rating = 0;
    newProduct.data.stock = 0;
  }
};

</script>