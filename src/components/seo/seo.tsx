import Head from 'next/head';
import React from 'react';

export type SEOProps = {
  title: string;
  description: string;
  canonicalUrl: string;
  schemaOrgJSONLD: object;
  imageUrl?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  twitterUsername?: string;
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  schemaOrgJSONLD,
  imageUrl,
  articlePublishedTime,
  articleModifiedTime,
  twitterUsername,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {articlePublishedTime && (
        <meta
          property="article:published_time"
          content={articlePublishedTime}
        />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {twitterUsername && (
        <meta name="twitter:site" content={`@${twitterUsername}`} />
      )}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Head>
  );
};

export default SEO;
