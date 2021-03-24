import React from 'react'
import { ShapeList } from './ShapeList'

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h1 className="sidebar__title">Figuras dibujadas</h1>
            <ShapeList />
        </aside>
    )
}
