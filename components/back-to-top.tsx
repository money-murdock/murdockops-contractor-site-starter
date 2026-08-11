"use client"

export function BackToTop() {
  return <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top</button>
}
