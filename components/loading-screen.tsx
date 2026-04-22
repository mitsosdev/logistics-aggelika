import Image from "next/image";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-ivory">
      <div className="relative mb-6 size-14 animate-pulse">
        <Image
          src="/images/logo-v2.webp"
          alt=""
          fill
          priority
          sizes="56px"
          className="object-contain"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="relative flex size-2 items-center justify-center">
          <span className="absolute inline-flex size-4 animate-ping rounded-full bg-brand/30" />
          <span className="relative size-2 rounded-full bg-brand" />
        </span>
        <span className="font-display text-[13px] uppercase tracking-[0.22em] text-muted-ink">
          Loading
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
