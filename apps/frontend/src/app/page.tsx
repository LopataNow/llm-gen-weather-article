import { unstable_cache } from "next/cache";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getArticle } from "./calls/weather-article-gen";

const getArticleCache = unstable_cache(
  async (style: string, date: Date) => {
    return await getArticle(style, date).then((res) => res.data);
  },
  ["posts"],
  { revalidate: 3600 * 48, tags: ["posts"] },
);

export default async function Home(props: {
  searchParams?: Promise<{
    style?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const style = searchParams?.style || "fantastic";
  const article = await getArticleCache(style, new Date());

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-center space-x-4">
        <Link href="/?style=fantastic">
          <Button>fantastic</Button>
        </Link>
        <Link href="/?style=tabloids">
          <Button>tabloids</Button>
        </Link>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold">{article.headline}</h1>
        <h2 className="mb-4 text-xl font-semibold">{article.subtitle}</h2>
        <section className="text-gray-700">{article.body}</section>
      </div>
    </div>
  );
}
