import React from 'react'
import Header from '../components/Header.tsx'
import MainSubLayout from './MainSubLayout.tsx'
import MainNav from '../components/MainNav.tsx'

function MainLayout({
	children,
	className,
}: React.PropsWithChildren<{ className: string }>) {
	return (
		<div className={className}>
			<MainNav />
			<Header />
			<MainSubLayout>{children}</MainSubLayout>
		</div>
	)
}

export default MainLayout
