/**
 * Product illustrations — one per slug.
 * Line-art SVG style, designed to fill a large viewport-responsive container.
 * Stroke colour: olive (#3C4A2E). Accent: gold (#B8963E).
 */

export function MailerBoxIllustration() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Corrugated mailer box illustration"
    >
      {/* ── Box body (front face) ── */}
      <rect x="80" y="170" width="260" height="180" rx="3" stroke="#3C4A2E" strokeWidth="2" />

      {/* ── Right side panel (perspective) ── */}
      <path d="M340 170 L400 130 L400 310 L340 350" stroke="#3C4A2E" strokeWidth="2" fill="none" />

      {/* ── Top face ── */}
      <path d="M80 170 L140 130 L400 130 L340 170 Z" stroke="#3C4A2E" strokeWidth="2" fill="none" />

      {/* ── Corrugated texture on front face ── */}
      {[200, 218, 236, 254, 272, 290, 308, 326].map((x) => (
        <line key={x} x1={x} y1="170" x2={x} y2="350" stroke="#3C4A2E" strokeWidth="0.8" opacity="0.25" />
      ))}

      {/* ── Corrugated texture on right side panel ── */}
      {[360, 376, 392].map((x) => (
        <line key={x} x1={x} y1="130" x2={x - 20} y2="310" stroke="#3C4A2E" strokeWidth="0.8" opacity="0.2" />
      ))}

      {/* ── Top flap (partially open) ── */}
      <path
        d="M80 170 L80 95 L200 95 L200 170"
        stroke="#3C4A2E" strokeWidth="2" fill="none"
      />
      {/* Flap right half */}
      <path
        d="M200 170 L200 108 L340 108 L340 170"
        stroke="#3C4A2E" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.5"
      />
      {/* Flap fold crease line */}
      <line x1="200" y1="95" x2="200" y2="170" stroke="#B8963E" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.7" />

      {/* ── Tuck top edge detail ── */}
      <line x1="80" y1="95" x2="340" y2="108" stroke="#3C4A2E" strokeWidth="1" opacity="0.35" />

      {/* ── Label area on front ── */}
      <rect x="115" y="205" width="150" height="95" rx="2" stroke="#B8963E" strokeWidth="1.5" opacity="0.55" />
      <line x1="128" y1="232" x2="252" y2="232" stroke="#B8963E" strokeWidth="1" opacity="0.4" />
      <line x1="128" y1="248" x2="240" y2="248" stroke="#B8963E" strokeWidth="1" opacity="0.3" />
      <line x1="128" y1="264" x2="225" y2="264" stroke="#B8963E" strokeWidth="1" opacity="0.3" />

      {/* ── Bottom fold line ── */}
      <line x1="80" y1="330" x2="340" y2="330" stroke="#3C4A2E" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.3" />
      <line x1="340" y1="330" x2="400" y2="290" stroke="#3C4A2E" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.3" />

      {/* ── Small corrugated cross-section detail (bottom-right) ── */}
      <path d="M348 338 Q356 332 364 338 Q372 344 380 338" stroke="#3C4A2E" strokeWidth="1" opacity="0.3" fill="none" />
      <path d="M348 344 Q356 338 364 344 Q372 350 380 344" stroke="#3C4A2E" strokeWidth="1" opacity="0.3" fill="none" />
    </svg>
  );
}

