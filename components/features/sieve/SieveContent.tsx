'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { SieveForm } from './SieveForm';

export const SieveContent = () => {
	const [result, setResult] = useState<string>('');

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Input</CardTitle>
				</CardHeader>
				<CardContent>
					<SieveForm onCalculate={(result) => setResult(result)} />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Output</CardTitle>
				</CardHeader>
				<CardContent>
					<p>{result}</p>
				</CardContent>
			</Card>
		</>
	);
};
