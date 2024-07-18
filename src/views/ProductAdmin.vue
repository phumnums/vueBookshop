<template>
  <v-container fluid>
    <v-row justify="center" class="my-5">
      <v-col cols="12" md="8">
        <v-btn 
        right
        absolute
        color="#EEEEEE" @click="newItem()">New Item</v-btn>
        <div>
          <v-row>
            <v-col
              v-for="(item, index) in dataBook"
              :key="index"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card class="mx-10 my-5" width="250">
                <v-img
                  height="300"
                  width="250"
                  :src="item.product_image"
                ></v-img>

                <v-card-title>
                  {{ item.product_name }}
                </v-card-title>

                <v-card-text>
                  <div style="display: flex; justify-content: space-between">
                    <p>Price: {{ item.price }}฿</p>
                    <p>Stock: {{ item.amount }}</p>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="#A5D6A7" @click="editItem(item)">Edit</v-btn>
                  <v-btn color="#EF9A9A" @click="delItem(item._id)">Del</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              {{ savemode }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="postData.product_image"
                    label="Product Image"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="postData.product_name"
                    label="Product Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="postData.price"
                    label="Price"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="postData.amount"
                    label="Amount"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialog = false"> Close </v-btn>
              <v-btn color="blue darken-1" text @click="saveSelect()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    editItem(item) {
      this.id = item._id;
      this.postData = { ...item };
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

    async savePutData() {
      try {
        const { data } = await this.axios.put(
          `http://localhost:3000/api/v1/products/${this.id}`,
          this.postData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(data);
        alert("update success");
        this.getData();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
    async delItem(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        try {
          const { data } = await this.axios.delete(
            `http://localhost:3000/api/v1/products/${item}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          console.log(data);
          alert("delete success");
          this.getData();
        } catch (error) {
          console.log(error);
          alert("error");
        }
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
