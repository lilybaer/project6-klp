<template>
  <div>
    <v-card class="mb-4">
      <!-- Product Image -->
      <v-img :src="product.data.image" max-height="300"></v-img>

      <!-- Card Content -->
      <v-card-text>
        <!-- Product Name -->
        <v-card-title class="text-h5">
          <!-- Conditional rendering of product name -->
          <template v-if="editing">
            <!-- Render input field when editing is true -->
            <v-text-field
              v-model="editedProduct.data.name"
              label="Name"
            ></v-text-field>
          </template>
          <template v-else>
            <!-- Render static text when not editing -->
            {{ product.data.name }}
          </template>
        </v-card-title>

        <!-- Rating and Price -->
        <v-card-subtitle class="d-flex align-center">
          <!-- Rating as Stars -->
          <v-rating
            :value="editing ? editedProduct.data.rating : product.data.rating"
            half-increments
            disabled
            size="15"
          >
          </v-rating>

          <!-- Price -->
          <template v-if="!editing">
            <span class="ml-2 text-body-2 font-weight-bold mr-4"
              >Price: ${{ product.data.price }}</span
            >
          </template>
          <template v-else>
            <v-text-field
              v-model.number="editedProduct.data.price"
              label="Price"
              type="number"
            ></v-text-field>
          </template>

          <!-- Stock -->
          <template v-if="!editing">
            <span class="text-body-2" v-if="product.data.stock > 0"
              >Stock: {{ product.data.stock }}</span
            >
          </template>
          <template v-else>
            <v-text-field
              v-model.number="editedProduct.data.stock"
              label="Stock"
              type="number"
            ></v-text-field>
          </template>
        </v-card-subtitle>

        <!-- Product Description -->
        <v-card-text class="mt-2">
          <!-- Conditional rendering of product description -->
          <template v-if="editing">
            <!-- Render textarea when editing is true -->
            <v-textarea
              v-model="editedProduct.data.description"
              label="Description"
            ></v-textarea>
          </template>
          <template v-else>
            <!-- Render static text when not editing -->
            {{ product.data.description }}
          </template>
        </v-card-text>

        <!-- Action Buttons -->
        <v-card-actions>
          <template v-if="!editing">
            <!-- Display action buttons when not editing -->
            <v-btn color="primary" @click="deleteItem">Delete</v-btn>
            <v-btn color="primary" @click="toggleEdit">Modify</v-btn>
          </template>
          <template v-else>
            <!-- Display edit mode buttons when editing -->
            <v-btn color="success" @click="updateItem">Update</v-btn>
            <v-btn color="error" @click="cancelEdit">Cancel</v-btn>
          </template>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ProductDoc } from "../types/product.ts";
import { useProductStore } from "../stores/ProductStore.ts";

const productStore = useProductStore();
// Define component props
const props = defineProps<{
  product: ProductDoc;
}>();
// Define reactive variables
const editing = ref(false);
const editedProduct = ref<ProductDoc>(props.product);


// Define component methods
/*
const createItem = async (product: ProductDoc) => {
  const confirmed = confirm("Are you sure you want to add this item?");
  if (confirmed) {
    await useProductStore().addItemToFirestore(product);
  }
};
*/

const deleteItem = async () => {
  
  if (confirm("Are you sure you want to delete this item?")) {
    productStore.removeItemFromFirestore(props.product.id);
  }
};

const toggleEdit = () => {
  editing.value = true;
};

const cancelEdit = () => {
  editing.value = false;
  editedProduct.value = { ...props.product };
};

const updateItem = async () => {
  const confirmed = confirm("Are you sure you want to update this item?");
  if (confirmed) {
    await productStore.updateItemInFirestore(editedProduct.value);
    editing.value = false;
  }
};
</script>