export function RigidBoxIllustration() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Magnetic closure rigid box illustration"
    >
      {/* ── Box base ── */}
      <rect x="70" y="210" width="280" height="150" rx="3" stroke="#3C4A2E" strokeWidth="2.2" />
      {/* Base right side panel */}
      <path d="M350 210 L408 172 L408 322 L350 360" stroke="#3C4A2E" strokeWidth="2" fill="none" />
      {/* Base top edge */}
      <line x1="70" y1="210" x2="130" y2="172" stroke="#3C4A2E" strokeWidth="2" opacity="0.6" />
      <line x1="130" y1="172" x2="408" y2="172" stroke="#3C4A2E" strokeWidth="2" opacity="0.6" />
      <line x1="350" y1="210" x2="408" y2="172" stroke="#3C4A2E" strokeWidth="2" opacity="0.6" />

      {/* ── Interior visible inside base ── */}
      <rect x="82" y="220" width="258" height="130" rx="2" stroke="#3C4A2E" strokeWidth="0.8" opacity="0.3" />

      {/* ── Lid (open at ~30° angle) ── */}
      {/* Lid front face */}
      <path d="M70 210 L70 130 L350 130 L350 210 Z" stroke="#3C4A2E" strokeWidth="2.2" fill="none" />
      {/* Lid right side panel */}
      <path d="M350 130 L408 92 L408 172 L350 210" stroke="#3C4A2E" strokeWidth="2" fill="none" />
      {/* Lid top face */}
      <path d="M70 130 L130 92 L408 92 L350 130 Z" stroke="#3C4A2E" strokeWidth="2" fill="none" />

      {/* ── Lid inner inset ── */}
      <rect x="80" y="139" width="260" height="62" rx="1.5" stroke="#3C4A2E" strokeWidth="0.8" opacity="0.25" />

      {/* ── Magnet dots ── */}
      <circle cx="115" cy="208" r="5" stroke="#B8963E" strokeWidth="1.8" />
      <circle cx="305" cy="208" r="5" stroke="#B8963E" strokeWidth="1.8" />

      {/* ── Magnetic catch indicators on lid ── */}
      <circle cx="115" cy="212" r="4" stroke="#B8963E" strokeWidth="1" opacity="0.4" />
      <circle cx="305" cy="212" r="4" stroke="#B8963E" strokeWidth="1" opacity="0.4" />

      {/* ── Ribbon pull ── */}
      <line x1="210" y1="210" x2="210" y2="360" stroke="#B8963E" strokeWidth="1.2" opacity="0.5" />
      <path d="M192 360 Q210 368 228 360" stroke="#B8963E" strokeWidth="1.2" fill="none" opacity="0.5" />

      {/* ── Subtle emboss lines on lid ── */}
      <line x1="105" y1="148" x2="335" y2="148" stroke="#3C4A2E" strokeWidth="0.6" opacity="0.2" />
      <line x1="105" y1="160" x2="290" y2="160" stroke="#3C4A2E" strokeWidth="0.6" opacity="0.15" />

      {/* ── Foil stamp accent ── */}
      <ellipse cx="210" cy="175" rx="28" ry="10" stroke="#B8963E" strokeWidth="1" opacity="0.4" />
      <line x1="196" y1="175" x2="224" y2="175" stroke="#B8963E" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}

export function MylarbagIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Stand-up mylar pouch illustration"
    >
      {/* ── Outer bag body ── */}
      <path
        d="M130 380 Q122 300 115 205 Q113 170 155 148 L230 138 L325 138 Q365 148 365 185 Q358 300 350 380 Z"
        stroke="#3C4A2E" strokeWidth="2.2" fill="none"
      />

      {/* ── Bottom gusset curve ── */}
      <path
        d="M130 380 Q155 360 210 354 Q240 350 270 354 Q310 360 350 380"
        stroke="#3C4A2E" strokeWidth="1.8" fill="none"
      />
      {/* Bottom gusset inner curve */}
      <path
        d="M148 375 Q180 360 240 356 Q285 360 332 375"
        stroke="#3C4A2E" strokeWidth="0.8" opacity="0.3" fill="none"
      />

      {/* ── Seal at top (header) ── */}
      <path d="M155 148 L155 108 L325 108 L325 148" stroke="#3C4A2E" strokeWidth="1.8" fill="none" />
      {/* Heat-seal lines */}
      <line x1="155" y1="120" x2="325" y2="120" stroke="#3C4A2E" strokeWidth="0.8" opacity="0.3" />
      <line x1="155" y1="130" x2="325" y2="130" stroke="#3C4A2E" strokeWidth="0.8" opacity="0.3" />
      {/* Notch */}
      <path d="M308 108 L316 96 L324 108" stroke="#3C4A2E" strokeWidth="1.2" fill="none" />

      {/* ── Zipper track ── */}
      <line x1="128" y1="172" x2="363" y2="172" stroke="#3C4A2E" strokeWidth="2.5" />
      {/* Zipper teeth */}
      {[140, 152, 164, 176, 188, 200, 212, 224, 236, 248, 260, 272, 284, 296, 308, 320, 332, 344].map((x) => (
        <rect key={x} x={x} y="168" width="5" height="4" rx="0.5" stroke="#3C4A2E" strokeWidth="0.6" />
      ))}
      {/* Zipper slider */}
      <rect x="228" y="164" width="22" height="12" rx="2" stroke="#B8963E" strokeWidth="1.5" />
      <line x1="239" y1="164" x2="239" y2="176" stroke="#B8963E" strokeWidth="1" />

      {/* ── Label / print area ── */}
      <rect x="148" y="195" width="185" height="130" rx="3" stroke="#B8963E" strokeWidth="1.5" opacity="0.6" />
      {/* Label inner lines */}
      <line x1="165" y1="225" x2="316" y2="225" stroke="#B8963E" strokeWidth="1" opacity="0.45" />
      <line x1="165" y1="242" x2="300" y2="242" stroke="#B8963E" strokeWidth="1" opacity="0.35" />
      <line x1="165" y1="258" x2="290" y2="258" stroke="#B8963E" strokeWidth="0.8" opacity="0.3" />
      {/* Logo placeholder circle */}
      <circle cx="240" cy="213" r="10" stroke="#B8963E" strokeWidth="1" opacity="0.4" />

      {/* ── Side gusset fold lines ── */}
      <line x1="172" y1="172" x2="148" y2="380" stroke="#3C4A2E" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.2" />
      <line x1="318" y1="172" x2="342" y2="380" stroke="#3C4A2E" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.2" />

      {/* ── Glossy highlight stripe ── */}
      <path
        d="M140 200 Q138 270 140 340"
        stroke="#3C4A2E" strokeWidth="3" opacity="0.07" strokeLinecap="round"
      />
    </svg>
  );
}

