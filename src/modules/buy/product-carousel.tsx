import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useClientTranslations } from "@/lib/i18n/utils";
import { formatNumber } from "@/lib/utils";

type ProductCarouselProps = {
  lang: string;
  items: {
    color: string;
    type: string;
    size: string;
    quantity: number;
    price: number;
  }[];
}

export const ProductCarousel = ({ items, lang }: ProductCarouselProps) => {
  const t = useClientTranslations()

  return (
    <Carousel>
      <CarouselContent>
        {items.map(({ color, type, size, quantity, price }, idx) => (
          <CarouselItem
            key={idx}
            className="basis-auto"
          >
            <div className="min-w-[6rem] h-24 rounded border overflow-hidden flex flex-col">
              <div className="p-2 text-xs font-semibold">
                <h3>{type}</h3>
                <p>{t('buys.carousel.size')} {size}</p>
                <p>{quantity} {t('buys.carousel.units')}</p>
                <p>{t('buys.carousel.subtotal')}: {formatNumber(String(price * quantity), lang)}</p>
              </div>
              <div
                className="w-full h-3 border-t mt-auto"
                style={{ background: color }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-10" />
      <CarouselNext className="-right-10" />
    </Carousel>
  )
}