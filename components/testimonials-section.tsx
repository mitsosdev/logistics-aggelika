import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { getGoogleReviews } from "@/server_actions/get-google-reviews";
import { BUSINESS } from "@/lib/general/constants";

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star
        key={i}
        className={`size-3.5 ${i < Math.round(rating) ? "fill-brand text-brand" : "text-ink/20"}`}
        strokeWidth={1.5}
      />
    ))}
  </div>
);

export const TestimonialsSection = async () => {
  const t = await getTranslations("Testimonials");
  const data = await getGoogleReviews(BUSINESS.googlePlaceId);

  const reviews = data?.reviews ?? [];
  const rating = data?.rating;
  const total = data?.user_ratings_total;
  const reviewsUrl = data?.url ?? BUSINESS.googleReviewsUrl;

  if (!reviews.length) return null;

  const [featured, ...rest] = reviews;
  const grid = rest.slice(0, 3);

  return (
    <section className="relative bg-ivory py-24 lg:py-40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Label + Google stats */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12 lg:mb-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-ink/30" />
            <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-ink">
              {t("label")}
            </span>
          </div>
          {rating ? (
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 self-start lg:self-auto"
            >
              <svg viewBox="0 0 48 48" className="size-5 shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span className="text-[14px] font-medium tabular-nums text-ink">
                {rating.toFixed(1)}
              </span>
              <Stars rating={rating} />
              {total ? (
                <span className="text-[12.5px] text-muted-ink group-hover:text-brand transition-colors">
                  {total} reviews
                </span>
              ) : null}
            </a>
          ) : null}
        </div>

        {/* Featured review */}
        <figure className="max-w-4xl mb-20 lg:mb-28">
          <span
            className="block font-display text-[120px] lg:text-[180px] leading-[0.7] text-brand/25 select-none mb-2"
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight tracking-tight text-ink font-[450] italic text-balance">
            {featured.text}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <div className="relative size-10 shrink-0 rounded-full overflow-hidden bg-paper">
              {featured.profile_photo_url ? (
                <Image
                  src={featured.profile_photo_url}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                  unoptimized
                />
              ) : null}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-[14px] text-ink">
                  {featured.author_name}
                </p>
                <Stars rating={featured.rating} />
              </div>
              <p className="text-[12px] text-muted-ink mt-0.5">
                {featured.relative_time_description}
              </p>
            </div>
          </figcaption>
        </figure>

        {/* Smaller reviews grid */}
        {grid.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-ink/10 pt-12 lg:pt-16">
            {grid.map((r, i) => (
              <figure key={`${r.author_name}-${i}`} className="group">
                <div className="mb-4">
                  <Stars rating={r.rating} />
                </div>
                <blockquote className="text-[14.5px] leading-[1.65] text-ink/85 italic font-display font-[450] mb-6 line-clamp-6">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="relative size-8 shrink-0 rounded-full overflow-hidden bg-paper">
                    {r.profile_photo_url ? (
                      <Image
                        src={r.profile_photo_url}
                        alt=""
                        fill
                        sizes="32px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-ink">
                      {r.author_name}
                    </p>
                    <p className="text-[11px] text-muted-ink mt-0.5">
                      {r.relative_time_description}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
