'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const sieveSchema = z.object({
	number: z.coerce.number().int(),
});

type Sieve = z.infer<typeof sieveSchema>;

const checkIsPrime = (n: number) => {
	const numbers = Array.from({ length: n + 1 }, () => true);
	const primes: number[] = [];

	for (let i = 2; i <= n; i++) {
		if (numbers[i]) {
			primes.push(i);

			for (let j = i * i; j <= n; j += i) {
				numbers[j] = false;
			}
		}
	}

	return primes.includes(n);
};

export const SieveForm = ({ onCalculate }: { onCalculate: (result: string) => void }) => {
	const form = useForm<Sieve>({
		resolver: zodResolver(sieveSchema),
	});

	const handleCalculateResult = ({ number }: Sieve) => {
		const result = checkIsPrime(number);
		onCalculate(`The number ${number} is ${result ? 'prime' : 'not prime'}`);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleCalculateResult)} className='space-y-6'>
				<FormField
					control={form.control}
					name='number'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Number</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className='w-full' type='submit'>
					Calculate
				</Button>
			</form>
		</Form>
	);
};
