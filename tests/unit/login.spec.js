import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LoginView from '../../src/views/LoginView.vue'

describe('Login page', () => {
    it('renders with input when opened', () => {
        const wrapper = mount(LoginView)
        const emailInput = wrapper.find('#email-input')
        const passwordInput = wrapper.find('#password-input')
        expect(emailInput.element.textContent).toBe('')
        expect(passwordInput.element.textContent).toBe('')
    })
})
