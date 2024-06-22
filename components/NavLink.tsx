'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavLink = ({ title, href }: { title: string; href: string }) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<li>
			<Link className={cn('inline-block rounded-[30px] text-sm py-1 px-2 hover:bg-black text-white', isActive && 'bg-black')} href={href}>
				{title}
			</Link>
		</li>
	);
};