export function FoldingCartonIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Reverse tuck end folding carton illustration"
    >
      {/* ── Main front panel ── */}
      <rect x="145" y="60" width="170" height="280" rx="2" stroke="#3C4A2E" strokeWidth="2.2" />

      {/* ── Right side panel ── */}
      <path d="M315 60 L368 80 L368 360 L315 340" stroke="#3C4A2E" strokeWidth="2" fill="none" />

      {/* ── Top tuck flap (front) ── */}
      <path
        d="M145 60 Q155 28 230 22 Q285 18 315 60"
        stroke="#3C4A2E" strokeWidth="2" fill="none"
      />
      {/* Top flap score line */}
      <line x1="145" y1="60" x2="315" y2="60" stroke="#3C4A2E" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.4" />

      {/* ── Bottom tuck flap (reverse) ── */}
      <path
        d="M145 340 Q155 372 230 378 Q285 382 315 340"
        stroke="#3C4A2E" strokeWidth="2" fill="none"
      />
      {/* Bottom score line */}
      <line x1="145" y1="340" x2="315" y2="340" stroke="#3C4A2E" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.4" />

      {/* ── Top flap on right side panel ── */}
      <path
        d="M315 60 Q330 30 368 38 L368 80"
        stroke="#3C4A2E" strokeWidth="1.5" fill="none" opacity="0.6"
      />
      {/* Bottom flap on right side panel ── */}
      <path
        d="M315 340 Q330 370 368 362 L368 320"
        stroke="#3C4A2E" strokeWidth="1.5" fill="none" opacity="0.6"
      />

      {/* ── Front panel score lines ── */}
      <line x1="145" y1="95" x2="315" y2="95" stroke="#3C4A2E" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.25" />
      <line x1="145" y1="305" x2="315" y2="305" stroke="#3C4A2E" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.25" />

      {/* ── Label / print area ── */}
      <rect x="165" y="115" width="130" height="170" rx="2" stroke="#B8963E" strokeWidth="1.5" opacity="0.6" />
      {/* Label detail lines */}
      <line x1="180" y1="148" x2="278" y2="148" stroke="#B8963E" strokeWidth="1" opacity="0.45" />
      <line x1="180" y1="163" x2="268" y2="163" stroke="#B8963E" strokeWidth="1" opacity="0.35" />
      <line x1="180" y1="178" x2="260" y2="178" stroke="#B8963E" strokeWidth="0.8" opacity="0.3" />
      {/* Decorative logo area */}
      <rect x="200" y="122" width="60" height="18" rx="1" stroke="#B8963E" strokeWidth="0.8" opacity="0.35" />

      {/* ── Side panel grid detail ── */}
      <line x1="315" y1="120" x2="368" y2="140" stroke="#3C4A2E" strokeWidth="0.6" opacity="0.2" />
      <line x1="315" y1="200" x2="368" y2="220" stroke="#3C4A2E" strokeWidth="0.6" opacity="0.2" />
      <line x1="315" y1="280" x2="368" y2="300" stroke="#3C4A2E" strokeWidth="0.6" opacity="0.2" />

      {/* ── Glue tab hint ── */}
      <path d="M145 90 L112 96 L112 312 L145 316" stroke="#3C4A2E" strokeWidth="1.2" strokeDasharray="4 3" fill="none" opacity="0.35" />
    </svg>
  );
}

