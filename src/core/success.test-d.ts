import { success, type Exception, type Success } from './index.js'
import { describe, expectTypeOf, test } from 'vitest'

describe('success', () => {
	test('should infer the correct return type - string', () => {
		const result = success('data')

		expectTypeOf(result()).toEqualTypeOf<string>()
	})

	test('should infer the correct return type - void', () => {
		const result = success()

		expectTypeOf(result()).toEqualTypeOf<undefined>()
	})

	test('should infer the correct return type - void fn', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		type ReturnsResult<T = unknown> = (...args: any[]) => Success<T> | Exception<Error>
		const fn = (() => success()) satisfies ReturnsResult
		// const fn: ReturnsResult = () => success() // This also fails

		expectTypeOf(fn()()).toEqualTypeOf<undefined>()
	})
})
