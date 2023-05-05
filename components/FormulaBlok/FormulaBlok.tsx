import KaTeX from 'katex';

import 'katex/dist/katex.min.css';

export type FormulaBlokProps = {
	formula: string;
};

export function FormulaBlok({ formula }: FormulaBlokProps) {
	const html = KaTeX.renderToString(formula);
	return <div className=" text-center text-zbrown" dangerouslySetInnerHTML={{ __html: html }}></div>;
}
