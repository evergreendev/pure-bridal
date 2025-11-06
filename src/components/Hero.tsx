'use client'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface HeroProps {
  images: { id?: string | null | undefined; image?: number | null | Media }[]
  logo?: number | null | Media
}

const Hero = ({ images, logo }: HeroProps) => {
  const [currImage, setCurrImage] = useState(0)
  const imageMax = images.length - 1
  const intervalId = useRef<null | NodeJS.Timeout>(null)

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrImage(currImage + 1 > imageMax ? 0 : currImage + 1)
    }, 4000)

    return () => clearInterval(intervalId.current || '')
  }, [currImage, imageMax])

  return (
    <div className="flex flex-wrap w-full max-w-screen-xl">
      <div className="relative aspect-[120/180] w-full md:w-4/12 overflow-hidden">
        {images.map((image, i) => {
          if (image.image && typeof image.image !== 'number')
            return (
              <div
                key={image.id}
                className={`absolute inset-0 duration-700 transition-opacity ${i === currImage ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
              >
                <Image
                  src={image.image.url || ''}
                  alt={image.image.alt || ''}
                  width={image.image.width || 0}
                  height={image.image.height || 0}
                  className={`z-10 absolute  h-full w-full  object-contain object-center`}
                />
                <Image
                  src={image.image.url || ''}
                  alt={image.image.alt || ''}
                  width={image.image.width || 0}
                  height={image.image.height || 0}
                  className={`z-0 absolute duration-700 h-full w-full transition-opacity object-cover object-center blur-md`}
                />
              </div>
            )
        })}
      </div>
      <div className="bg-brand-linen w-full md:w-8/12 z-20 overflow-hidden shadow flex flex-col justify-center items-center">
        <div className="p-8">
          {logo && typeof logo !== 'number' && 'id' in logo && (
            <Link href="/">
              <Image
                className="w-full max-w-lg mx-auto"
                src={logo.url || ''}
                alt={logo.alt || ''}
                width={logo.width || 0}
                height={logo.height || 0}
              />
            </Link>
          )}
        </div>

        <div className="bg-brand-sand w-full p-8 text-center flex flex-col items-center gap-3 mb-12">
          <div>
            <p>browse our dress brands</p>
            <Button variant="outline">View Brands</Button>
          </div>
          <Link href="/book-an-appointment">
            <Button variant="gold">Book an Appointment</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
