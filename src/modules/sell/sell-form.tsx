import { createForm, type FieldErrors } from "simple:form";
import { Check } from "lucide-react";
import { z } from "zod";

import { Form, Input, Saving } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useClientTranslations } from "@/lib/i18n/utils";
import type { Sell } from "@/lib/db/schema";
import { sanitize } from "@/lib/utils";

export const sellForm = createForm({
  description: z.string().transform(sanitize),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeZone: z.string().transform(sanitize),
});

export function SellForm({
  serverErrors,
  sell,
}: { serverErrors?: FieldErrors<typeof sellForm>; sell: Sell; }) {
  const t = useClientTranslations();

  return (
    <Form
      className="flex flex-col gap-4 items-start"
      fieldErrors={serverErrors}
      validator={sellForm.validator}
      name="sellForm"
    >
      <Label className="block w-full">
        <span className="mb-1 block">{t("sells.description")}</span>
        <Input {...sellForm.inputProps.description} defaultValue={sell.description ?? undefined} />
      </Label>
      <Label className="block w-full">
        <span className="mb-1 block">{t("sells.date")}</span>
        <Input
          {...sellForm.inputProps.date}
          defaultValue={sell.date}
          type="date"
        />
      </Label>
      <Input
        {...sellForm.inputProps.timeZone}
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
