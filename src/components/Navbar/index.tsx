import { useState } from 'react';
import { useRouter } from 'next/router';

import MobileMenu from './mobile-menu';
import DesktopMenu from './desktop-menu';
import Calendar from '../calendar';

export default function Navbar() {
	const router = useRouter();
	const [searchInput, setSearchInput] = useState<string>('');

	// const handleDateChange = (start: Date, end: Date) => {
	// 	setStartDate(start);
	// 	setEndDate(end);
	// };

	const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>) => {
		e.preventDefault();

		if (searchInput) {
			console.log(`/search/${searchInput}`);
			// router.push(`/search/${searchInput}`); // Descomente esta linha para fazer o redirecionamento
		}
	};

	return (
		<>
			<MobileMenu/>

			<DesktopMenu handleSearch={handleSearch} />
		</>
	);
}
