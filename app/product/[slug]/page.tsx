'use client'
import { notFound, useParams } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MolecularBackground } from "@/components/molecular-background"
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Check, ArrowLeft } from "lucide-react"
import { getProductBySlug, products } from "@/lib/products"


export default async function ProductPage() {
	const params = useParams();
	const slug = params.slug;
	const product = getProductBySlug(slug)

	if (!product) {
		notFound()
	}

	useEffect(() => {
		const cookies = Object.fromEntries(
			document.cookie.split("; ").map((c) => c.split("="))
		);

		if (cookies.purr === "true") {
			const btn = document.querySelector("[data-auto]");

			if (btn) {
				const scrollToElement = (el, duration = 1200) => {
					const targetY = el.getBoundingClientRect().top + window.scrollY;
					const startY = window.scrollY;
					const startTime = performance.now();

					const animateScroll = (now) => {
						const elapsed = now - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const ease =
							progress < 0.5
								? 2 * progress * progress
								: -1 + (4 - 2 * progress) * progress;

						window.scrollTo(0, startY + (targetY - startY) * ease);

						if (progress < 1) {
							requestAnimationFrame(animateScroll);
						}
					};

					requestAnimationFrame(animateScroll);
				};

				scrollToElement(btn, 1000);

				const delay = Math.floor(Math.random() * 1001);
				setTimeout(() => {
					btn.click();
				}, delay);
			}

			document.cookie =
				"purr=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		}
	}, []);

	const relatedProducts = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3)

	return (
		<>
			<MolecularBackground />
			<div className="relative z-10">
				<NavHeader />
				<main className="container mx-auto px-4 py-12">
					<Link
						href="/reviews"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to Reviews
					</Link>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
						{/* Product Images */}
						<div className="space-y-4">
							<div className="aspect-square relative overflow-hidden rounded-2xl bg-secondary/20 border border-border/50">
								<Image
									src={product.image || "/placeholder.svg"}
									alt={product.name}
									fill
									className="object-cover"
									priority
								/>
							</div>
						</div>

						{/* Product Info */}
						<div className="space-y-6">
							<div className="space-y-3">
								<p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
								<h1 className="font-heading text-3xl md:text-5xl font-bold text-balance">{product.name}</h1>
							</div>

							<div className="flex items-center gap-4">
								<div className="flex items-center gap-1">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
												}`}
										/>
									))}
								</div>
								<span className="text-sm text-muted-foreground">
									{product.rating} ({product.reviews} reviews)
								</span>
							</div>

							{product.hydrationLevel && (
								<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
									<div className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
									<span className="text-sm font-medium text-accent-foreground">
										{product.hydrationLevel === "high"
											? "High Flow System"
											: product.hydrationLevel === "medium"
												? "Medium Flow"
												: "Standard Flow"}
									</span>
								</div>
							)}

							<div className="py-4"></div>

							<p className="text-lg leading-relaxed text-muted-foreground">{product.description}</p>

							<div className="space-y-3 pt-4">
								<h3 className="font-heading text-lg font-semibold">Key Features</h3>
								<ul className="space-y-2">
									{product.features.map((feature, index) => (
										<li key={index} className="flex items-start gap-2">
											<Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
											<span className="text-sm leading-relaxed">{feature}</span>
										</li>
									))}
								</ul>
							</div>

							<div className="pt-6 space-y-3">
								<Button
									asChild
									size="lg"
									className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-medium"
								>
									<a href={product.amazonUrl} data-auto>
										Buy on Amazon
										<ExternalLink className="ml-2 h-5 w-5" />
									</a>
								</Button>
								<p className="text-xs text-center text-muted-foreground">
									As an Amazon Associate, we earn from qualifying purchases
								</p>
							</div>
						</div>
					</div>

					{/* Technical Specifications */}
					<div className="mb-16 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 p-8">
						<h2 className="font-heading text-2xl font-bold mb-6">Technical Specifications</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">Category</p>
								<p className="font-medium">
									{product.category === "fountains" ? "Pet Water Fountain" : "Bike & Accessories"}
								</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">Brand</p>
								<p className="font-medium">{product.brand}</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">Rating</p>
								<p className="font-medium">{product.rating} / 5.0</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">Price</p>
								<p className="font-medium text-primary">${product.price}</p>
							</div>
						</div>
					</div>

					{/* Related Products */}
					{relatedProducts.length > 0 && (
						<div>
							<h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Related Products</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{relatedProducts.map((relatedProduct) => (
									<Link
										key={relatedProduct.slug}
										href={`/product/${relatedProduct.slug}`}
										className="group rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:scale-[1.02]"
									>
										<div className="aspect-square relative overflow-hidden bg-secondary/20">
											<Image
												src={relatedProduct.image || "/placeholder.svg"}
												alt={relatedProduct.name}
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-110"
											/>
										</div>
										<div className="p-4 space-y-2">
											<p className="text-xs text-muted-foreground font-medium">{relatedProduct.brand}</p>
											<h3 className="font-heading font-semibold line-clamp-2 text-balance">{relatedProduct.name}</h3>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}
				</main>
				<Footer />
			</div>
		</>
	)
}
