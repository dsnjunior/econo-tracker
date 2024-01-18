import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { CreditCardExpense } from "@/lib/db/schema";
import { formatDate, formatNumber } from "@/lib/utils";
import type React from "react";

type ExpensesCarouselProps = {
	expenses: CreditCardExpense[];
	lang?: string;
};

export const ExpensesCarousel: React.FC<ExpensesCarouselProps> = ({
	expenses,
	lang,
}) => {
	if (!expenses.length) {
		return (
			<div className="text-sm">Nenhum gasto registrado com esse cartão.</div>
		);
	}

	return (
		<Carousel className="w-full">
			<CarouselContent>
				{expenses.map((expense) => (
					<CarouselItem className="basis-auto max-w-56">
						<div className="border rounded border-border p-2 w-full">
							<p className="font-semibold">
								{formatNumber(expense.amount.toString(), lang)}
							</p>
							<p className="text-sm line-clamp-1">{expense.description}</p>
							<p className="text-sm">
								{formatDate(expense.date, expense.timeZone, lang, "short")}
							</p>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};
