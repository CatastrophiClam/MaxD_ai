import React, { useState } from "react";
import { useSpring } from "react-spring";

/* Styled Components */
import {
  ScrollBannerWrapper,
  DownArrowWrapper,
  ScrollBannerHighlight
} from "./styles/ScrollBanner";

/* Child Components */
import DownArrow from "../image_wrappers/DownArrow";

const ScrollBanner = ({ onClick, isDownwards }) => {
  const amplitude = 3;
  const [hovered, setHovered] = useState(false);
  const [from, setFrom] = useState(-amplitude);
  const [to, setTo] = useState(amplitude);

  const toggleDirection = () => {
    const temp = to;
    setTo(from);
    setFrom(temp);
  };

  const { yOffset } = useSpring({
    native: true,
    from: { yOffset: from },
    to: { yOffset: to },
    config: { duration: 900 },
    onRest: toggleDirection
  });

  return (
    <ScrollBannerWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ScrollBannerHighlight />
      <DownArrowWrapper
        style={{
          transform: yOffset.interpolate(yOffset => `translateY(${yOffset}px)`)
        }}
        isDownwards={isDownwards}
      >
        <DownArrow width="250" height="45" fill="#4F4F4F" />
      </DownArrowWrapper>
    </ScrollBannerWrapper>
  );
};

export default ScrollBanner;