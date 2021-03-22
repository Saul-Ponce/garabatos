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
                    <ShapeButton icon="line" maxPoints={2} />
                    <ShapeButton icon="square" maxPoints={2} />
                    <ShapeButton icon="triangle" maxPoints={3} rotate={true} />
                    <ShapeButton icon="circle" maxPoints={4} />
                </div>
            </div>
        </header>
    )
}
