"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Gift, Link2, Calendar, Star } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

/**
 * 🔗 Put your Cal.com referral URL here or pass via props.
 * Consider appending UTM params like utm_source=blog&utm_medium=referral&utm_campaign=calcom
 */
const REF_URL =
  process.env.NEXT_PUBLIC_CAL_REF_URL ||
  "https://cal.link/refer-cal-com"

/**
 * 1) InlineBadge — small, unobtrusive link that fits in prose.
 */
export function CalInlineBadge({ href = REF_URL, className }: { href?: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label="Cal.com referral"
      rel="sponsored noopener"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        "bg-gradient-to-b from-muted/50 to-muted hover:from-muted hover:to-muted/80",
        "transition-colors",
        className,
      )}
    >
      <Calendar className="h-3.5 w-3.5" aria-hidden />
      <span>Book with Cal.com</span>
      <ArrowUpRight className="h-3 w-3" aria-hidden />
    </Link>
  )
}

/**
 * 2) MidPostCallout — a rich card you can drop between paragraphs.
 */
export function CalMidPostCallout({
  href = REF_URL,
  title = "Schedule smarter with Cal.com",
  bullets = ["Open-source scheduling platform", "Flexible workflows & routing", "Teams, round-robin, webhooks"],
}: {
  href?: string
  title?: string
  bullets?: string[]
}) {
  return (
    <Card className="my-8 overflow-hidden border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="leading-tight">{title}</CardTitle>
        </div>
        <Link href={href} rel="sponsored noopener" aria-label="Try Cal.com via referral">
          <Button size="sm">
            Try it <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm text-muted-foreground">
        {bullets.map((b) => (
          <div key={b} className="flex items-start gap-2">
            <Star className="mt-0.5 h-4 w-4" aria-hidden />
            <span>{b}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground/80">
        *Referral link — I may earn a commission at no extra cost to you.
      </CardFooter>
    </Card>
  )
}

/**
 * 3) StickyFooterBanner — appears after scroll, persistent but dismissible.
 */
export function CalStickyFooterBanner({ href = REF_URL, delayMs = 1200 }: { href?: string; delayMs?: number }) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const handle = setTimeout(() => setVisible(true), delayMs)
    return () => clearTimeout(handle)
  }, [delayMs])

  if (!visible) return null

  return (
    <motion.aside
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 bottom-4 z-40 mx-auto w-[min(920px,95%)]"
      role="region"
      aria-label="Cal.com sticky referral"
    >
      <div className="relative rounded-2xl border bg-background/80 p-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Gift className="h-4 w-4" aria-hidden />
            <span>
              Like my posts? Try <strong>Cal.com</strong> — powerful, open-source scheduling.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href={href} rel="sponsored noopener">
              <Button size="sm">Check it out</Button>
            </Link>
            <Button size="icon" variant="ghost" aria-label="Dismiss banner" onClick={() => setVisible(false)}>
              ×
            </Button>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

/**
 * 4) PostFooterCTA — for the end of an article.
 */
export function CalPostFooterCTA({ href = REF_URL }: { href?: string }) {
  return (
    <div className="my-12 grid gap-3 rounded-2xl border bg-muted/40 p-6 text-center">
      <h3 className="text-lg font-semibold">Ship faster by removing meeting friction</h3>
      <p className="text-sm text-muted-foreground">
        I use Cal.com to handle interviews, pair sessions, and client calls. Use my link to get started.
      </p>
      <div className="mx-auto">
        <Link href={href} rel="sponsored noopener">
          <Button>
            Start with Cal.com <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">Referral disclosure included automatically.</p>
    </div>
  )
}

/**
 * 5) ProseInline — drop inside MDX prose via a component mapping.
 */
export function CalProseInline({ href = REF_URL }: { href?: string }) {
  return (
    <span className="not-prose">
      <CalInlineBadge href={href} />
    </span>
  )
}

/**
 * 6) CompactSidebarCard — slim card for blog sidebars.
 */
export function CalCompactSidebarCard({ href = REF_URL }: { href?: string }) {
  return (
    <Card className="sticky top-24 rounded-2xl border bg-background/70 p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10">
          <Image src="/cal-com-logo-coGp.png" alt="Cal.com Logo" width={16} height={1} />
        </div>
        <div>
          <div className="text-sm font-semibold">Cal.com</div>
          <div className="text-xs text-muted-foreground">Scheduling that doesn’t suck</div>
        </div>
      </div>
      <Link href={href} rel="sponsored noopener">
        <Button className="w-full">Use my referral</Button>
      </Link>
      <p className="mt-2 text-xs text-muted-foreground">*I may earn a commission.</p>
    </Card>
  )
}

/**
 * 7) Usage examples (copy into your MDX/TSX):
 *
 * <CalMidPostCallout />
 * <CalProseInline />
 * <CalPostFooterCTA />
 * <CalStickyFooterBanner />
 * <CalCompactSidebarCard />
 */

/**
 * Optional: Disclosure helper — render once in your site footer or near the CTA.
 */
export function ReferralDisclosure({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      This page includes a referral link to Cal.com. If you sign up using it, I may earn a commission at no extra cost
      to you.
    </p>
  )
}

/**
 * A11y & SEO notes:
 * - All referral Links carry rel="sponsored noopener".
 * - aria-labels added to clarify purpose for screen readers.
 * - Keep copy concise; avoid modal popups unless user intent is high.
 */

export default function DemoAll() {
  return (
    <div className="mx-auto max-w-2xl space-y-10 p-6">
      <h2 className="text-2xl font-bold">Cal.com Referral UI — Demo</h2>
      <p className="prose prose-sm dark:prose-invert">
        Inline badge example: <CalProseInline /> inside a paragraph.
      </p>
      <CalMidPostCallout />
      <CalPostFooterCTA />
      <CalCompactSidebarCard />
      <CalStickyFooterBanner />
      <ReferralDisclosure />
    </div>
  )
}
