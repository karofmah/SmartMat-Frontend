import {describe, it, expect, afterEach} from 'vitest'

import { mount } from '@vue/test-utils'
import ShoppingListComponent from '../../src/components/ShoppingListComponent.vue'
import shoppingListService from "@/services/shoppingListService";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe('ShoppingListView.vue test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    });

    it('initializes with correct elements', () => {
        const wrapper = mount(ShoppingListComponent)
        expect(wrapper.find('#shoppinglist-title').text()).toBe('Shopping list')
        expect(wrapper.find("#input").text()).toBe('')
        expect(wrapper.find("#shoppinglist-tooltip").text()).toBe('Add selected items to fridge')

    })

    it('correctly getting list of all items', async () => {
        const wrapper = mount(ShoppingListComponent)

        const mockList = [
            { name: 'eggs', categoryId: 1 },
            { name: 'milk', categoryId: 1 },
            { name: 'cheese', categoryId: 1 },
        ];
        mock.onGet('http://localhost:8080/api/items/getAllItems').reply(200, mockList);
        await wrapper.vm.getAllItems()
        expect(wrapper.vm.allItems).toEqual(['eggs', 'milk', 'cheese']);
    })
})
