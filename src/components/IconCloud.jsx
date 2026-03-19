import React, { useEffect, useState, useMemo } from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

const ICON_SLUGS = [
  "typescript", "javascript", "react", "html5", "css3", "nodedotjs", 
  "vitedotjs", "tailwindcss", "python", "framer", "figma", "git", "github", 
  "visualstudiocode", "tableau", "postgresql", "amazons3", "prisma"
];

const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.1,
    minSpeed: 0.05,
    radius: 110,
  },
};

const IconCloudComponent = ({ iconSlugs }) => {
  const [data, setData] = useState(null);
  const slugs = useMemo(() => iconSlugs || ICON_SLUGS, [iconSlugs]);

  useEffect(() => {
    fetchSimpleIcons({ slugs }).then(setData);
  }, [slugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return [];

    return Object.values(data.simpleIcons).map((icon) =>
      renderSimpleIcon({
        icon,
        size: 45,
        bgHex: "#0a0a0c",
        fallbackHex: "#ff6b35",
        minContrastRatio: 2,
      })
    );
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "240px" }}>
      <Cloud {...cloudProps}>{renderedIcons}</Cloud>
    </div>
  );
};

export default React.memo(IconCloudComponent);
