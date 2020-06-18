// @ts-nocheck

import React from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'

const Link: React.FC<
    LinkProps<any> & {
        absolute?: boolean
        external?: boolean
    }
> = React.forwardRef(
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
            to = `${process.env.PUBLIC_URL}${to}`
        }
        return (
            <RouterLink ref={ref} {...props} to={to}>
                {children}
            </RouterLink>
        )
    },
)

export default Link
