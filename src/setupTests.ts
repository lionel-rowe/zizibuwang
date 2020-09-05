// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { TextEncoder, TextDecoder } from 'util'

interface Window {
    TextEncoder: typeof TextEncoder
    TextDecoder: typeof TextDecoder
}

const global_ = global as NodeJS.Global & Window

global_.TextEncoder = TextEncoder
global_.TextDecoder = TextDecoder
