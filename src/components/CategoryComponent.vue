<template>
  <div class="text-center">
    <v-menu
        open-on-click
    >
      <template v-slot:activator="{ props }">
        <v-btn
            color="green"
            v-bind="props"
            id="category-button"
        >{{ desc }}
        </v-btn>
      </template>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            width="400"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Remove item</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                  >
                    <v-text-field type="text" placeholder="Selected food" :items="items" v-model="selectedItem"></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  ><div ><v-radio-group inline>
                    <v-radio
                        id="throw-radiobutton"
                        label="Throw"
                        value="Throw"
                    >
                    </v-radio>
                    <v-radio
                        id="eat-radiobutton"
                        label="Eaten"
                        value="Eaten"
                    >
                    </v-radio>
                  </v-radio-group></div>

                  </v-col>
                  <v-col
                      cols="12"
                  ><v-text-field
                      label="Amount*"
                      :rules="[]"
                  ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click=""
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
        >
          <div id="itemInfo"><v-list-item-title>{{ item.name }}</v-list-item-title><v-btn id="removeItem" @click="dialog = true">Remove</v-btn></div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import fridgeService from "@/services/fridgeService";
export default {
  props: {
    id: Number,
    desc: String,
  },
  data(){
    return {
      items: null,
      dialog: false
    }
  },
  methods: {
    async getAllItemsByCategory(){
      this.items = await fridgeService.getAllItemsByCategory(this.id)
    },
    removeItem() {
    }
  },
  beforeMount(){
    this.getAllItemsByCategory()
  }
}
</script>

<style>
.text-center {
  display: inline-block;
  margin-right: 20px;
  min-width: 140px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 18px;
}

#category-button {
  width: 150px;
}

#removeItem {
  float: right;
  margin-left: 10px;

}

#itemInfo {
  display: flex;
  width: 100%;
  max-width: 200px;
}

</style>
