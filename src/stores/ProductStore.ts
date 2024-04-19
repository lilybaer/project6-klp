import { defineStore } from "pinia";
import { Product, ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import db from "../firestore";
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
    allProducts: [] as ProductDoc[],
  }),
  actions: {
    async init() {
      //set products
      this.products = initProducts;
      this.allProducts = initProducts;

      //get producys from database
      const productsCollected = collection(db, "products");
      //get docs from firebase
      const productsStored = await getDocs(productsCollected);

      //if the docs are empty
      if (productsStored.empty) {
        //set products to init products
        await Promise.all(
          initProducts.map((product) => addDoc(productsCollected, product))
        );

        this.products = initProducts; // Update Pinia state
      } else {
        //maps all items stored in firebase into products
        this.products = productsStored.docs.map((doc) => {
          //gets product data from stored items
          return {
            id: doc.id,
            data: doc.data(),
          } as ProductDoc;
        });
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
    async addItemToFirestore(item: ProductDoc) {
      // Add the new item to Firestore
      const firebaseConfig = {
        // Firebase configuration...
      };
      const myapp: FirebaseApp = initializeApp(firebaseConfig);
      const db: Firestore = getFirestore(myapp);

      try {
        const productsCollected = collection(db, "products");
        await addDoc(productsCollected, item);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async removeItemFromFirestore(item: ProductDoc) {
      const firebaseConfig = {
        // Firebase configuration...
      };
      const myapp: FirebaseApp = initializeApp(firebaseConfig);
      const db: Firestore = getFirestore(myapp);

      try {
        const productsCollected = collection(db, "products");
        const productDoc = doc(db, "products", item.id);
        await deleteDoc(productDoc);
        this.products = this.products.filter(
          (product) => product.id !== item.id
        );
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },
    async updateItemInFirestore(updatedProduct: ProductDoc) {
      try {
        const productDoc = doc(db, "products", updatedProduct.id);
        await updateDoc(productDoc, updatedProduct.data);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
  },
});
