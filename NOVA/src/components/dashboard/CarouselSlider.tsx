import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './CarouselSlider.css'

export type CarouselViewMode = 'single' | 'multi'

/**
 * Responsive visible items configuration.
 * Pass a number to use the same value at all breakpoints,
 * or an object to specify different values per breakpoint:
 *
 * @example { base: 1, sm: 2, md: 3, lg: 4 }
 *
 * Breakpoints match Tailwind defaults:
 * - base: 0px+
 * - sm:   640px+
 * - md:   768px+
 * - lg:   1024px+
 * - xl:   1280px+
 */
export type VisibleItemsConfig =
  | number
  | { base: number; sm?: number; md?: number; lg?: number; xl?: number }

export interface CarouselSliderProps {
  /** Array of React nodes to render as slides */
  items: React.ReactNode[]
  /** Whether to auto-play slides (default: false) */
  autoPlay?: boolean
  /** Interval in ms between auto-play transitions (default: 5000) */
  interval?: number
  /** Unique id for this carousel instance (for accessibility) */
  id?: string
  /**
   * Minimum drag distance as a fraction of slide width to trigger navigation.
   * Default: 0.25 (25% of the slide width)
   */
  swipeThreshold?: number
  /**
   * "single" — one item at a time, full width, snap navigation (default)
   * "multi" — multiple items visible at once, free-scroll (no snapping)
   */
  viewMode?: CarouselViewMode
  /**
   * How many items are visible at once in "multi" mode.
   * Accepts a number (static) or an object with breakpoint keys for responsive behavior.
   * Default: 3
   *
   * @example
   * // Static
   * visibleItems={3}
   * // Responsive
   * visibleItems={{ base: 1, sm: 2, md: 3 }}
   */
  visibleItems?: VisibleItemsConfig
  /**
   * Minimum width (in px) for each item in "multi" mode.
   * When set, the carousel auto-calculates how many items fit by dividing
   * the container width by this value (floor). Takes priority over `visibleItems`.
   *
   * @example
   * // Each item at least 280px wide — fits 3 on a 900px container
   * minItemWidth={280}
   */
  minItemWidth?: number
}

