import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs, addDoc } from "firebase/firestore";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
      products: [] as ProductDoc[],
      allProducts: [] as ProductDoc[],
}),
  actions: {
    async init() {
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

      //set products
      this.products = initProducts;
      this.allProducts = initProducts;

      //get producys from database
      const productsCollected = collection(db, 'products');
      //get docs from firebase
      const productsStored = await getDocs(productsCollected);

      //if the docs are empty
      if (productsStored.empty) {
        
        //set products to init products
        await Promise.all(initProducts.map(product => addDoc(productsCollected, product)));

        this.products = initProducts; // Update Pinia state
      } else {
       //maps all items stored in firebase into products
        this.products = productsStored.docs.map((doc) => {
          //gets product data from stored items
          const data = doc.data();
          return {
            id: doc.id,
            data: { 
              name: data.name,
              description: data.description,
              price: data.price,
              rating: data.rating,
              stock: data.stock,
              image: data.image,
              category: data.category,
            },
          };
        });
      }
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