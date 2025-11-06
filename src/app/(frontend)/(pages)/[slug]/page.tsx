import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { SiteOption } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { Header } from '@/Header/Component'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import Hero from '@/components/Hero'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const siteOptions: SiteOption = (await getCachedGlobal('siteOptions', 1)()) as SiteOption

  const page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout, images } = page

  return (
    <>
      <article>
        <div className="w-full mx-auto bg-brand-green1/20">
          <div className="max-w-screen-xl mx-auto shadow-xl ">
            <PageClient />
            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />
            {images && <Hero images={images} logo={siteOptions.siteLogo}/>}
          </div>
          <div className="bg-white/50">
            <div className="max-w-screen-xl mx-auto w-full p-8">
              <RenderBlocks blocks={layout} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

// @ts-ignore
export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
