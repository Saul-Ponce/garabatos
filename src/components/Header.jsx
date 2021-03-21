import React from 'react'
import { ShapeButton } from './ShapeButton'

export const Header = () => {
    return (
        <header className="header">
            <div className="header__shapes">
                <p className="header__shapes-title">
                    Figuras
                </p>
                <div className="header__shapes-container">
                    <ShapeButton icon="line" />
                    <ShapeButton icon="square" />
                    <ShapeButton icon="triangle" rotate={true} />
                    <ShapeButton icon="circle" />
                </div>
            </div>
        </header>
    )
}
