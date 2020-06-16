import React from 'react'
import Header from '../components/Header'
import MainSubLayout from './MainSubLayout'
import MainNav from '../components/MainNav'

const MainLayout: React.FC<{ className: string }> = ({
    children,
    className,
}) => {
    return (
        <div className={className}>
            <MainNav />
            <Header />
            <MainSubLayout>{children}</MainSubLayout>
        </div>
    )
}

export default MainLayout
