import { describe, it, expect, afterEach } from 'vitest'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mount } from '@vue/test-utils'
import Settings from '../../src/components/SettingsComponent.vue'

describe('Settings component', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    });

    it('renders with user information text components', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.html()).toContain("Your information")
        await expect(wrapper.html()).toContain("Email:")
        await expect(wrapper.html()).toContain("First name:")
        await expect(wrapper.html()).toContain("Last name:")
        await expect(wrapper.html()).toContain("Phone number:")
        await expect(wrapper.html()).toContain("Household:")
    })

    it('renders the correct information', async () => {
        const email = 'test@test.com'
        const firstname = 'John'
        const lastname = 'Doe'
        const phone = '12345678'
        const household = '4'
        localStorage.setItem('email', email)
        localStorage.setItem('firstname', firstname)
        localStorage.setItem('lastname', lastname)
        localStorage.setItem('phone', phone)
        localStorage.setItem('household', household)
        const wrapper = mount(Settings)
        await expect(wrapper.find('#first-name-display').text()).toBe(firstname)
        await expect(wrapper.find('#last-name-display').text()).toBe(lastname)
        await expect(wrapper.find('#phone-number-display').text()).toBe(phone)
        await expect(wrapper.find('#household-display').text()).toBe(household)
    })

    it('changes the "change" variable on click of the info-button', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.change).toBe(false)
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.change).toBe(true)
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.change).toBe(false)
    })

    it('changes the "editing" variable on click of the info-button', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.editing).toBe(false)
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.editing).toBe(true)
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.editing).toBe(false)
    })

    it('changes the "picked" variable on click of the info-button', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.picked).toBe('Change your information')
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.picked).toBe('Save your new information')
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.picked).toBe('Change your information')
    })

    it('validates the first name field correctly', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.nameValid).toBe(false)
        await expect(wrapper.vm.checkName('John')).toBe(true)
        await expect(wrapper.vm.nameValid).toBe(true)
        await expect(wrapper.vm.checkName('')).toBe('First name cannot be empty.')
        await expect(wrapper.vm.nameValid).toBe(false)
    })

    it('validates the last name field correctly', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.lastNameValid).toBe(false)
        await expect(wrapper.vm.checkLastName('Doe')).toBe(true)
        await expect(wrapper.vm.lastNameValid).toBe(true)
        await expect(wrapper.vm.checkLastName('')).toBe('Last name cannot be empty.')
    })

    it('validates the phone number field correctly', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.phoneValid).toBe(false)
        await expect(wrapper.vm.checkPhoneNumber('12345678')).toBe(true)
        await expect(wrapper.vm.phoneValid).toBe(true)
        await expect(wrapper.vm.checkPhoneNumber('')).toBe('Number must be 8 digits.')
    })

    it('validates the household field correctly', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.householdValid).toBe(false)
        await expect(wrapper.vm.checkHousehold('4')).toBe(true)
        await expect(wrapper.vm.householdValid).toBe(true)
        await expect(wrapper.vm.checkHousehold('')).toBe('There must be at least 1 household member.')
    })
})
