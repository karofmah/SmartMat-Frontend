import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ShoppingListComponent from '../../src/components/ShoppingListComponent.vue'

describe('ShoppingListView.vue test', () => {
    it('initializes with correct elements', () => {
        const wrapper = mount(ShoppingListComponent)
        expect(wrapper.find('#shoppinglist-title').text()).toBe('Shopping list')
        expect(wrapper.find("#input").text()).toBe('')
        expect(wrapper.find("#shoppinglist-tooltip").text()).toBe('Add selected items to fridge')

    })
    it('removeList removes item from list when called', () => {
        const wrapper = mount(ShoppingListComponent)
        //wrapper.vm.removeList()

    })
    it('addlist adds items to list correctly when called', () => {
        const wrapper = mount(ShoppingListComponent)
        //wrapper.vm.addList()
    })
})