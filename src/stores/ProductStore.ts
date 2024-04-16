import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
      products: [] as ProductDoc[],
}),
  actions: {
    init() {
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyD6jLVmHRrdUJszjo53I-SODyRcapOSuf0",
        authDomain: "project6-klp.firebaseapp.com",
        projectId: "project6-klp",
        storageBucket: "project6-klp.appspot.com",
        messagingSenderId: "700073965367",
        appId: "1:700073965367:web:74046f3e00105be7fe4cb2",
        measurementId: "G-B6TQ202NWY"
      };

      //initialize firebase
      const myapp: FirebaseApp = initializeApp(firebaseConfig);
      const db: Firestore = getFirestore(myapp);

      this.products = initProducts;
    },
    filterByCategory(category: string) {
      return this.products.filter(
        product => product.data.category === category);
    },
    filterByRating(minRating: number){
      return this.products.filter(
        product => product.data.rating >= minRating);
    }
  }    
});