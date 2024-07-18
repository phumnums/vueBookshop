<template>
  <v-container fluid>
    <v-row justify="center" class="my-5">
      <v-col cols="12" md="8">
        <h1 class="text-center">STORE</h1>
        <v-row>
          <v-col
            v-for="(item, index) in dataBook"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            
          >
            <v-card class="mx-auto my-5" max-width="300">
              <v-img height="300" :src="item.product_image"></v-img>

              <v-card-title>
                {{ item.product_name }}
              </v-card-title>

              <v-card-text class="flex-grow-1">
                <div
                  class="justify-space-between"
                  
                >
                  <p>Price: {{ item.price }}฿</p>
                  <p>Stock: {{ item.amount }}</p>
                </div>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn
                  color="black"
                  text
                  @click="$router.push(`/product/${item._id}`)"
                >
                  Add to cart
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
        product_image: "",
        product_name: "",
        price: "",
        amount: "",
      },
      postDefault: {
        product_image: "",
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

<style>
.mt-5 {
  margin-top: 5rem;
}

.d-flex {
  margin-left: 5px;
}
</style>
