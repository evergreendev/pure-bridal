'use client'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { HeaderNav } from './Nav'
import { MobileNav } from '@/Header/Nav/MobileNav'
import { Menu,  XCircle} from 'lucide-react'
import { usePathname } from 'next/navigation'

interface HeaderClientProps {
  header: Header
  logo: Media
  lightLogo?: Media
  centerNav: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  header,
  logo,
  lightLogo,
  centerNav,
}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`hidden md:block sticky transition-colors top-0 z-50 ${!centerNav || hasScrolled ? 'bg-brand-linen text-brand-primary border-b border-brand-primary' : ''}`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container relative z-20 py-2 flex justify-between text-3xl ">
{/*          <Link href="/" className={`w-24 ${centerNav ? 'hidden' : ''}`}>
            <Logo logo={logo} lightLogo={lightLogo} theme={headerTheme} />
          </Link>*/}
          <HeaderNav header={header} centerNav={centerNav} />
        </div>
      </header>
      <header className={`md:hidden`}>
        <button
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
          className="fixed z-50 top-4 right-4"
        >
          {mobileNavIsOpen ?
            <XCircle className="w-5 text-primary"/>
           : <Menu className="w-5 text-primary" />
          }
        </button>
        <div
          className={`fixed transition-transform inset-0 bg-brand-blue z-40 bg-opacity-95 ${mobileNavIsOpen ? '' : '-translate-x-full'}`}
        >
          <MobileNav header={header} />
        </div>
      </header>
    </>
  )
}
