import classNames from '@zyzle-dev/lib/classNames';
import Image from 'next/image';

import AboutSVG from '../../public/about.svg';
import BlogSVG from '../../public/blog.svg';
import BySVG from '../../public/by.svg';
import CCSVG from '../../public/cc.svg';
import CharactersSVG from '../../public/characters.svg';
import MoneySVG from '../../public/money.svg';
import ProjectsSVG from '../../public/projects.svg';
import SASVG from '../../public/sa.svg';
import SearchSVG from '../../public/search.svg';
import SnippetsSVG from '../../public/snippets.svg';
import TagSVG from '../../public/tag.svg';

export const IconType: { [key: string]: any } = {
	about: AboutSVG,
	blog: BlogSVG,
	by: BySVG,
	cc: CCSVG,
	characters: CharactersSVG,
	money: MoneySVG,
	projects: ProjectsSVG,
	sa: SASVG,
	search: SearchSVG,
	snippets: SnippetsSVG,
	tag: TagSVG,
};

export default function Icon({
	type,
	alt,
	width,
	height,
}: {
	type: string;
	alt: string;
	width?: number;
	height?: number;
}) {
	return <Image src={IconType[type]} alt={alt} width={width} height={height} />;
}
