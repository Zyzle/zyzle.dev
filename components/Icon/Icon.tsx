import Image from 'next/image';

import classNames from '@zyzle-dev/lib/classNames';

import AboutSVG from '../../public/about.svg';
import BashSVG from '../../public/bash.svg';
import BlogSVG from '../../public/blog.svg';
import BySVG from '../../public/by.svg';
import CCSVG from '../../public/cc.svg';
import CharactersSVG from '../../public/characters.svg';
import JavaSVG from '../../public/java.svg';
import MoneySVG from '../../public/money.svg';
import ProjectsSVG from '../../public/projects.svg';
import Python from '../../public/python.svg';
import SASVG from '../../public/sa.svg';
import SearchSVG from '../../public/search.svg';
import SnippetsSVG from '../../public/snippets.svg';
import TagSVG from '../../public/tag.svg';
import TypeScriptSVG from '../../public/typescript.svg';

export const IconType: { [key: string]: any } = {
	about: AboutSVG,
	bash: BashSVG,
	blog: BlogSVG,
	by: BySVG,
	cc: CCSVG,
	characters: CharactersSVG,
	ini: BashSVG,
	java: JavaSVG,
	money: MoneySVG,
	projects: ProjectsSVG,
	python: Python,
	sa: SASVG,
	search: SearchSVG,
	snippets: SnippetsSVG,
	tag: TagSVG,
	typescript: TypeScriptSVG,
};

export function Icon({ type, alt, width, height }: { type: string; alt: string; width?: number; height?: number }) {
	return <Image src={IconType[type]} alt={alt} width={width} height={height} />;
}
