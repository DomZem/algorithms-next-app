'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const thirdDegreeEquationSchema = z.object({
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
});

type ThirdDegreeEquation = z.infer<typeof thirdDegreeEquationSchema>;

const calculateCubicRoots = (a: number, b: number, c: number, d: number): number[] => {
	if (a === 0) {
		throw new Error('A cannot be equal to 0');
	}

	const w = -(b / (3 * a));
	const p = (3 * a * Math.pow(w, 2) + 2 * b * w + c) / a;
	const q = a * Math.pow(w, 3) + b * Math.pow(w, 2) + c * w + d;
	const delta = Math.pow(q, 2) / 4 + Math.pow(p, 3) / 27;

	if (delta > 0) {
		const u = Math.cbrt(-q / 2 + Math.sqrt(delta));
		const v = Math.cbrt(-q / 2 - Math.sqrt(delta));
		const x1 = u + v + w;

		return [x1];
	} else if (delta === 0) {
		const x1 = w - 2 * Math.cbrt(q / 2);
		const x2x3 = Math.cbrt(q / 2) + w;

		return [x1, x2x3, x2x3];
	}

	// Case when delta < 0 (3 distinct real roots)
	const tempQ = Math.acos(((3 * q) / (2 * p)) * Math.sqrt(-3 / p));
	const x1 = w + 2 * Math.sqrt(-p / 3) * Math.cos(tempQ / 3);
	const x2 = w + 2 * Math.sqrt(-p / 3) * Math.cos((tempQ + 2 * Math.PI) / 3);
	const x3 = w + 2 * Math.sqrt(-p / 3) * Math.cos((tempQ + 4 * Math.PI) / 3);

	return [x1, x2, x3];
};

export const ThirdDegreeEquationForm = ({ onCalculate }: { onCalculate: (result: number[]) => void }) => {
	const form = useForm<ThirdDegreeEquation>({
		resolver: zodResolver(thirdDegreeEquationSchema),
		defaultValues: {
			a: 1,
			b: 2,
			c: 3,
			d: 4,
		},
	});

	const handleCalculateResult = ({ a, b, c, d }: ThirdDegreeEquation) => {
		const result = calculateCubicRoots(a, b, c, d);
		onCalculate(result);
	};

	const a = form.watch('a');
	const b = form.watch('b');
	const c = form.watch('c');
	const d = form.watch('d');

	return (
		<Form {...form}>
			<p className='mb-5'>
				<span className='font-bold'>{a}</span>x<sup>3</sup> + <span className='font-bold'>{b}</span>x<sup>2</sup> + <span className='font-bold'>{c}</span>x + <span className='font-bold'>{d}</span> = 0
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

				<Button className='w-full' type='submit'>
					Calculate
				</Button>
			</form>
		</Form>
	);
};
