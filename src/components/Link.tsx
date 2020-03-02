// @ts-nocheck

import React from 'react'
import { Link as ReachLink, LinkProps } from '@reach/router'

const BASE = process.env.PUBLIC_URL

const Link: React.FC<LinkProps<any> & {
    absolute?: boolean
    external?: boolean
}> = React.forwardRef(
    ({ to = '', children, absolute, external, ...props }, ref) => {
        if (external) {
            return (
                <a
                    href={to}
                    ref={ref}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {children}
                </a>
            )
        }

        if (!absolute && to[0] === '/') {
            to = `${BASE}${to}`
        }
        return (
            <ReachLink ref={ref} {...props} to={to}>
                {children}
            </ReachLink>
        )
    },
)

export default Link
