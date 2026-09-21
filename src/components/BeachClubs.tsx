import { Fragment } from "react";
import {
  beachClubs,
  getBeachClubMapsUrl,
  getBeachClubPhoneHref,
  type BeachClub,
} from "../data/beachClubs";
import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const actionLinkClass =
  "editorial-link !mt-0 inline-flex min-h-11 items-center !text-[0.6875rem] !tracking-[0.12em]";

const actionDotClass =
  "select-none px-2.5 font-sans text-[0.6875rem] font-medium text-stone-300";

function isValidHref(href: string | undefined | null): href is string {
  if (typeof href !== "string") return false;
  const value = href.trim();
  if (!value) return false;
  if (value.startsWith("tel:")) {
    return value.replace(/\D/g, "").length > 0;
  }
  return /^https?:\/\//i.test(value);
}

type ClubAction = {
  href: string;
  label: string;
  ariaLabel: string;
  external: boolean;
};

function getClubActions(club: BeachClub): ClubAction[] {
  const actions: ClubAction[] = [];

  const mapsHref = getBeachClubMapsUrl(club);
  if (isValidHref(mapsHref)) {
    actions.push({
      href: mapsHref,
      label: "Ver no mapa",
      ariaLabel: `Ver ${club.name} no mapa`,
      external: true,
    });
  }

  const phone = club.phone?.trim();
  if (phone) {
    const phoneHref = getBeachClubPhoneHref(phone);
    if (isValidHref(phoneHref)) {
      actions.push({
        href: phoneHref,
        label: "Contato",
        ariaLabel: `Contato de ${club.name}`,
        external: false,
      });
    }
  }

  const instagramHref = club.instagram?.trim().replace(/\?.*$/, "");
  if (isValidHref(instagramHref)) {
    actions.push({
      href: instagramHref,
      label: "Instagram",
      ariaLabel: `Ver perfil de ${club.name} no Instagram`,
      external: true,
    });
  }

  return actions;
}

function ClubActionLink({
  href,
  label,
  ariaLabel,
  external,
}: ClubAction) {
  if (!href) return null;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={actionLinkClass}
    >
      {label}
    </a>
  );
}

function ClubImage({ club }: { club: BeachClub }) {
  if (club.image) {
    return (
      <img
        src={club.image}
        alt=""
        width={1200}
        height={1500}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`h-full w-full ${club.imageFit === "contain" ? "object-contain" : "object-cover"}`}
        style={
          club.objectPosition
            ? { objectPosition: club.objectPosition }
            : undefined
        }
      />
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-stone-200/30 px-6 text-center"
      aria-hidden
    >
      <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-sepia/80">
        {club.location}
      </span>
      <span className="mt-2 font-serif text-[0.9375rem] font-medium text-petroleum/65">
        Imagem em breve
      </span>
    </div>
  );
}

function ClubCard({ club }: { club: BeachClub }) {
  const actions = getClubActions(club);

  return (
    <article>
      <div className="aspect-[4/5] overflow-hidden bg-stone-200/40">
        <ClubImage club={club} />
      </div>
      <p className="editorial-caption mt-6">{club.location}</p>
      <h3 className="mt-2 font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-normal leading-[1.15] tracking-[-0.02em] text-petroleum">
        {club.name}
      </h3>
      <p className="mt-3 max-w-[36ch] font-sans text-[0.875rem] font-normal leading-[1.7] tracking-[0.01em] text-stone-600 sm:text-[0.9375rem]">
        {club.description}
      </p>
      {actions.length > 0 ? (
        <nav
          className="mt-5 flex flex-wrap items-center"
          aria-label={`Contatos de ${club.name}`}
        >
          {actions.map((action, actionIndex) => (
            <Fragment key={action.label}>
              {actionIndex > 0 ? (
                <span className={actionDotClass} aria-hidden>
                  ·
                </span>
              ) : null}
              <ClubActionLink {...action} />
            </Fragment>
          ))}
        </nav>
      ) : null}
    </article>
  );
}

export function BeachClubs() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="beach-clubs"
      className={`section-pad scroll-mt-[4.5rem] bg-sand ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className={`reveal-item max-w-[36rem] ${revealDelay(1)}`}>
          <p className="editorial-label">Beach Clubs</p>
          <h2 className="section-title mt-5">À beira-mar</h2>
          <p className="section-lead">
            Experiências de day use na Rota dos Milagres, com estrutura à
            beira-mar para passar o dia.
          </p>
        </header>

        <div
          className={`mt-12 grid grid-cols-1 gap-16 sm:mt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:mt-16 lg:gap-x-12 xl:gap-x-14 ${revealDelay(2)} reveal-item`}
        >
          {beachClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </section>
  );
}
