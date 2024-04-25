import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import db from "../firestore";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
    //allProducts: [] as ProductDoc[],
  }),
  actions: {
    async init() {
      //set products
      this.products = initProducts;
      //this.allProducts = initProducts;

      //get producys from database
      const productsCollected = collection(db, "products");
      //get docs from firebase
      const productsStored = await getDocs(productsCollected);

      //if the docs are empty
      if (productsStored.empty) {
        //set products to init products
        await Promise.all(
          initProducts.map((product) => {
            const productRef = doc(db, `products/${product.id}`);
            setDoc(productRef, product.data);
          }));

        this.products = initProducts; // Update Pinia state
      } else {
        //maps all items stored in firebase into products
        this.products = productsStored.docs.map((doc) => {
          //gets product data from stored items
          return {
            id: doc.id,
            data: doc.data(),
          } 
        })as ProductDoc[];
      }
    },
    filterByCategory(category: string) {
      return this.products.filter(
        (product) => product.data.category === category
      );
    },
    filterByRating(minRating: number) {
      return this.products.filter(
        (product) => product.data.rating >= minRating
      );
    },
    async addItemToFirestore(newProduct: ProductDoc) {
      try {
        const productsCollection = collection(db, "products");
        const docRef = await addDoc(productsCollection, newProduct.data);
        // Update the local state with the added product (optional)
        const addedProduct = { id: docRef.id, data: newProduct.data };
        this.products.push(addedProduct);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async removeItemFromFirestore(productId: string) {
      try {
        const productDoc = doc(db, "products", productId);
        await deleteDoc(productDoc);

        this.products = this.products.filter(
          (product) => product.id !== productId
        );

      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },
    async updateItemInFirestore(updatedProduct: ProductDoc) {
      try {
        const productDoc = doc(db, "products", updatedProduct.id);
        await updateDoc(productDoc, updatedProduct.data);
        let index = this.products.indexOf(updatedProduct);
        if (index !== -1) {
          this.products[index].data = updatedProduct.data;
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
  },
});
