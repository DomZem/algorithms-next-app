'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { ThirdDegreeEquationForm } from './ThirdDegreeEquationForm';

export const ThirdDegreeEquationContent = () => {
	const [roots, setRoots] = useState<number[]>([]);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Input</CardTitle>
				</CardHeader>
				<CardContent>
					<ThirdDegreeEquationForm onCalculate={(result) => setRoots(result)} />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Output</CardTitle>
				</CardHeader>
				<CardContent>
					<ul>
						{roots.map((root, index) => (
							<li key={index}>
								x<sub>{index + 1}</sub> = {root.toFixed(4)}
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</>
	);
};
