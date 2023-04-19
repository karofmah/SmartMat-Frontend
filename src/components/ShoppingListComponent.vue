<template>
    <div id="container">
        <div id="header">
            <div id="text">
                <h1>Shopping List</h1>
            </div>
        </div>
        <div id="lists">
            <u1>
                <li v-for="(list, index) in lists" :key="index">
                    {{ list }}
                    <v-btn density="default" icon="mdi-delete" v-on:click="removeList(index)"></v-btn>
                </li>
            </u1>
        </div>
        <div id="input">
            <input 
                type="text"
                placeholder="Add food"
                v-model="currentList"
                v-on:keyup.enter="addlist"
            />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lists: ["Bread", "Cheese", "Ham"],
                currentLists: ""
            }
        },
        methods: {
            addlist() {
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
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 150px;
    }

</style>