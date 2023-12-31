import React from "react";
import type { FieldErrors } from "simple:form";
import { ChevronRight, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";

import type { Buy, BuyRegisterWithProduct, ProductColor, ProductTypeWithSizes } from "@/lib/db/schema";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

import { BuyRegisterForm } from "./buy-register-form";
import { BuyForm, buyForm } from "./buy-form";
import { useClientTranslations } from "@/lib/i18n/utils";

interface ProductOptionsProps {
  buy: Buy;
  registers: BuyRegisterWithProduct[]
  colors: ProductColor[]
  types: ProductTypeWithSizes[]
  serverErrors?: FieldErrors<typeof buyForm>;
  open: boolean;
  mode: 'menu' | 'manage' | 'edit' | 'delete'
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({ buy, registers, colors, types, serverErrors, open: defaultOpen, mode: defaultMode }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const [mode, setMode] = React.useState<ProductOptionsProps['mode']>(defaultMode)

  const t = useClientTranslations()

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <MoreHorizontal />
      </Button>
      <Modal
        title={t('buys.options.title')}
        open={open}
        onClose={() => {
          setOpen(false)
          setTimeout(() => setMode('menu'), 200)
        }}
      >
        <div className="grid gap-2">
          <Button onClick={() => setMode('manage')} variant="outline" className="w-full flex items-center justify-start">
            <Plus className="w-4 h-4 mr-4" /> {t('buys.options.manage')} <ChevronRight className="w-5 h-5 ml-auto pl-1" />
          </Button>
          <Button onClick={() => setMode('edit')} variant="outline" className="w-full flex items-center justify-start">
            <Pencil className="w-4 h-4 mr-4" /> {t('buys.options.edit')} <ChevronRight className="w-5 h-5 ml-auto pl-1" />
          </Button>
          <Button onClick={() => setMode('delete')} variant="destructive" className="w-full flex items-center justify-start">
            <Trash className="w-4 h-4 mr-4" /> {t('buys.options.delete')} <ChevronRight className="w-5 h-5 ml-auto pl-1" />
          </Button>
        </div>
      </Modal >

      <Modal
        title={t('buys.form.title')}
        open={open && mode === 'edit'}
        onClose={() => setMode('menu')}
      >
        <BuyForm buy={buy} serverErrors={serverErrors} />
      </Modal>

      <Modal
        title={t('buys.form.title')}
        open={open && mode === 'manage'}
        onClose={() => setMode('menu')}
      >
        <BuyRegisterForm buyId={buy.id} registers={registers} productColors={colors} productTypes={types} />
      </Modal>
    </>
  )
}