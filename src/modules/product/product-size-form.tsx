import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { z } from "zod";

import { Input } from '@/components/ui/input'
import { Success } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { getLangFromClient, useClientTranslations } from "@/lib/i18n/utils";
import type { ProductSize } from "@/lib/db/schema";
import { sanitize } from "@/lib/utils";

export const productSizeForms = z.array(z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(200).transform(sanitize),
}));

function ProductSizeFormItem({
  form,
  onChange
}: {
  form: {
    name: string
  };
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}) {
  const t = useClientTranslations();

  return (
    <div className="flex items-center space-x-2 w-full">
      <Label className="block w-full">
        <span className="mb-1 block">{t("productSizes.name")}</span>
        <Input name="name" onChange={onChange} defaultValue={form.name} />
      </Label>
    </div>
  )
}

export function ProductSizeForm({
  productSizes,
  productTypeId,
}: {
  productSizes: ProductSize[]; productTypeId: string;
}) {
  const t = useClientTranslations();

  const [success, setSuccess] = useState(false)
  const [formFields, setFormFields] = useState([
    ...productSizes.map((productSize) => ({
      name: productSize.name,
      id: productSize.id
    })), {
      name: ''
    }])

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, idx: number) {
    let data = [...formFields];
    // @ts-ignore
    data[idx][evt.target.name] = evt.target.value;
    setFormFields(data);
  }

  function addForm() {
    setFormFields((prev) => [...prev, { name: '' }])
  }

  function submit() {
    fetch(`/api/product-types/${productTypeId}/product-sizes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields.filter((form) => !!form.name))
    }).then(() => setSuccess(true))
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      {success && <Success lang={getLangFromClient()} className="w-full" />}

      {formFields.map((form, idx) => (
        <ProductSizeFormItem key={idx} form={form} onChange={(evt) => handleOnChange(evt, idx)} />
      ))}

      <Button className="w-full md:w-auto md:ml-auto" type="button" variant="outline" onClick={addForm}>
        <Plus className="w-4 h-4 mr-2" />
        {t("add")}
      </Button>


      <div className="flex items-center flex-col-reverse md:flex-row w-full">
        <Button className="w-full md:w-auto" onClick={submit}>
          <Check className="w-4 h-4 mr-2" />
          {t("save")}
        </Button>
      </div>
    </div>
  );
}
