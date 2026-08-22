import Image from 'next/image';
import Link from 'next/link';

import type { BlogItem as Blog } from '@/lib/content-types';

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link className="blog-card" data-reveal href={`/blogs/${blog.slug}`}>
      <Image
        src={blog.image.src}
        alt={blog.image.alt}
        width={blog.image.width}
        height={blog.image.height}
        sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
      />
      <span className="practice-card-shade"></span>
      <span className="num">{blog.series}</span>
      <div>
        <h3>{blog.title}</h3>
        <span className="text-link">
          Read the brief <span>→</span>
        </span>
      </div>
    </Link>
  );
}
