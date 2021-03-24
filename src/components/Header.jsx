import React from 'react'
import { ShapeButton } from './ShapeButton'
import {shapesList} from '../helpers/shapesList'
export const Header = () => {
    return (
        <header className="header">
            <div className="header__shapes">
                <p className="header__shapes-title">
                    Figuras
                </p>
                <div className="header__shapes-container">
                    <ShapeButton shape={shapesList.line} maxPoints={2} />
                    <ShapeButton shape={shapesList.square} maxPoints={2} />
                    <ShapeButton shape={shapesList.right_triangle} maxPoints={2} />
                    <ShapeButton shape={shapesList.triangle} maxPoints={3} rotate={true} />
                    <ShapeButton shape={shapesList.circle} maxPoints={4} />
                </div>
            </div>
        </header>
    )
}
