'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const MobileNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="text-2xl uppercase" />
      })}
    </nav>
  )
}
