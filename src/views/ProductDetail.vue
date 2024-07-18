<template>
  <v-container fluid>
    <v-col>
      <v-row>
        <v-row>
          <v-col>
            <v-card class="mx-auto my-12" max-width="374">
              <v-img height="400" :src="dataBook.product_image" cover></v-img>

              <v-card-item>
                <v-card-title>{{ dataBook.product_name }}</v-card-title>

                <v-card-subtitle>
                  <span class="me-1"
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odio dolorum illo totam expedita obcaecati magni eos fuga,
                    ex explicabo officia nobis ab maxime at! Eius perspiciatis
                    temporibus eaque numquam unde aut pariatur provident
                    veritatis sapiente non animi saepe sed magnam commodi rerum,
                    dolor doloremque velit dolorem vel facere. Non, iste.</span
                  >
                </v-card-subtitle>
              </v-card-item>

              <v-divider class="mx-4 mb-1"></v-divider>

              <v-card-actions>
                <v-btn
                  color="deep-purple-lighten-2"
                  block
                  border
                  @click="newOrder()"
                  >Add order</v-btn
                >
              </v-card-actions>
            </v-card>

            <v-dialog v-model="dialog" persistent max-width="600">
              <v-card>
                <v-card-title>
                  {{ savemode }}
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <!-- <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="orderData.customer_id"
                    label="Customer ID"
                  ></v-text-field>
                </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="orderData.quantity"
                        label="Quantity"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="savePostData">
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "BookShop",
      dataBook: {},
      dialog: false,
      id: "",
      orderData: {
        customer_id: this.$route.params.id,
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
      return this.id == "" ? "New Order" : "Edit Item";
    },
  },
  created() {
    this.getProductID();
  },
  methods: {
    newOrder() {
      this.id = "";
      this.orderData = { ...this.orderDefault };
      this.dialog = true;
    },
    getProductID() {
      this.axios
        .get(`http://localhost:3000/api/v1/products/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.dataBook = response.data.data;
        });
    },
    async savePostData() {
      try {
        const productId = this.$route.params.id;
        const token = localStorage.getItem("access_token");
        if (!token) {
          alert("No token found");
          return;
        }
        if (!productId) {
          throw new Error("Product ID not found");
        }
        if (!this.orderData.quantity) {
          throw new Error("Quantity is required");
        }
        const { data } = await this.axios.post(
          `http://localhost:3000/api/v1/products/${productId}/orders`,
          this.orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        alert("Add Order Complete");
        this.dialog = false;
        this.$router.push("/home");
      } catch (error) {
        console.error(error);
        alert(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },

    // async savePostData() {
    //   try {
    //     const { data } = await this.axios.post(
    //       `http://localhost:3000/api/v1/products/${this.$router.params.id}/orders`,
    //       this.orderData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //         },
    //       });
    //     console.log(data);
    //     alert("Add Order Complete");
    //     // this.getProductID();
    //   } catch (error) {
    //     console.log(error);
    //     alert('error')
    //   }
    // },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
