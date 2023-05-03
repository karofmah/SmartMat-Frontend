import { describe, it, expect, afterEach } from 'vitest'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mount } from '@vue/test-utils'
import Settings from '../../src/components/SettingsComponent.vue'
import Login from "@/components/LoginComponent.vue";

describe('Settings component', () => {
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    });

    it('renders the input fields', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.find('#first-name-input').exists()).toBe(true)
        await expect(wrapper.find('#last-name-input').exists()).toBe(true)
        await expect(wrapper.find('#phone-number-input').exists()).toBe(true)
        await expect(wrapper.find('#household-input').exists()).toBe(true)
    })

    it('changes the "change" variable on click of the info-button', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.change).toBe(false)
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.change).toBe(true)
        //await wrapper.find('#info-button').trigger('click')
        //await expect(wrapper.vm.change).toBe(false)
    })

    it('changes the "editing" variable on click of the info-button', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.editing).toBe(false)
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.editing).toBe(true)
        //await wrapper.find('#info-button').trigger('click')
        //await expect(wrapper.vm.editing).toBe(false)
    })

    it('changes the "picked" variable on click of the info-button', async () => {
        const wrapper = mount(Settings)
        await expect(wrapper.vm.picked).toBe('Change your information')
        await wrapper.find('#info-button').trigger('click')
        await expect(wrapper.vm.picked).toBe('Save your new information')
        //await wrapper.find('#info-button').trigger('click')
        //await expect(wrapper.vm.picked).toBe('Change your information')
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

    it('add new subuser', async () => {
        const wrapper = mount(Settings)
        wrapper.vm.email = "test@example.com"
        wrapper.vm.username = "John Doe"
        wrapper.vm.userType = "true"
        //await wrapper.vm.getSubusers()
        //const numberOfSubusers = wrapper.vm.users.length
        //const addNewUser = wrapper.find('#addNewSubuserButton');
        //await addNewUser.trigger('click');

        mock.onGet('http://localhost:8080/api/subusers/getUsersFromMaster?email='+wrapper.vm.email).reply(config => {
            const { email, password } = JSON.parse(config.data)

            if (email === 'test@example.com' && password === 'password123') {
                return [200, { token: 'mock_token' }]
            } else {
                return [401, 'Invalid email or password']
            }
        })

        mock.onPost('http://localhost:8080/api/subusers/addSubUser').reply(config => {
            const { email, password } = JSON.parse(config.data)

            if (email === 'test@example.com' && password === 'password123') {
                return [200, { token: 'mock_token' }]
            } else {
                return [401, 'Invalid email or password']
            }
        })

        await wrapper.vm.addSubuser()
        expect(wrapper.vm.dialog).toBe(false);
    })
})
