import {MetadataRoute} from 'next';
import {projects} from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap{return [{url:'https://optimistotaku.tech',changeFrequency:'monthly',priority:1},...projects.map(p=>({url:`https://optimistotaku.tech/projects/${p.slug}`,changeFrequency:'monthly' as const,priority:.8}))]}
