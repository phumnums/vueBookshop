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
              src="https://www.asiabooks.com/media/catalog/product/cache/a5ac216be58c0cbce1cb04612ece96dc/9/7/9780007299263.jpg"
            ></v-img>

            <v-card-title>
              {{ item.product_name }}
            </v-card-title>

            <v-card-text>
              <div style="display: flex; justify-content: space-between">
                <p>Price {{ item.price }}฿</p>
                <p>({{ item.amount }})</p>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="black" text @click="$router.push(`/product/${item._id}`)">
                Add to cart
              </v-btn>
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
      dataBook: [],
      dialog: false,
      id: "",
      postData: {
        product_name: "",
        price: "",
        amount: "",
      },
      postDefault: {
        product_name: "",
        price: "",
        amount: "",
      },
      orderData: {
        customer_id: "",
        quantity: "",
      },
      orderDefault: {
        customer_id: "",
        quantity: "",
      },
    };
  },
  computed: {
    savemode() {
      return this.id == "" ? "New Item" : "Edit Item";
    },
  },
  created() {
    console.log("created");
    this.getAllProduct();
    this.getData();
  },
  methods: {
    getAllProduct() {
      this.axios
        .get("http://localhost:3000/api/v1/products")
        .then((response) => {
          console.log(response.data.data);
          this.dataBook = response.data.data;
        });
    },

    newItem() {
      this.id = "";
      this.postData = { ...this.postDefault };
      this.dialog = true;
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutData();
      } else {
        this.savePostData();
      }
    },
      async savePostData() {
      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/api/v1/products",
          this.postData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(data);
        alert("create success");
        this.getData();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
    async PostOrder() {
      try {
        const { data } = await this.axios.post(
          `http://localhost:3000/api/v1/products/${this.$router.params.id}/orders`,
          this.postData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(data);
        alert("Create Complete");
        this.getData();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
    getData() {
      this.axios
        .get("http://localhost:3000/api/v1/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.dataBook = response.data.data;
        });
    },
  },
};
</script>

<style></style>
