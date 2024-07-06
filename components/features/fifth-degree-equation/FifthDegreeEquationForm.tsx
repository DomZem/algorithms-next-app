'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const fifthDegreeEquationSchema = z.object({
	a: z.coerce.number().transform((value, ctx) => {
		if (value === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'A cannot be equal to 0',
			});

			return z.NEVER;
		}

		return value;
	}),
	b: z.coerce.number(),
	c: z.coerce.number(),
	d: z.coerce.number(),
	e: z.coerce.number(),
	f: z.coerce.number(),
});

type FifthDegreeEquation = z.infer<typeof fifthDegreeEquationSchema>;

const newtonMethod = (coeffs: FifthDegreeEquation, initialGuess: number, tolerance = 1e-7, maxIter = 1000) => {
	const { a, b, c, d, e, f } = coeffs;

	const fx = (x: number) => a * Math.pow(x, 5) + b * Math.pow(x, 4) + c * Math.pow(x, 3) + d * Math.pow(x, 2) + e * x + f;
	const fxPrime = (x: number) => 5 * a * Math.pow(x, 4) + 4 * b * Math.pow(x, 3) + 3 * c * Math.pow(x, 2) + 2 * d * Math.pow(x, 1) + e;

	let x = initialGuess;

	for (let i = 0; i < maxIter; i++) {
		const y = fx(x);
		const y_prime = fxPrime(x);

		if (Math.abs(y_prime) < tolerance) {
			break;
		}

		const x_new = x - y / y_prime;

		if (Math.abs(x_new - x) < tolerance) {
			return x_new;
		}

		x = x_new;
	}

	return null;
};

export const FifthDegreeEquationForm = ({ onCalculate }: { onCalculate: (result: number) => void }) => {
	const form = useForm<FifthDegreeEquation>({
		resolver: zodResolver(fifthDegreeEquationSchema),
		defaultValues: {
			a: 1,
			b: 2,
			c: 10,
			d: 1,
			e: 1,
			f: 1,
		},
	});

	const handleCalculateResult = ({ a, b, c, d, e, f }: FifthDegreeEquation) => {
		const result = newtonMethod({ a, b, c, d, e, f }, 0);

		if (result !== null) {
			onCalculate(result);
		} else {
			console.error('Newton method did not converge.');
		}
	};

	const a = form.watch('a');
	const b = form.watch('b');
	const c = form.watch('c');
	const d = form.watch('d');
	const e = form.watch('e');
	const f = form.watch('f');

	return (
		<Form {...form}>
			<p className='mb-5'>
				<span className='font-bold'>{a}</span>x<sup>5</sup> +<span className='font-bold'>{b}</span>x<sup>4</sup> +<span className='font-bold'>{c}</span>x<sup>3</sup> +
				<span className='font-bold'>{d}</span>x<sup>2</sup> +<span className='font-bold'>{e}</span>x +<span className='font-bold'>{f}</span> = 0
			</p>

			<form onSubmit={form.handleSubmit(handleCalculateResult)} className='space-y-6'>
				<FormField
					control={form.control}
					name='a'
					render={({ field }) => (
						<FormItem>
							<FormLabel>A</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='b'
					render={({ field }) => (
						<FormItem>
							<FormLabel>B</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='c'
					render={({ field }) => (
						<FormItem>
							<FormLabel>C</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='d'
					render={({ field }) => (
						<FormItem>
							<FormLabel>D</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='e'
					render={({ field }) => (
						<FormItem>
							<FormLabel>E</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='f'
					render={({ field }) => (
						<FormItem>
							<FormLabel>F</FormLabel>
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
