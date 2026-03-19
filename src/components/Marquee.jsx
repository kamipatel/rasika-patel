export default function Marquee({
  items = [],
  speed = 40,
  separator = "●",
  direction = "left",
}) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        padding: "12px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: `${direction === "left" ? "marquee" : "marqueeReverse"} ${speed}s linear infinite`,
          width: "fit-content",
        }}
      >
        {[0, 1].map((d) => (
          <div
            key={d}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              paddingRight: "24px",
            }}
          >
            {items.map((w) => (
              <span
                key={w + d}
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--text-faint)",
                  whiteSpace: "nowrap",
                }}
              >
                {w}
                <span
                  style={{
                    color: "var(--accent)",
                    opacity: 0.3,
                    margin: "0 12px",
                    fontSize: "8px",
                  }}
                >
                  {separator}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
