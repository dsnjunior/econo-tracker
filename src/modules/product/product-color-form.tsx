import { useState } from "react";
import { Check, CircleDashed, Plus } from "lucide-react";
import { z } from "zod";

import { Input } from '@/components/ui/input'
import { Success } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { getLangFromClient, useClientTranslations } from "@/lib/i18n/utils";
import type { ProductColor } from "@/lib/db/schema";
import { sanitize } from "@/lib/utils";

export const productColorForms = z.array(z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(200).transform(sanitize),
  color: z.string().regex(/^#[0-9a-f]{6}$/i),
}));

function ProductColorFormItem({
  form,
  onChange
}: {
  form: {
    name: string
    color: string
  };
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}) {
  const t = useClientTranslations();

  return (
    <div className="flex items-center space-x-2 w-full">
      <Label className="block w-full">
        <span className="mb-1 block">{t("productColors.name")}</span>
        <Input name="name" onChange={onChange} defaultValue={form.name} />
      </Label>
      <Label className="block w-48">
        <span className="mb-1 block">{t("productColors.color")}</span>
        <Input name="color" onChange={onChange} defaultValue={form.color} type="color" />
      </Label>
    </div>
  )
}

export function ProductColorForm({
  productColors,
}: {
  productColors: ProductColor[]
}) {
  const t = useClientTranslations();

  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formFields, setFormFields] = useState([
    ...productColors.map((productColor) => ({
      id: productColor.id,
      name: productColor.name,
      color: productColor.color
    })), {
      name: '',
      color: '#000000'
    }])

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, idx: number) {
    let data = [...formFields];
    // @ts-ignore
    data[idx][evt.target.name] = evt.target.value;
    setFormFields(data);
  }

  function addForm() {
    setFormFields((prev) => [...prev, { name: '', color: '#000000' }])
  }

  function submit() {
    setSubmitting(true)
    fetch(`/api/product-colors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields.filter((form) => !!form.name && !!form.color))
    }).then(() => setSuccess(true)).finally(() => setSubmitting(false))
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      {success && <Success lang={getLangFromClient()} className="w-full" />}

      {formFields.map((form, idx) => (
        <ProductColorFormItem key={idx} form={form} onChange={(evt) => handleOnChange(evt, idx)} />
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
        {submitting && (
          <p className="flex items-center font-semibold mb-4 md:mb-0 md:ml-4">
            <CircleDashed className="w-4 h-4 animate-spin mr-2" />
            {t('saving')}
          </p>
        )}
      </div>
    </div>
  );
}
