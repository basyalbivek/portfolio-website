import Head from 'next/head'

export default function SEO({title, description, image, url}){
  const siteTitle = title ? `${title} — Portfolio` : 'Portfolio'
  return (
    <Head>
      <title>{siteTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={siteTitle} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content={image? 'summary_large_image':'summary'} />
    </Head>
  )
}
