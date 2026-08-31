import { useRef, useState, type KeyboardEvent } from "react";
import { babyItemNotes, babyItems } from "../data/babyItems";
import {
  conciergeServiceRules,
  conciergeServices,
  getConciergeWhatsAppHref,
  type ConciergeService,
} from "../data/conciergeServices";
import {
  menuCategories,
  shoppingOptions,
  SHOPPING_CTA_MESSAGE,
  type MenuCategoryId,
} from "../data/menu";
import { useReveal } from "../hooks/useReveal";
import { useHorizontalStepCarousel } from "../hooks/useHorizontalScrollCarousel";
import { revealDelay } from "../utils/revealDelay";

const arrowButtonClass =
  "flex h-11 w-11 shrink-0 items-center justify-center text-petroleum/55 transition-colors duration-300 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45 disabled:pointer-events-none disabled:opacity-30 sm:h-10 sm:w-10";

const groupLabelClass =
  "font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-sepia/90";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M14 6l-6 6 6 6" />
      ) : (
        <path d="M10 6l6 6-6 6" />
      )}
    </svg>
  );
}

function CatalogNav({
  current,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
  prevLabel,
  nextLabel,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  prevLabel: string;
  nextLabel: string;
}) {
  const currentLabel = String(current).padStart(2, "0");
  const maxLabel = String(total).padStart(2, "0");
  const progress = total > 1 ? current / total : 1;

  return (
    <div className="mx-auto w-full max-w-[16rem] sm:max-w-[18rem]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className={arrowButtonClass}
          aria-label={prevLabel}
        >
          <ChevronIcon direction="left" />
        </button>
        <p
          className="min-w-[5.5rem] text-center font-sans text-[0.75rem] font-medium tabular-nums tracking-[0.14em] text-petroleum/80 sm:text-[0.8125rem]"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-petroleum">{currentLabel}</span>
          <span className="mx-1.5 text-stone-400/90">/</span>
          <span className="text-stone-500">{maxLabel}</span>
        </p>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={arrowButtonClass}
          aria-label={nextLabel}
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
      <div
        className="relative mx-auto mt-4 h-px w-full max-w-[10rem] overflow-hidden bg-petroleum/10"
        aria-hidden
      >
        <div
          className="absolute inset-y-0 left-0 bg-petroleum/35 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

function useCatalogIndex(
  visible: boolean,
  scrollPercent: number,
  activeIndex: number,
  total: number,
) {
  const current = visible
    ? Math.min(total, Math.max(1, 1 + Math.round((scrollPercent / 100) * (total - 1))))
    : activeIndex + 1;
  const atEnd = visible ? scrollPercent >= 98 : false;
  const atStart = !visible || scrollPercent <= 2;
  return { current: atEnd ? total : current, atStart, atEnd };
}

type ConciergeTone = "petroleum" | "sand";

function ConciergeServiceItem({
  index,
  service,
  tone,
  setSlideRef,
}: {
  index: number;
  service: ConciergeService;
  tone: ConciergeTone;
  setSlideRef: (index: number, node: HTMLElement | null) => void;
}) {
  const num = String(index + 1).padStart(2, "0");
  const isGreen = tone === "petroleum";
  const href = getConciergeWhatsAppHref(service.ctaMessage);

  const ctaClass = isGreen
    ? "concierge-service-cta group inline-flex min-h-11 items-center gap-2 border-b border-[rgba(241,230,210,0.45)] pb-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#F8F4ED] transition-[color,border-color] duration-200 ease-out hover:border-[rgba(241,230,210,0.7)] hover:text-[#F8F4ED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgba(248,244,237,0.45)] motion-reduce:transition-none"
    : "concierge-service-cta group inline-flex min-h-11 items-center gap-2 border-b border-petroleum/35 pb-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-petroleum transition-[color,border-color] duration-200 ease-out hover:border-petroleum/55 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petroleum/40 motion-reduce:transition-none";

  return (
    <article
      ref={(node) => setSlideRef(index, node)}
      className={`concierge-service-item flex w-[min(82vw,19.5rem)] shrink-0 snap-start flex-col max-lg:!border-t-0 sm:w-[21rem] md:w-[22.5rem] ${
        isGreen
          ? "bg-wine concierge-service-item-petroleum"
          : "bg-sand concierge-service-item-sand"
      }`}
    >
      <div className="flex flex-col gap-3 sm:gap-3.5">
        <p
          className={`concierge-service-num font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] ${
            isGreen ? "text-[#F1E6D2]" : "text-sepia"
          }`}
        >
          {num}
        </p>
        <h3
          className={`concierge-service-name font-serif text-[clamp(1.375rem,2.5vw,1.875rem)] font-medium leading-[1.12] tracking-[-0.02em] ${
            isGreen ? "text-[#F8F4ED]" : "text-petroleum"
          }`}
        >
          {service.role}
        </h3>
      </div>

      <p
        className={`concierge-service-desc mt-4 max-w-[36ch] font-sans text-[0.9375rem] font-normal leading-[1.65] tracking-[0.01em] sm:mt-5 sm:leading-[1.72] ${
          isGreen ? "text-[#F1E6D2]" : "text-stone-700"
        }`}
      >
        {service.description}
      </p>

      {service.includes?.map((item) => (
        <p
          key={item}
          className={`mt-3 font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.01em] ${
            isGreen ? "text-[rgba(241,230,210,0.82)]" : "text-stone-600"
          }`}
        >
          {item}
        </p>
      ))}

      {service.notes?.map((item) => (
        <p
          key={item}
          className={`mt-2 font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.01em] ${
            isGreen ? "text-[rgba(241,230,210,0.78)]" : "text-stone-600"
          }`}
        >
          {item}
        </p>
      ))}

      <div className="mt-5 flex flex-col items-start gap-3 sm:mt-6">
        <p
          className={`font-sans text-[0.9375rem] font-medium tracking-[0.01em] ${
            isGreen ? "text-[#F8F4ED]" : "text-petroleum"
          }`}
        >
          {service.price}
        </p>
        <p
          className={`font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] ${
            isGreen ? "text-[rgba(241,230,210,0.75)]" : "text-sepia"
          }`}
        >
          Hora extra · {service.extraHour}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Solicitar serviço de ${service.role} pelo WhatsApp`}
          className={ctaClass}
        >
          <span>Solicitar serviço</span>
          <span className="concierge-service-cta-arrow inline-block" aria-hidden>
            →
          </span>
        </a>
      </div>
    </article>
  );
}

function ServicesCarousel() {
  const {
    trackRef,
    trackProps,
    scrollBar,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
    activeIndex,
  } = useHorizontalStepCarousel(conciergeServices.length, {
    draggingClass: "gastro-carousel--dragging",
  });

  const { current, atStart, atEnd } = useCatalogIndex(
    scrollBar.metrics.visible,
    scrollBar.scrollPercent,
    activeIndex,
    conciergeServices.length,
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div>
      <div
        ref={trackRef}
        {...trackProps}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="gastro-carousel flex cursor-grab touch-pan-x snap-x snap-mandatory items-stretch gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        aria-label="Serviços personalizados"
      >
        {conciergeServices.map((service, index) => (
          <ConciergeServiceItem
            key={service.id}
            index={index}
            service={service}
            tone={index % 2 === 0 ? "petroleum" : "sand"}
            setSlideRef={setSlideRef}
          />
        ))}
      </div>
      <div className="mt-8">
        <CatalogNav
          current={current}
          total={conciergeServices.length}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={!atStart && canGoPrev}
          canNext={!atEnd && canGoNext}
          prevLabel="Serviço anterior"
          nextLabel="Próximo serviço"
        />
      </div>
    </div>
  );
}

type MenuPanelId = "menu" | "shopping";

const menuPanels: { id: MenuPanelId; label: string }[] = [
  { id: "menu", label: "Cardápio da casa" },
  { id: "shopping", label: "Compras para a estadia" },
];

function MenuAndShopping() {
  const [activePanel, setActivePanel] = useState<MenuPanelId>("menu");
  const [activeMenu, setActiveMenu] = useState<MenuCategoryId>("almoco");
  const menuTabRef = useRef<HTMLButtonElement>(null);
  const shoppingTabRef = useRef<HTMLButtonElement>(null);
  const category = menuCategories.find((item) => item.id === activeMenu) ?? menuCategories[0];
  const shoppingHref = getConciergeWhatsAppHref(SHOPPING_CTA_MESSAGE);
  const dishMid = Math.ceil(category.dishes.length / 2);
  const dishColumns = [
    category.dishes.slice(0, dishMid),
    category.dishes.slice(dishMid),
  ].filter((column) => column.length > 0);

  const tabRef = (id: MenuPanelId) => (id === "menu" ? menuTabRef : shoppingTabRef);

  const onMainTabListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }
    event.preventDefault();
    const next: MenuPanelId =
      event.key === "Home"
        ? "menu"
        : event.key === "End"
          ? "shopping"
          : activePanel === "menu"
            ? "shopping"
            : "menu";
    setActivePanel(next);
    tabRef(next).current?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Cardápio e compras"
        onKeyDown={onMainTabListKeyDown}
        className="grid grid-cols-2 gap-x-5 border-b border-stone-200/40 sm:flex sm:gap-x-12"
      >
        {menuPanels.map((panel) => {
          const isActive = panel.id === activePanel;
          return (
            <button
              key={panel.id}
              ref={tabRef(panel.id)}
              type="button"
              role="tab"
              id={`menu-shopping-tab-${panel.id}`}
              aria-selected={isActive}
              aria-controls={`menu-shopping-panel-${panel.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActivePanel(panel.id)}
              className={`min-h-12 border-b pb-3 text-left font-sans text-[0.75rem] font-medium uppercase leading-snug tracking-[0.16em] transition-[color,border-color,opacity] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 motion-reduce:transition-none sm:tracking-[0.18em] ${
                isActive
                  ? "border-petroleum text-petroleum"
                  : "border-transparent text-stone-400 hover:text-petroleum/75"
              }`}
            >
              {panel.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="menu-shopping-panel-menu"
        aria-labelledby="menu-shopping-tab-menu"
        hidden={activePanel !== "menu"}
        className="pt-10"
      >
        <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-petroleum">
          Cardápio da casa
        </h3>
        <p className="mt-4 max-w-[46ch] font-sans text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em] text-stone-600">
          Este é o nosso cardápio base. Caso deseje algum prato que não esteja
          entre as opções apresentadas, você pode solicitar à MHV e verificaremos
          a possibilidade de preparo com a cozinheira. Ingredientes e bebidas são
          pagos à parte.
        </p>

        <div
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-stone-200/35"
          role="tablist"
          aria-label="Cardápio por refeição"
        >
          {menuCategories.map((item) => {
            const isActive = item.id === activeMenu;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveMenu(item.id)}
                className={`min-h-11 border-b pb-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-[color,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 ${
                  isActive
                    ? "border-petroleum/45 text-petroleum"
                    : "border-transparent text-stone-400 hover:text-petroleum"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-2 grid grid-cols-1 gap-x-16 md:grid-cols-2"
          aria-live="polite"
        >
          {dishColumns.map((column) => (
            <ul key={column[0]} className="list-none p-0">
              {column.map((dish) => (
                <li
                  key={dish}
                  className="border-b border-stone-200/35 py-4 font-serif text-[1.0625rem] font-normal leading-snug tracking-[-0.012em] text-petroleum sm:text-[1.125rem]"
                >
                  {dish}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id="menu-shopping-panel-shopping"
        aria-labelledby="menu-shopping-tab-shopping"
        hidden={activePanel !== "shopping"}
        className="pt-10"
      >
        <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-petroleum">
          Compras antes da sua chegada
        </h3>
        <p className="mt-4 max-w-[40ch] font-sans text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em] text-stone-600">
          A MHV disponibiliza duas possibilidades para facilitar a organização
          da estadia.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
          {shoppingOptions.map((option, index) => (
            <div key={option.title} className="border-b border-stone-200/35 pb-8">
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-sepia">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum">
                {option.title}
              </p>
              <p className="mt-4 max-w-[38ch] font-sans text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em] text-stone-600">
                {option.body}
              </p>
            </div>
          ))}
        </div>

        <a
          href={shoppingHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Organizar compras com a MHV pelo WhatsApp"
          className="editorial-link mt-10"
        >
          Organizar compras com a MHV
        </a>
      </div>
    </div>
  );
}

function BabyItemsCarousel() {
  const {
    trackRef,
    trackProps,
    scrollBar,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
    activeIndex,
  } = useHorizontalStepCarousel(babyItems.length, {
    draggingClass: "gastro-carousel--dragging",
  });

  const { current, atStart, atEnd } = useCatalogIndex(
    scrollBar.metrics.visible,
    scrollBar.scrollPercent,
    activeIndex,
    babyItems.length,
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div>
      <div
        ref={trackRef}
        {...trackProps}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="gastro-carousel flex cursor-grab touch-pan-x snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-5 [&::-webkit-scrollbar]:hidden"
        aria-label="Itens infantis para locação"
      >
        {babyItems.map((item, index) => {
          const href = getConciergeWhatsAppHref(item.ctaMessage);
          return (
            <article
              key={item.id}
              ref={(node) => setSlideRef(index, node)}
              className="flex w-[min(78vw,17.5rem)] shrink-0 snap-start flex-col border-t border-stone-200/40 bg-sand pt-6 sm:w-[18.5rem]"
            >
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-sepia">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-serif text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-petroleum sm:text-[1.375rem]">
                {item.name}
              </h3>
              <p className="mt-4 font-sans text-[0.9375rem] font-medium text-petroleum">
                {item.price}
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Solicitar ${item.name} pelo WhatsApp`}
                className="editorial-link mt-5"
              >
                Solicitar item
              </a>
            </article>
          );
        })}
      </div>
      <div className="mt-8">
        <CatalogNav
          current={current}
          total={babyItems.length}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={!atStart && canGoPrev}
          canNext={!atEnd && canGoNext}
          prevLabel="Item anterior"
          nextLabel="Próximo item"
        />
      </div>
    </div>
  );
}

export function ConciergeServices() {
  const { ref, visible } = useReveal<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      id="concierge"
      aria-labelledby="concierge-titulo"
      className={`concierge-section scroll-mt-[4.5rem] overflow-x-hidden bg-sand pb-[clamp(5rem,10vw,9.375rem)] pt-[clamp(5rem,10vw,9.375rem)] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell px-5 md:px-5 lg:px-6">
        <header className="concierge-intro reveal-item lg:flex lg:items-end lg:justify-between lg:gap-12 xl:gap-20">
          <div className="min-w-0 lg:max-w-[min(100%,42rem)]">
            <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-sepia/90">
              Concierge MHV
            </p>
            <h2
              id="concierge-titulo"
              className="mt-4 font-serif text-[clamp(2.625rem,5vw,4.75rem)] font-medium leading-[1.06] tracking-[-0.025em] text-petroleum sm:mt-5"
            >
              Você aproveita. A gente cuida.
            </h2>
          </div>
          <p className="concierge-intro-lead mt-6 max-w-[34ch] font-sans text-[clamp(0.9375rem,1.35vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.012em] text-stone-600 lg:mt-0 lg:max-w-[22rem] lg:pb-1 xl:max-w-[24rem]">
            Serviços selecionados para tornar sua estadia mais confortável,
            prática e especial, do início ao fim.
          </p>
        </header>

        <div className={`mt-[clamp(3rem,6vh,5.5rem)] ${revealDelay(2)} reveal-item`}>
          <p className={groupLabelClass}>01 — Serviços</p>
          <div className="mt-6 lg:-mr-[max(1.25rem,calc((100vw-min(100vw,1180px))/2+1.25rem))]">
            <ServicesCarousel />
          </div>
        </div>

        <div
          className={`concierge-info reveal-item mt-[clamp(3.5rem,6vh,5.5rem)] border-t border-stone-200/45 ${revealDelay(3)}`}
          aria-label="Informações adicionais sobre serviços"
        >
          <div className="concierge-info-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {conciergeServiceRules.map((card, index) => (
              <div
                key={card.title}
                className={`concierge-info-col border-stone-200/45 py-8 sm:py-9 lg:px-8 lg:py-10 ${
                  index < conciergeServiceRules.length - 1 ? "border-b" : ""
                } ${index === 0 ? "sm:border-r sm:pr-6 lg:pr-8" : ""} ${
                  index === 1
                    ? "max-sm:border-b sm:border-b-0 lg:border-r lg:pl-6 lg:pr-8"
                    : ""
                } ${index === 2 ? "sm:col-span-2 sm:max-w-[36rem] lg:col-span-1 lg:max-w-none lg:pl-6" : "sm:pl-6 lg:pl-8"} ${
                  index === 0 ? "sm:pl-0" : ""
                }`}
              >
                <h3 className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-petroleum">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-[0.9375rem] font-normal leading-[1.72] tracking-[0.01em] text-stone-600 sm:mt-4">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-[clamp(4rem,8vh,6.5rem)] ${revealDelay(4)} reveal-item`}>
          <p className={groupLabelClass}>02 — Cardápio & compras</p>
          <div className="mt-8">
            <MenuAndShopping />
          </div>
        </div>

        <div className={`mt-[clamp(4rem,8vh,6.5rem)] ${revealDelay(5)} reveal-item`}>
          <p className={groupLabelClass}>03 — Itens infantis</p>
          <h3 className="mt-5 font-serif text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-petroleum">
            Para os pequenos
          </h3>
          <p className="mt-3 max-w-[42ch] font-sans text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em] text-stone-600">
            Itens preparados antes da chegada, mediante disponibilidade.
          </p>
          <ul className="mt-5 max-w-[46rem] list-none space-y-1.5 p-0 font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.01em] text-stone-600">
            {babyItemNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="mt-8 lg:-mr-[max(1.25rem,calc((100vw-min(100vw,1180px))/2+1.25rem))]">
            <BabyItemsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
