import { useRef } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
  caption: string
  /** Resolved URL — if missing, the card is not rendered. */
  src: string
  className?: string
}

export function ExperienceImageCard({ caption, src, className }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <Card
      className={cn(
        "overflow-hidden border-border/80 bg-card/90 backdrop-blur-[2px] transition-all duration-200",
        "hover:border-foreground/25 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <CardContent className="p-0">
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="group flex min-h-[11rem] w-full cursor-zoom-in items-center justify-center border-b border-border bg-[#F4F1EA] p-2 sm:min-h-[13rem]"
          aria-label={`Enlarge: ${caption}`}
        >
          <img
            src={src}
            alt={caption}
            className="max-h-[16rem] w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        </button>
      </CardContent>
      <CardFooter className="border-t border-border/60 bg-muted/20 px-3 py-2">
        <p className="w-full text-center font-mono text-[11px] leading-snug text-muted-foreground">{caption}</p>
      </CardFooter>

      {/* Click anywhere (or Esc) to close */}
      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        className="m-auto max-h-none max-w-none cursor-zoom-out bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <figure className="flex max-h-[92vh] w-[min(96vw,1400px)] flex-col items-center gap-3">
          <img src={src} alt={caption} className="max-h-[84vh] w-full border border-border bg-[#F4F1EA] object-contain" />
          <figcaption className="font-mono text-xs text-white/85">{caption}</figcaption>
        </figure>
      </dialog>
    </Card>
  )
}
