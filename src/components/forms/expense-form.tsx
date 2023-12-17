import { createForm, type FieldErrors } from "simple:form";
import { Check } from "lucide-react";
import { z } from "zod";

import { CurrencyInput, Form, Input, Select, Saving } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useClientTranslations } from "@/lib/i18n/utils";
import type { Expense, ExpenseCategory } from "@/lib/db/schema";
import { sanitize } from "@/lib/sanitize";

export const expenseForm = createForm({
  amount: z.preprocess((v) => Number(String(v).replace(/[^0-9]/g, "")), z.number().min(1).max(9999999)),
  description: z.string().transform(sanitize),
  categoryId: z.string().transform(sanitize),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeZone: z.string().transform(sanitize)
});

export function ExpenseForm({
  serverErrors,
  expense,
  categories
}: { serverErrors?: FieldErrors<typeof expenseForm>; expense: Expense; categories: ExpenseCategory[] }) {
  const t = useClientTranslations();

  return (
    <Form
      className="flex flex-col gap-4 items-start"
      fieldErrors={serverErrors}
      validator={expenseForm.validator}
      name="expenseForm"
    >
      <Label className="block w-full">
        <span className="mb-1 block">{t("expenses.amount")}</span>
        <CurrencyInput {...expenseForm.inputProps.amount} defaultValue={expense.amount} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("expenses.description")}</span>
        <Input {...expenseForm.inputProps.description} defaultValue={expense.description} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("expenses.category")}</span>
        <Select {...expenseForm.inputProps.categoryId} options={categories} defaultValue={expense.categoryId ?? undefined} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("expenses.date")}</span>
        <Input
          {...expenseForm.inputProps.date}
          defaultValue={new Date(expense.date).toISOString().replace("T00:00:00.000Z", "")}
          type="date"
        />
      </Label>
      <Input
        {...expenseForm.inputProps.timeZone}
        type="hidden"
        defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
      />
      <div className="flex items-center flex-col-reverse md:flex-row w-full">
        <Button className="w-full md:w-auto" type="submit">
          <Check className="w-4 h-4 mr-2" />
          {t("save")}
        </Button>
        <Saving className="mb-4 md:mb-0 md:ml-4" />
      </div>
    </Form>
  );
}
