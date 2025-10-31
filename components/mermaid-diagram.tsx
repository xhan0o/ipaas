'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

// Initialize Mermaid once
let mermaidInitialized = false

const initializeMermaid = () => {
  if (mermaidInitialized) return

  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  const theme = isDark ? 'dark' : 'default'

  mermaid.initialize({
    startOnLoad: false,
    theme,
    securityLevel: 'loose',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'linear',
      padding: 8,
      nodeSpacing: 50,
      rankSpacing: 50,
    },
    sequence: {
      useMaxWidth: true,
      boxMargin: 16,
      messageMargin: 28,
    },
    class: {
      useMaxWidth: true,
    },
    themeVariables: {
      primaryColor: '#3b82f6',
      primaryTextColor: isDark ? '#f1f5f9' : '#1e293b',
      primaryBorderColor: '#2563eb',
      lineColor: isDark ? '#64748b' : '#94a3b8',
      secondaryColor: isDark ? '#1e293b' : '#f1f5f9',
      tertiaryColor: isDark ? '#334155' : '#e2e8f0',
      background: isDark ? '#1e293b' : '#ffffff',
      mainBkgColor: isDark ? '#1e293b' : '#ffffff',
      secondBkgColor: isDark ? '#334155' : '#f8fafc',
      edgeLabelBackground: isDark ? '#0f172a' : '#ffffff',
      fontFamily: 'ui-sans-serif, system-ui, Inter, Segoe UI, Roboto, Helvetica, Arial',
      fontSize: '13px',
      clusterBkg: isDark ? '#0b1220' : '#f8fafc',
      clusterBorder: isDark ? '#334155' : '#e2e8f0',
    },
    themeCSS: `
      svg { max-width: 100%; height: auto; }
      .edgeLabel, .label { font-weight: 500; }
      .node rect, .node circle, .node polygon { rx: 6; ry: 6; stroke-width: 1.25px; }
      .cluster rect { rx: 8; ry: 8; }
      .edgePath .path { stroke-width: 1.25px; }
    `,
  })

  mermaidInitialized = true
}

interface MermaidDiagramProps {
  chart: string
  title?: string
  description?: string
}

export function MermaidDiagram({ chart, title, description }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRendering, setIsRendering] = useState(true)

  useEffect(() => {
    if (!ref.current || !chart) return

    let isMounted = true

    const renderDiagram = async () => {
      try {
        setIsRendering(true)
        setError(null)

        if (!ref.current || typeof window === 'undefined') return

        // Initialize Mermaid if needed
        initializeMermaid()

        const id = `mermaid-${Math.random().toString(36).substring(7)}`

        // Render the diagram using render method
        let { svg } = await mermaid.render(id, chart)

        // Make SVG responsive: width 100%
        svg = svg.replace(/width="[^"]+"/g, 'width="100%"')

        if (isMounted && ref.current) {
          ref.current.innerHTML = svg
          setIsRendering(false)
        }
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err)
        if (isMounted && ref.current) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram')
          setIsRendering(false)
        }
      }
    }

    renderDiagram()

    return () => {
      isMounted = false
    }
  }, [chart])

  return (
    <div className="space-y-3">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6 overflow-x-auto">
        {isRendering && (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="text-sm text-muted-foreground">Loading diagram...</div>
          </div>
        )}
        {error && (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="text-sm text-destructive">{error}</div>
          </div>
        )}
        <div ref={ref} className={isRendering || error ? 'hidden' : 'block'} />
      </div>
    </div>
  )
}

