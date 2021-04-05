import React from 'react'
import { Provider } from 'react-redux'
import { Blackboard } from './components/Blackboard'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { store } from './store/store'

export const Garabatos = () => {

    return (

        <Provider store={store}>
            <main className="container">
                <Header />
                <Sidebar />
                <Blackboard />
            </main>
        </Provider>
    )
}
