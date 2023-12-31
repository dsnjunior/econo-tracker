import { createForm, type FieldErrors } from "simple:form";
import { Check } from "lucide-react";
import { z } from "zod";

import { CurrencyInput, Form, Input, Select, Saving } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useClientTranslations } from "@/lib/i18n/utils";
import type { Earning, EarningCategory } from "@/lib/db/schema";
import { sanitize } from "@/lib/utils";

export const earningForm = createForm({
  amount: z.preprocess((v) => Number(String(v).replace(/[^0-9]/g, "")), z.number().min(1).max(9999999)),
  description: z.string().transform(sanitize),
  categoryId: z.string().transform(sanitize),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeZone: z.string().transform(sanitize)
});

export function EarningForm({
  serverErrors,
  earning,
  categories
}: { serverErrors?: FieldErrors<typeof earningForm>; earning: Earning; categories: EarningCategory[] }) {
  const t = useClientTranslations();

  return (
    <Form
      className="flex flex-col gap-4 items-start"
      fieldErrors={serverErrors}
      validator={earningForm.validator}
      name="earningForm"
    >
      <Label className="block w-full">
        <span className="mb-1 block">{t("earnings.amount")}</span>
        <CurrencyInput {...earningForm.inputProps.amount} defaultValue={earning.amount} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("earnings.description")}</span>
        <Input {...earningForm.inputProps.description} defaultValue={earning.description} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("earnings.category")}</span>
        <Select {...earningForm.inputProps.categoryId} options={categories} defaultValue={earning.categoryId ?? undefined} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("earnings.date")}</span>
        <Input
          {...earningForm.inputProps.date}
          defaultValue={new Date(earning.date).toISOString().replace("T00:00:00.000Z", "")}
          type="date"
        />
      </Label>
      <Input
        {...earningForm.inputProps.timeZone}
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
