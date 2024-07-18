<template>
  <div>
    <h1>Store</h1>
    <div>
      <v-row>
        <v-col v-for="(item, index) in dataBook" :key="index">
          <v-card class="mx-10 my-5" width="250">
            <v-img 
            height="300" 
            width="250" 
            :src="item.image"
            @click="$router.push('/Product')"
            ></v-img>

            <v-card-title>
              {{ item.name }}
            </v-card-title>

            <v-card-text>
              <div style="display: flex; justify-content: space-between">
                <p>Price {{ item.price }}฿</p>
                <p>({{ item.amount }})</p>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="black" text> Add to cart </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "BookShop",
      dataBook: [
        {
          name: "Howls Moving Castle",
          price: 358,
          amount: 10,
          image:
            "https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9780007299263.jpg",
        },
        {
          name: "อิ๊กคาบ๊อก (ปกอ่อน)",
          price: 470,
          amount: 10,
          image:
            "https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9786160449880.jpg",
        },
        {
          name: "Howls Moving Castle",
          price: 358,
          amount: 10,
          image:
            "https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9780007299263.jpg",
        },
        {
          name: "อิ๊กคาบ๊อก (ปกอ่อน)",
          price: 470,
          amount: 10,
          image:
            "https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9786160449880.jpg",
        },
        {
          name: "Howls Moving Castle",
          price: 358,
          amount: 10,
          image:
            "https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9780007299263.jpg",
        },
      ],
    };
  },
};
</script>

<style></style>
