<template>
  <div class="text-center">
    <v-menu
        open-on-click
        :close-on-content-click="false"
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
                    <v-text-field type="text" :items="items" :readOnly="true">{{name}}</v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  ><div ><v-radio-group inline v-model="waste">
                    <v-radio
                        id="throw-radiobutton"
                        label="Throw:("
                        value="true"
                    >
                    </v-radio>
                    <v-radio
                        id="eat-radiobutton"
                        label="Eaten:)"
                        value="false"
                    >
                    </v-radio>
                  </v-radio-group></div>

                  </v-col>
                  <v-col
                      cols="12"
                  ><v-text-field
                      label="Amount*"
                      :rules="[ checkAmount ]"
                      v-model="amount"
                  ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
              <div><small v-if="error" class="error-message">*all required fields are not filled</small></div>
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
                  @click="removeItem"
              >
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-dialog
            v-model="addToShoppingList"
            persistent
            width="auto"
        >
          <v-card>
            <v-card-title class="text-h5">
              Add to shopping list
            </v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-text>Do you want to add {{ name }} to your shopping list?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="no"
              >
                No
              </v-btn>
              <v-btn
                  color="green-darken-1"
                  variant="text"
                  @click="yes"
              >
                Yes
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
          <div id="itemInfo"><div id="itemName"><v-list-item-title>{{ item.item.name }}</v-list-item-title></div><div id="ThrowButton"><v-btn id="removeItem" @click="(dialog = true) && (this.name = item.item.name)" variant="text" size="large" density="compact" icon="mdi-delete"></v-btn></div></div>
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
      name: null,
      waste: "true",
      amount: null,
      items: null,
      dialog: false,
      message: null,
      addToShoppingList: false,
      error: false,
      amountCheck: false
    }
  },
  methods: {
    no(){
      this.dialog = false
      this.addToShoppingList = false
    },
    yes(){
      this.dialog = false
      this.addToShoppingList = false
    },
    async getAllItemsByCategory(){
      this.items = await fridgeService.getAllItemsByCategory(1, this.id)
    },
    async removeItem() {
      if (this.amountCheck) {
        this.error = false
        const item = {
          "itemName": this.name,
          "refrigeratorId": "1",
          "amount": this.amount,
          "measurementType": "KG"
        }
        this.message = await fridgeService.deleteItem(item, this.waste)
        this.addToShoppingList = true
      } else {
        this.error = true
      }

    },
    checkAmount(value){
      if (value > 0) {
        this.amountCheck = true;
        return true
      } else {
        this.amountCheck = false;
        return 'Amount cannot be below 0.'
      }
    }
  },
  created(){
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
  width: 100%;
  max-width: 300px;
}

#itemName{
  float: left;
}

#ThrowButton{
  float: right;
}

</style>
