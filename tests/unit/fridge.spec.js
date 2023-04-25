import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FridgeComponent from '../../src/components/FridgeComponent.vue'

describe('FridgeView.vue test', () => {
    it('initializes with correct elements', () => {
        const wrapper = mount(FridgeComponent)
        expect(wrapper.find('#search').text()).toBe('')
        expect(wrapper.find("#generateButton").text()).toBe('Generate recipe')
        expect(wrapper.find("#recipe").text()).toBe('')
    })
    it('generates recipe when generateButton is pressed', () => {
        const wrapper = mount(FridgeComponent)
        expect(wrapper.find("#recipe").text()).toBe('')
        wrapper.find('#generateButton').trigger('click')
        expect(wrapper.vm.recipe).toBe('This is a test recipe')
    })
    it('can search for item', () => {
    })
})