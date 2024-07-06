import { NavLink } from '@/components/NavLink';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Algorithms App',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='h-screen max-w-5xl mx-auto'>
					<header className='p-4 flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<Image src='/logo.png' width={32} height={32} alt='logo' />
							<h1 className='font-bold text-2xl'>Algorithms</h1>
						</div>

						<nav className='lg:block'>
							<ul className='p-2 bg-gray-700 rounded-[30px] flex gap-3'>
								<NavLink title='Third degree equation' href='/third-degree-equation' />
								<NavLink title='Sieve' href='/' />
								<NavLink title='Fifth degree equation' href='/fifth-degree-equation' />
							</ul>
						</nav>
					</header>

					<main className='grid grid-cols-2 gap-4 p-4'>{children}</main>
				</div>
			</body>
		</html>
	);
}
