'use client';

import { InView } from 'react-intersection-observer';
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/spinner";
import Title from '@/components/Post/Title';
import usePosts from '@/hooks/usePosts';
import { Issues } from '@/types';

// Turn markdown into plain text for the 5-line preview
function toPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/<[^>]+>/g, ' ') // html tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '') // headings, quotes, lists
    .replace(/[*_~`]+/g, '') // emphasis, inline code
    .replace(/\s+/g, ' ')
    .trim();
}

export default function Posts({ data }: { data: Issues }) {
  const { posts, noMorePosts, loadMore } = usePosts(data);

  return (
    <div className="flex flex-col gap-12">
      {posts.map((post) => (
        <article key={post.id} className="grid gap-3">
          <Link href={`post/${post.number}`}>
            <Title title={post.title} createdAt={post.created_at} />
          </Link>
          <p className="line-clamp-5">{toPlainText(post.body ?? '')}</p>
          <Link
            href={`post/${post.number}`}
            underline="always"
            className="w-fit"
          >
            Read more
          </Link>
        </article>
      ))}
      <InView
        onChange={(inView: boolean) => {
          if (!inView) {
            return;
          }

          loadMore();
        }}
      >
        {({ ref }) =>
          noMorePosts ? null : (
            <Spinner ref={ref} color="primary" role="status" />
          )
        }
      </InView>
    </div>
  );
}
