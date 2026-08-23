import React from 'react'
import Header from '../components/Header.tsx'
import MainSubLayout from './MainSubLayout.tsx'
import MainNav from '../components/MainNav.tsx'

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
