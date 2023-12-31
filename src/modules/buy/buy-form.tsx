import { createForm, type FieldErrors } from "simple:form";
import { Check } from "lucide-react";
import { z } from "zod";

import { Form, Input, Saving } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useClientTranslations } from "@/lib/i18n/utils";
import type { Buy } from "@/lib/db/schema";
import { sanitize } from "@/lib/utils";

export const buyForm = createForm({
  description: z.string().transform(sanitize),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeZone: z.string().transform(sanitize),
  buyId: z.string().transform(sanitize),
});

export function BuyForm({
  serverErrors,
  buy,
}: { serverErrors?: FieldErrors<typeof buyForm>; buy: Buy; }) {
  const t = useClientTranslations();

  return (
    <Form
      className="flex flex-col gap-4 items-start"
      fieldErrors={serverErrors}
      validator={buyForm.validator}
      name="buyForm"
    >
      <Label className="block w-full">
        <span className="mb-1 block">{t("buys.description")}</span>
        <Input {...buyForm.inputProps.description} defaultValue={buy.description ?? undefined} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("buys.date")}</span>
        <Input
          {...buyForm.inputProps.date}
          defaultValue={new Date(buy.date).toISOString().split('T')[0]}
          type="date"
        />
      </Label>
      <Input
        {...buyForm.inputProps.timeZone}
        type="hidden"
        defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}
      />
      <Input
        {...buyForm.inputProps.buyId}
        type="hidden"
        defaultValue={buy.id}
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
