import slugify from 'slugify';
import { prisma } from '../../../lib/prisma';
const MAX_ATTEMPTS = 100;
const MAX_SLUG_LENGTH = 255; 

const generateSlug = (text: string, maxLength: number = 240) => {
  if (!text.trim()) throw new Error('Title cannot be empty');
  
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return slug.substring(0, maxLength);
};


export const generateUniqueSlug = async (title: string) => {

  const baseSlug = generateSlug(title, MAX_SLUG_LENGTH - 10);

  let slug = baseSlug;
  let attempt = 1;

  while (attempt <= MAX_ATTEMPTS) {
    const existing = await prisma.professional.findFirst({ 
      where: { slug },
      select: { id: true } 
    });

    if (!existing) return slug;

    slug = `${baseSlug}-${attempt++}`;

    if (slug.length > MAX_SLUG_LENGTH) {
      const overflow = slug.length - MAX_SLUG_LENGTH;
      slug = `${baseSlug.substring(0, baseSlug.length - overflow)}-${attempt}`;
    }
  }

  throw new Error(`Failed to generate unique slug after ${MAX_ATTEMPTS} attempts`);
};