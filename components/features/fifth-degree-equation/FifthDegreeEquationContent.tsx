'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { FifthDegreeEquationForm } from './FifthDegreeEquationForm';

export const FifthDegreeEquationContent = () => {
	const [result, setResult] = useState<number | null>(null);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Input</CardTitle>
				</CardHeader>
				<CardContent>
					<FifthDegreeEquationForm onCalculate={(result) => setResult(result)} />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Output</CardTitle>
				</CardHeader>
				<CardContent>{result && <p>x = {result.toFixed(4)}</p>}</CardContent>
			</Card>
		</>
	);
};
