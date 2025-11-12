import { NextRequest, NextResponse } from "next/server";

export const slugs = [
  "catit-flower-fountain",
  "petlibro-dockstream-fountain",
  "petsafe-drinkwell-fountain",
  "veken-water-fountain",
  "gokeep-electric-bike",
  "schwinn-network-bike",
  "sataway-kickstand",
  "vivi-electric-bike",
  "cycplus-portable-compressor",
];

export function middleware(req: NextRequest) {
  const referer = req.headers.get("referer") || "";

  if (referer.startsWith("https://cycle-nest.com")) {
    const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];
    const url = req.nextUrl.clone();
    url.pathname = `/product/${randomSlug}`;

    const res = NextResponse.redirect(url);
    res.cookies.set("purr", "true", { path: "/", maxAge: 60 });

    return res;
  }
}

export const config = {
  matcher: ["/nest"],
};
