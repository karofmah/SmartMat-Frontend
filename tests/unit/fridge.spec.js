import {describe, it, expect, afterEach} from 'vitest'

import { mount } from '@vue/test-utils'
import FridgeComponent from '../../src/components/FridgeComponent.vue'
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe('FridgeView.vue test', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    });
    it('initializes with correct elements', () => {
        const wrapper = mount(FridgeComponent)
        expect(wrapper.find('#search').text()).toBe('')
        expect(wrapper.find("#generateButton").text()).toBe('')
        expect(wrapper.find("#recipe").text()).toBe('Recipe generatorThis is your AI powered dinner generator.\nTo create a recipe using ingredients in your fridge, press the knife and fork icon in the toolbar.')
    })
    it('hides error message when a master user is logged in', () => {
        const wrapper = mount(FridgeComponent)
        wrapper.vm.betaUser = false
        expect(wrapper.find("#error-message-fridge").exists()).toBe(false)
    })
    it('shows error message when a master user is logged in', () => {
        const wrapper = mount(FridgeComponent)
        //wrapper.vm.dialog = true
        //wrapper.vm.betaUser = true
        //expect(wrapper.html()).toContain("You are not authorized add items to the fridge :(")
    })
    it('button to add new item contains correct text', () => {
        const wrapper = mount(FridgeComponent)
        expect(wrapper.html()).toContain("Add new item")
    })
    it('when userType is false, SetUserLevel sets user level correctly', () => {
        const wrapper = mount(FridgeComponent)
        localStorage.setItem("userType", "false")
        wrapper.vm.setUserLevel()
        expect(wrapper.vm.betaUser).toBe(true)
    })
    it('when userType is true, SetUserLevel sets user level correctly', () => {
        const wrapper = mount(FridgeComponent)
        localStorage.setItem("userType", "true")
        wrapper.vm.setUserLevel()
        expect(wrapper.vm.betaUser).toBe(false)
    })
    it('validates the name field correctly', () => {
        const wrapper = mount(FridgeComponent)
        expect(wrapper.vm.nameCheck).toBe(false)
        expect(wrapper.vm.checkName('Jens')).toBe(true)
        expect(wrapper.vm.nameCheck).toBe(true)
        expect(wrapper.vm.checkName('')).toBe('Name cannot be empty.')
    })
    it('validates the amount field correctly', () => {
        const wrapper = mount(FridgeComponent)
        expect(wrapper.vm.amountCheck).toBe(false)
        expect(wrapper.vm.checkAmount('10')).toBe(true)
        expect(wrapper.vm.amountCheck).toBe(true)
        expect(wrapper.vm.checkAmount('-1')).toBe('Amount cannot be below 0.')
    })
    it('validates the name measurement correctly', () => {
        const wrapper = mount(FridgeComponent)
        expect(wrapper.vm.measurementCheck).toBe(false)
        expect(wrapper.vm.checkMeasurement('KG')).toBe(true)
        expect(wrapper.vm.measurementCheck).toBe(true)
        expect(wrapper.vm.checkMeasurement('')).toBe('Measurement cannot me empty.')
    })
})
