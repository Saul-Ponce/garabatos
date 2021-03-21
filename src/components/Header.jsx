import React from 'react'
import { ShapeButton } from './ShapeButton'

export const Header = () => {
    return (
        <header className="header">
            <div className="header__shapes">
                <ShapeButton icon="line"/>
                <ShapeButton icon="square"/>
                <ShapeButton icon="triangle" rotate={true}/>
                <ShapeButton icon="circle" />
            </div>
        </header>
    )
}
