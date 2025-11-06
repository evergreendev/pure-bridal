'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ header: HeaderType, centerNav:boolean }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex gap-3 items-center mx-auto">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="text-lg uppercase text-brand-primary" />
      })}
    </nav>
  )
}