export function PaperCupIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-label="Single wall paper cup illustration"
    >
      {/* ── Cup body (tapered trapezoid) ── */}
      <path
        d="M138 72 L172 370 L308 370 L342 72 Z"
        stroke="#3C4A2E" strokeWidth="2.2" fill="none"
      />

      {/* ── Rim (ellipse top) ── */}
      <ellipse cx="240" cy="72" rx="102" ry="22" stroke="#3C4A2E" strokeWidth="2.2" fill="none" />

      {/* ── Rim lip inner ring ── */}
      <ellipse cx="240" cy="72" rx="90" ry="18" stroke="#3C4A2E" strokeWidth="0.8" opacity="0.3" fill="none" />

      {/* ── Base (ellipse bottom) ── */}
      <ellipse cx="240" cy="366" rx="68" ry="12" stroke="#3C4A2E" strokeWidth="1.8" fill="none" />
      {/* Base inner ── */}
      <ellipse cx="240" cy="364" rx="58" ry="9" stroke="#3C4A2E" strokeWidth="0.7" opacity="0.3" fill="none" />

      {/* ── Sleeve / wrap band ── */}
      <path
        d="M155 198 L176 322 L304 322 L325 198 Z"
        stroke="#B8963E" strokeWidth="1.8" opacity="0.65" fill="none"
      />
      {/* Sleeve top curve to match cup taper ── */}
      <path
        d="M155 198 Q240 190 325 198"
        stroke="#B8963E" strokeWidth="1.5" opacity="0.5" fill="none"
      />
      <path
        d="M176 322 Q240 316 304 322"
        stroke="#B8963E" strokeWidth="1.5" opacity="0.5" fill="none"
      />

      {/* ── Print wrap horizontal lines on body ── */}
      {[110, 145, 180, 215, 250, 285].map((y) => {
        const progress = (y - 72) / (370 - 72);
        const leftX = 138 + progress * (172 - 138);
        const rightX = 342 - progress * (342 - 308);
        return (
          <path
            key={y}
            d={`M${leftX} ${y} Q240 ${y - 6} ${rightX} ${y}`}
            stroke="#3C4A2E" strokeWidth="0.7" opacity="0.2" fill="none"
          />
        );
      })}

      {/* ── Logo area on body ── */}
      <ellipse cx="240" cy="152" rx="38" ry="14" stroke="#B8963E" strokeWidth="1.2" opacity="0.45" fill="none" />
      <line x1="218" y1="152" x2="262" y2="152" stroke="#B8963E" strokeWidth="0.8" opacity="0.35" />

      {/* ── Seam line ── */}
      <path
        d="M240 72 Q244 220 248 370"
        stroke="#3C4A2E" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.2"
      />

      {/* ── Lid (separate floating above) ── */}
      <ellipse cx="240" cy="52" rx="106" ry="24" stroke="#3C4A2E" strokeWidth="1.5" opacity="0.35" fill="none" />
      <path
        d="M200 52 Q218 40 240 38 Q262 40 280 52"
        stroke="#3C4A2E" strokeWidth="1.2" opacity="0.3" fill="none"
      />
      {/* Lid drink hole */}
      <ellipse cx="260" cy="48" rx="14" ry="5" stroke="#3C4A2E" strokeWidth="1" opacity="0.25" fill="none" />

      {/* ── Highlight stripe ── */}
      <path
        d="M155 90 Q150 220 158 355"
        stroke="#3C4A2E" strokeWidth="6" opacity="0.05" strokeLinecap="round" fill="none"
      />
    </svg>
  );
}

const illustrationMap: Record<string, () => React.ReactElement> = {
  "custom-mailer-boxes": MailerBoxIllustration,
  "custom-rigid-boxes": RigidBoxIllustration,
  "custom-mylar-bags": MylarbagIllustration,
  "custom-folding-cartons": FoldingCartonIllustration,
  "custom-coffee-cups": PaperCupIllustration,
};

export function ProductIllustration({ slug }: { slug: string }) {
  const Component = illustrationMap[slug] ?? MailerBoxIllustration;
  return <Component />;
}