const CarouselSlider: React.FC<CarouselSliderProps> = ({
  items,
  autoPlay = false,
  interval = 5000,
  id = 'carousel',
  swipeThreshold = 0.25,
  viewMode = 'single',
  visibleItems = 3,
  minItemWidth,
}) => {
  const isMulti = viewMode === 'multi'

  // ── State ──
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  // ── Refs (for synchronous access in event handlers) ──
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStartRef = useRef(0)
  const isDraggingRef = useRef(false)
  const currentIndexRef = useRef(0)
  const scrollOffsetRef = useRef(0)
  // For single-mode: accumulate drag delta to decide navigate-or-snap
  const dragAccumRef = useRef(0)
  // For multi-mode: baseline scroll offset at drag start
  const baseOffsetRef = useRef(0)
  // Keep button callbacks fresh
  const goNextRef = useRef<() => void>(() => {})
  const goPrevRef = useRef<() => void>(() => {})
  const wheelDebounceRef = useRef(0)
  const trackWrapRef = useRef<HTMLElement | null>(null)

  const totalSlides = items.length

  // ── effectiveVisible resolution ──
  // Strategy 1: minItemWidth auto-calculates from container width (highest priority)
  // Strategy 2: visibleItems uses breakpoint-configurable counts (fallback)

  const useMinItemWidth = isMulti && minItemWidth !== undefined && minItemWidth > 0

  const [effectiveVisible, setEffectiveVisible] = useState(() => {
    if (!isMulti) return 1
    return 1 // placeholder — updated by effects below
  })

  // Strategy 1: ResizeObserver for minItemWidth
  // useLayoutEffect avoids a flash — reads DOM before paint
  useLayoutEffect(() => {
    if (!useMinItemWidth) return
    const el = trackRef.current?.parentElement
    if (!el) return
    const update = (entries?: ResizeObserverEntry[]) => {
      const width =
        entries?.[0]?.contentRect?.width ?? el.clientWidth
      setEffectiveVisible(Math.max(1, Math.floor(width / minItemWidth)))
    }
    update()
    const observer = new ResizeObserver((entries) => update(entries))
    observer.observe(el)
    return () => observer.disconnect()
  }, [useMinItemWidth, minItemWidth])

  // Strategy 2: Breakpoint listeners for visibleItems (only when minItemWidth is NOT used)
  useEffect(() => {
    if (useMinItemWidth) return
    if (!isMulti) {
      setEffectiveVisible(1)
      return
    }
    if (typeof visibleItems === 'number') {
      setEffectiveVisible(visibleItems)
      return
    }
    const bp = visibleItems
    const queries = [
      { query: '(min-width: 1280px)', key: 'xl' as const },
      { query: '(min-width: 1024px)', key: 'lg' as const },
      { query: '(min-width: 768px)', key: 'md' as const },
      { query: '(min-width: 640px)', key: 'sm' as const },
    ]
    const update = () => {
      for (const { query, key } of queries) {
        if (window.matchMedia(query).matches && bp[key] !== undefined) {
          setEffectiveVisible(bp[key]!)
          return
        }
      }
      setEffectiveVisible(bp.base)
    }
    update()
    const mqls = queries.map(({ query }) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', update)
      return mql
    })
    return () => {
      mqls.forEach((mql) => mql.removeEventListener('change', update))
    }
  }, [visibleItems, isMulti, useMinItemWidth])

  // Keep refs in sync
  currentIndexRef.current = currentIndex
  scrollOffsetRef.current = scrollOffset

  // Compute max scroll offset for multi mode
  const getMaxScroll = useCallback(() => {
    const trackWidth = trackRef.current?.clientWidth ?? 1
    const itemWidth = trackWidth / effectiveVisible
    return Math.max(0, totalSlides * itemWidth - trackWidth)
  }, [totalSlides, effectiveVisible])

  // Clamp scrollOffset when effectiveVisible changes (e.g. on resize)
  useEffect(() => {
    if (!isMulti) return
    const maxScroll = getMaxScroll()
    setScrollOffset((prev) => {
      const clamped = Math.max(-maxScroll, Math.min(0, prev))
      scrollOffsetRef.current = clamped
      return clamped
    })
  }, [effectiveVisible, isMulti, getMaxScroll])

  // ── Navigation (single mode only) ──
  const goTo = useCallback(
    (index: number) => {
      if (index < 0) {
        setCurrentIndex(totalSlides - 1)
      } else if (index >= totalSlides) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex(index)
      }
    },
    [totalSlides]
  )

  const goNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex])
  const goPrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex])

  // ── Multi-mode scroll helpers ──
  const scrollBy = useCallback(
    (deltaPx: number) => {
      setScrollOffset((prev) => {
        const maxScroll = getMaxScroll()
        const next = Math.max(-maxScroll, Math.min(0, prev + deltaPx))
        scrollOffsetRef.current = next
        return next
      })
    },
    [getMaxScroll]
  )

  const scrollToPage = useCallback(
    (direction: 1 | -1) => {
      const trackWidth = trackRef.current?.clientWidth ?? 1
      // Scroll by one visible-page width
      scrollBy(direction * trackWidth * -1)
    },
    [scrollBy]
  )

  // ── Auto-play ──
  useEffect(() => {
    if (!autoPlay || isHovered || isDragging || totalSlides <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      if (isMulti) {
        scrollToPage(1)
      } else {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }
    }, interval)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [autoPlay, interval, totalSlides, isHovered, isDragging, isMulti, scrollToPage])

  // Keep button refs in sync on every render
  goNextRef.current = isMulti ? () => scrollToPage(1) : goNext
  goPrevRef.current = isMulti ? () => scrollToPage(-1) : goPrev

  // ── Wheel handler (attached via native addEventListener with { passive: false }) ──
  useEffect(() => {
    const el = trackWrapRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (totalSlides <= 1) return
      if (isMulti && totalSlides <= effectiveVisible) return

      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      if (isMulti) {
        if (absX < 10 && absY < 10) return

        if (absX > absY) {
          scrollBy(-e.deltaX * 0.6)
          e.preventDefault()
        }
        return
      }

      // Single mode
      const now = Date.now()
      if (now - wheelDebounceRef.current < 400) return

      if (absX < 10 && absY < 10) return

      if (absX > absY) {
        if (e.deltaX > 0) goNextRef.current()
        else goPrevRef.current()
      } else {
        if (e.deltaY > 0) goNextRef.current()
        else goPrevRef.current()
      }

      wheelDebounceRef.current = now
      e.preventDefault()
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [totalSlides, isMulti, effectiveVisible, scrollBy])

  // ── Pointer handlers ──

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (totalSlides <= 1) return
      if (isMulti && totalSlides <= effectiveVisible) return

      ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
      dragStartRef.current = e.clientX

      if (isMulti) {
        baseOffsetRef.current = scrollOffsetRef.current
      } else {
        dragAccumRef.current = 0
      }

      setIsDragging(true)
      isDraggingRef.current = true
      setDragOffset(0)
    },
    [totalSlides, isMulti, effectiveVisible]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return
      const delta = e.clientX - dragStartRef.current

      if (isMulti) {
        // Free scroll: directly compute new offset from the baseline
        const maxScroll = getMaxScroll()
        const newOffset = Math.max(-maxScroll, Math.min(0, baseOffsetRef.current + delta))
        setScrollOffset(newOffset)
        scrollOffsetRef.current = newOffset
      } else {
        // Single mode: show clamped drag offset, decide snap later
        dragAccumRef.current = delta
        const trackWidth = trackRef.current?.clientWidth ?? 1
        const maxClamp = trackWidth * 0.35
        const clamped = Math.max(-maxClamp, Math.min(maxClamp, delta))
        setDragOffset(clamped)
      }
    },
    [isMulti, getMaxScroll]
  )

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return

    if (!isMulti) {
      const trackWidth = trackRef.current?.clientWidth ?? 1
      const threshold = trackWidth * swipeThreshold
      const absDelta = Math.abs(dragAccumRef.current)

      if (absDelta > threshold) {
        if (dragAccumRef.current < 0) goNextRef.current()
        else goPrevRef.current()
      }
    }
    // Multi mode: offset is already committed during drag — just cleanup

    setIsDragging(false)
    isDraggingRef.current = false
    setDragOffset(0)
  }, [swipeThreshold, isMulti])

  const handlePointerCancel = useCallback(() => {
    setIsDragging(false)
    isDraggingRef.current = false
    setDragOffset(0)
  }, [])

  // ── Track transform ──
  const trackTransform = isMulti
    ? `translateX(${scrollOffset}px)`
    : isDragging
      ? `translateX(calc(${-currentIndex * 100}% + ${dragOffset}px))`
      : `translateX(${-currentIndex * 100}%)`

  if (!items || totalSlides === 0) return null

  const slideWidth = isMulti ? `${100 / effectiveVisible}%` : '100%'

  return (
    <div
      className={`carousel-slider${isMulti ? ' carousel-slider-multi' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured content"
      id={`carousel-${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides container */}
      <div
        className="carousel-track-wrap"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          ref={(node) => {
            trackRef.current = node
            trackWrapRef.current = node?.parentElement ?? null
          }}
          className={`carousel-track${isDragging ? ' carousel-track-dragging' : ''}${isMulti ? ' carousel-track-multi' : ''}`}
          style={{ transform: trackTransform }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`carousel-slide${isMulti ? ' carousel-slide-multi' : ''}`}
              style={isMulti ? { minWidth: slideWidth } : { flex: '0 0 100%' }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${totalSlides}`}
              aria-hidden={!isMulti && index !== currentIndex}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Prev / Next buttons */}
        {totalSlides > 1 && (
          <>
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={() => goPrevRef.current()}
              aria-label="Previous slide"
              type="button"
            >
              <ChevronLeft className="carousel-btn-icon" />
            </button>
            <button
              className="carousel-btn carousel-btn-next"
              onClick={() => goNextRef.current()}
              aria-label="Next slide"
              type="button"
            >
              <ChevronRight className="carousel-btn-icon" />
            </button>
          </>
        )}
      </div>

      {/* Dots navigation — only in single mode */}
      {!isMulti && totalSlides > 1 && (
        <div className="carousel-dots" role="tablist" aria-label="Slide navigation">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'carousel-dot-active' : ''}`}
              onClick={() => goTo(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CarouselSlider
