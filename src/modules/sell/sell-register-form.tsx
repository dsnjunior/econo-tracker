import { useState, type ComponentProps } from "react";
import { Check, CircleDashed, Plus } from "lucide-react";
import { z } from "zod";

import { Input, inputClasses, type InputProps } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";


import { useClientTranslatedPath, useClientTranslations } from "@/lib/i18n/utils";
import type { SellRegister, ProductColor, ProductTypeWithSizes } from "@/lib/db/schema";
import { defaultLang } from "@/lib/i18n/ui";
import { cn, sanitize } from "@/lib/utils";

type SelectProps = ComponentProps<"select"> & { name: string; options: { name: string; id: string }[] };
function Select({ className, options, ...selectProps }: SelectProps) {
  return (
    <select
      className={cn(inputClasses, className)}
      {...selectProps}
    >
      {options.map(({ name, id }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  )
}

function CurrencyInput({ defaultValue, onChange, ...inputProps }: InputProps) {
  const numberFormat = new Intl.NumberFormat(typeof window === 'undefined' ? defaultLang : document.documentElement.lang, {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  function formatNumber(value: string) {
    return numberFormat.format(Number(value.replaceAll(/\D/g, "")));
  }

  return (
    <Input
      inputMode="decimal"
      onChange={(e) => {
        e.target.value = formatNumber(e.target.value);
        onChange?.(e);
      }}
      defaultValue={defaultValue ? formatNumber(String(defaultValue)) : undefined}
      {...inputProps}
    />
  );
}

export const sellRegisterForms = z.array(z.object({
  productTypeId: z.string().transform(sanitize),
  amount: z.preprocess((v) => Number(String(v).replace(/[^0-9]/g, "")), z.number().min(0).max(9999999)),
  sizes: z.array(z.object({
    productSizeId: z.string().transform(sanitize),
    colors: z.array(z.object({
      productColorId: z.string().transform(sanitize),
      quantity: z.number().min(0).max(9999999),
    }))
  }))
}));

export function SellRegisterFormItem({
  form,
  productTypes,
  productColors,
  onChange,
  onQuantityChange
}: {
  form: {
    amount: number;
    productTypeId?: string;
    sizes?: {
      productSizeId?: string;
      colors?: {
        productColorId?: string;
        quantity?: number;
      }[];
    }[];
  };
  productTypes: ProductTypeWithSizes[];
  productColors: ProductColor[];
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  onQuantityChange: (value: {
    quantity: number;
    productSizeId: string;
    productColorId: string;
  }) => void
}) {
  const t = useClientTranslations();

  const [chosenProductType, setChosenProductType] = useState(productTypes.find((pt) => pt.id === form.productTypeId))
  const [sizes, setSizes] = useState(form.sizes ?? [])
  const [sizesBought, setSizesBought] = useState(form.sizes?.filter(({ colors }) => colors?.some(({ quantity }) => !!quantity)).map(({ productSizeId }) => productSizeId) ?? [])

  function getSizeName(sizeId: string) {
    const size = chosenProductType?.sizes.find((s) => s.id === sizeId);

    return size?.name ?? sizeId;
  }

  function getColorName(colorId: string) {
    const color = productColors.find((c) => c.id === colorId);

    return color?.name ?? colorId;
  }

  function getColorCode(colorId: string) {
    const color = productColors.find((c) => c.id === colorId);

    return color?.color ?? colorId;
  }

  function onSetQuantity(evt: React.ChangeEvent<HTMLInputElement>, productColorId: string, productSizeId: string) {
    const quantity = evt.target.value

    onQuantityChange({
      quantity: Number(quantity),
      productColorId,
      productSizeId
    })
  }

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center space-x-2 w-full">
        <Label className="block w-full">
          <span className="mb-1 block">{t("sellRegisters.product")}</span>
          <Select name="productTypeId" onChange={(e) => {
            const chosenProductType = productTypes.find((pt) => pt.id === e.target.value);
            if (chosenProductType) {
              setChosenProductType(chosenProductType)
              setSizes(chosenProductType.sizes.map((s) => ({ productSizeId: s.id, colors: productColors.map((c) => ({ productColorId: c.id, quantity: 0 })) })))
            }
            onChange(e)
          }} options={[{ id: '', name: '' }, ...productTypes]} defaultValue={form.productTypeId} />
        </Label>
        <Label className="block w-full">
          <span className="mb-1 block">{t("sellRegisters.amount")}</span>
          <CurrencyInput name="amount" onChange={onChange} defaultValue={form.amount} />
        </Label>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          {sizes.map((s) => (
            <div key={s.productSizeId} className="flex items-start pb-4 border-b last:border-b-0 last:pb-0">
              <div className="flex items-center w-32 shrink-0">
                <Switch id={s.productSizeId} className="shrink-0" checked={sizesBought.includes(s.productSizeId)} onCheckedChange={(checked) => {
                  if (checked) {
                    setSizesBought((prev) => [...prev, s.productSizeId!])
                  } else {
                    setSizesBought((prev) => prev.filter((ps) => ps !== s.productSizeId))
                  }
                }} />
                <Label htmlFor={s.productSizeId} className="font-semibold ml-2 flex-1 truncate">{getSizeName(s.productSizeId!)}</Label>
              </div>
              <div className="flex-1">
                {sizesBought.includes(s.productSizeId) && (
                  <div className="space-y-2 border rounded p-2">
                    <p className="font-bold">{t("sellRegisters.quantity")}</p>
                    {s.colors?.map((c) => (
                      <Label key={c.productColorId} className="flex items-center w-full">
                        <span className="mb-1 flex items-center justify-end w-36 truncate mr-2"><span className="w-5 h-5 rounded-full border mr-2" style={{ background: getColorCode(c.productColorId!) }} />{getColorName(c.productColorId!)}: </span>
                        <Input type="number" inputMode="numeric" name="quantity" onChange={(e) => onSetQuantity(e, c.productColorId!, s.productSizeId!)} defaultValue={c.quantity} />
                      </Label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {!sizes.length && <p className="text-center">{t("dashboard.empty")}</p>}
        </CardContent>
      </Card>
    </div>
  )
}

export function SellRegisterForm({
  registers,
  productTypes,
  productColors,
  sellId,
}: {
  registers: SellRegister[]; productTypes: ProductTypeWithSizes[]; productColors: ProductColor[]; sellId: string;
}) {
  const t = useClientTranslations();
  const translatedPath = useClientTranslatedPath();

  const [submitting, setSubmitting] = useState(false);

  const transformedRegisters = registers.reduce((acc, register) => {
    const idx = acc.findIndex(({ productTypeId }) => productTypeId === register.productTypeId);

    if (idx === -1) {
      acc.push({
        productTypeId: register.productTypeId,
        amount: register.amount,
        sizes: [
          ...productTypes.find((pt) => pt.id === register.productTypeId)?.sizes.map((s) => ({
            productSizeId: s.id,
            colors: productColors.map((c) => ({ productColorId: c.id, quantity: 0 }))
          })) ?? [],
          {
            productSizeId: register.productSizeId,
            colors: [
              ...productColors.filter((c) => c.id !== register.productColorId).map((c) => ({ productColorId: c.id, quantity: 0 })),
              {
                productColorId: register.productColorId,
                quantity: register.quantity
              }]
          }]
      })

      return acc;
    }

    const sizeIdx = acc[idx].sizes.findIndex(({ productSizeId }) => productSizeId === register.productSizeId);

    if (sizeIdx === -1) {
      acc[idx].sizes.push({
        productSizeId: register.productSizeId,
        colors: [
          ...productColors.filter((c) => c.id !== register.productColorId).map((c) => ({ productColorId: c.id, quantity: 0 })),
          {
            productColorId: register.productColorId,
            quantity: register.quantity
          }]
      })

      return acc;
    }

    const colorIdx = acc[idx].sizes[sizeIdx].colors.findIndex(({ productColorId }) => productColorId === register.productColorId);

    if (colorIdx === -1) {
      acc[idx].sizes[sizeIdx].colors.push({
        productColorId: register.productColorId,
        quantity: register.quantity
      })

      return acc;
    }

    acc[idx].sizes[sizeIdx].colors[colorIdx].quantity += register.quantity;

    return acc;
  }, [] as {
    amount: number;
    productTypeId: string;
    sizes: {
      productSizeId: string;
      colors: {
        productColorId: string;
        quantity: number;
      }[];
    }[];
  }[])

  const [formFields, setFormFields] = useState([
    ...transformedRegisters, {
      amount: 0,
      productTypeId: undefined,
      sizes: []
    }])

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, idx: number) {
    let data = [...formFields];
    // @ts-ignore
    data[idx][evt.target.name] = evt.target.value;
    setFormFields(data);
  }

  function handleOnQuantityChange(value: {
    quantity: number;
    productSizeId: string;
    productColorId: string;
  }, idx: number) {
    let data = [...formFields];
    // @ts-ignore
    const sizeIdx = data[idx].sizes.findIndex((s) => s.productSizeId === value.productSizeId);

    if (sizeIdx === -1) {
      data[idx].sizes = [{
        productSizeId: value.productSizeId,
        colors: [{
          productColorId: value.productColorId,
          quantity: value.quantity
        }]
      }]

      setFormFields(data);
      return;
    }

    const colorIdx = data[idx].sizes[sizeIdx].colors.findIndex((c) => c.productColorId === value.productColorId);
    if (colorIdx === -1) {
      data[idx].sizes[sizeIdx].colors.push({
        productColorId: value.productColorId,
        quantity: value.quantity
      })

      setFormFields(data);
      return;
    }

    data[idx].sizes[sizeIdx].colors[colorIdx].quantity = value.quantity;

    setFormFields(data);
  }


  function addForm() {
    setFormFields((prev) => [...prev, {
      amount: 0,
      productTypeId: undefined,
      sizes: []
    }])
  }

  function submit() {
    setSubmitting(true);
    fetch(`/api/sell/${sellId}/sell-registers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields.filter((form) => !!form.productTypeId))
    }).then(() => location.replace(translatedPath('/app/sells')))
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      {formFields.map((form, idx) => (
        <SellRegisterFormItem
          key={idx}
          form={form}
          productTypes={productTypes}
          productColors={productColors}
          onChange={(evt) => handleOnChange(evt, idx)}
          onQuantityChange={(value) => handleOnQuantityChange(value, idx)}
        />
      ))}

      <Button className="w-full md:w-auto md:ml-auto" type="button" variant="secondary" onClick={addForm}>
        <Plus className="w-4 h-4 mr-2" />
        {t("add")}
      </Button>

      <div className="flex items-center flex-col-reverse md:flex-row w-full">
        <Button className="w-full md:w-auto" onClick={submit} disabled={submitting}>
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
    </div >
  );
}
