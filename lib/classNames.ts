// Usage: <div className={classNames('bg-red-500 text-white p-4', 'rounded', { 'bg-blue-500': isBlue })} />
export default function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}
