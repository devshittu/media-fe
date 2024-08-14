import { Metadata } from 'next';
import { useParams } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const res = await fetch(`https://api.example.com/news/${params.id}`);
  const news = await res.json();

  return {
    title: news.title,
    description: news.summary,
    openGraph: {
      images: [{ url: news.image, alt: news.title }],
    },
  };
};

export default function NewsPage() {
  const { storyId } = useParams();
  // Fetch the news article and render it
  return <div>{'News article content '}</div>;
}
