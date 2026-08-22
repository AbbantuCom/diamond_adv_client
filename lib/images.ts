/** An image in `public/` together with the intrinsic size next/image needs. */
export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** Every lawyer portrait is exported at the same square size. */
export const portrait = { width: 949, height: 949 } as const;

export const logo = { width: 1900, height: 717 } as const;
export const partnerLogo = { width: 1024, height: 386 } as const;
