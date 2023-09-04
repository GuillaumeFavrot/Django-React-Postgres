import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../state/store'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		...renderOptions
	} = {}
	) {

	setupListeners(store.dispatch);

	function Wrapper({ children }: { children: React.ReactNode }) {
			return <Provider store={store}>{children}</Provider>
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}