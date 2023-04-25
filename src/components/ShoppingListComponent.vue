<template>
    <v-container id="container">
        <v-row justify="space-around">
            <v-card class="mx-auto" width="400">
                <v-toolbar color="secondary">
                    <v-toolbar-title id="shoppinglist-title">Shopping list</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-fridge</v-icon>
                        <v-tooltip id="shoppinglist-tooltip" activator="parent" location="start">Add selected items to fridge</v-tooltip>
                    </v-btn>
                </v-toolbar>
                <div id="lists">
                    <v-list id="itemList">
                        <v-list-item v-for="(list, index) in lists" :key="index" :title="list">
                            <template v-slot:append>
                                <v-btn id="trash" variant="text" size="large" density="compact" icon="mdi-delete" v-on:click="removeList(index)"></v-btn>
                            </template>
                            <template v-slot:prepend="{ isActive }">
                                <v-list-item-action start>
                                    <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </v-list>
                </div>
                <div id="input">
                    <v-combobox
                        id="add-to-cart"
                        type="text"
                        label="Add food"
                        clearable
                        :items="lists"
                        v-model="currentList"
                        v-on:keyup.enter="addList"
                    />
                </div>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                lists: ["Bread", "Cheese", "Ham"],
                currentLists: "",
                currentList:[]
            }
        },
        methods: {
            addList() {
                this.lists.push(this.currentList);
                this.currentList = "";
            },
            removeList(index) {
                this.lists.splice(index, 1);
            }
        }
    }
</script>

<style>
    #container{
        margin-top: 150px;
    }

</style>