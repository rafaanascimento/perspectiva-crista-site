import authors from '../data/authors.json';

const FALLBACK_AUTHOR = {
  name: 'Autor',
  avatar: '/images/og-default.png',
  role: 'Equipe Perspectiva Cristã',
  bio: 'Conteúdo editorial do Perspectiva Cristã.'
};

export const getPostSlug = (post: { id: string; data: { slug?: string } }) =>
  post.data.slug?.trim() || post.id;

export const getCoverPath = (cover?: string) => {
  if (!cover?.trim()) return '/images/og-default.png';
  return cover.startsWith('/') ? cover : `/${cover}`;
};

export const getAuthorName = (authorId?: string) =>
  authors.find((author) => author.id === authorId)?.name ?? FALLBACK_AUTHOR.name;

export const getAuthorProfile = (authorId?: string) =>
  authors.find((author) => author.id === authorId) ?? FALLBACK_AUTHOR;


export const slugifyTerm = (value: string) =>
  value.toLowerCase().trim().replaceAll(/\s+/g, '-');
