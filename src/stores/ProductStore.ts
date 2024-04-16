import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
      products: [] as ProductDoc[],
}),
  actions: {
    init() {
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