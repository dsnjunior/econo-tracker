import { createForm, type FieldErrors } from "simple:form";
import { Check } from "lucide-react";
import { z } from "zod";

import { Form, Input, Saving, RadioGroup } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useClientTranslations } from "@/lib/i18n/utils";
import type { ProductType } from "@/lib/db/schema";
import { sanitize } from "@/lib/utils";

export const productTypeForm = createForm({
  name: z.string().transform(sanitize),
  // color: z.string().regex(/^#[0-9a-f]{6}$/i),
});

export function ProductTypeForm({
  serverErrors,
  productType,
}: { serverErrors?: FieldErrors<typeof productTypeForm>; productType: ProductType; }) {
  const t = useClientTranslations();

  return (
    <Form
      className="flex flex-col gap-4 items-start"
      fieldErrors={serverErrors}
      validator={productTypeForm.validator}
      name="productTypeForm"
    >
      <Label className="block w-full">
        <span className="mb-1 block">{t("productTypes.name")}</span>
        <Input {...productTypeForm.inputProps.name} defaultValue={productType.name} />
      </Label>

      {/* <Label className="block w-full">
        <span className="mb-1 block">{t("productTypes.color")}</span>
        <RadioGroup
          {...productTypeForm.inputProps.color}
          options={availableColors.map(({ name, value }) => ({
            name: <div className="flex items-center p-1 text-white rounded" style={{ background: value }}>{t(name)}</div>,
            id: value,
          }))}
          defaultValue={productType.color}
        />
      </Label> */}

      <div className="flex items-center flex-col-reverse md:flex-row w-full">
        <Button className="w-full md:w-auto" type="submit">
          <Check className="w-4 h-4 mr-2" />
          {t("save")}
        </Button>
        <Saving className="mb-4 md:mb-0 md:ml-4" />
      </div>
    </Form >
  );
}
