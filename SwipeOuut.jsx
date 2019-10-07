import React, { useState, useRef } from "react";
import { useDrag } from "react-use-gesture";
import styled, { css } from "styled-components";

const StyledWrap = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background: red;
`;

const StyledContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: blue;
  z-index: 2;
  ${({ moving }) => css`
    ${!moving ? "transition: all 1s;" : ""}
  `}
`;

const StyledRemove = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 60px;
  line-height: 60px;
  background: red;
  z-index: 1;
`;

const _width = 100;

const SwipeOut = React.memo(() => {
  const posXRef = useRef(0);
  const [moving, setMoving] = useState(false);
  const [posX, setPosX] = useState(0);
  const clientWRef = useRef();
  const bind = useDrag(data => {
    const { down, delta, offset, movement } = data;
    const clientW = clientWRef.current;
    const x = movement[0];
    let latestMoveX = posXRef.current + x;
    console.log(`x : ${latestMoveX}`);
    if (latestMoveX >= 0) {
      latestMoveX = 0;
    }

    if (down) {
      setMoving(true);

      if (Math.abs(x) > _width) {
        setPosX(latestMoveX);
      } else {
        // 回到100
        setPosX(latestMoveX);
      }
    } else {
      // eslint-disable-next-line operator-assignment
      // setMoveX(-100);
      setMoving(false);
      if (Math.abs(latestMoveX) > _width / 2) {
        setPosX(-_width);
        posXRef.current = -_width;
      } else {
        setPosX(0);
        posXRef.current = 0;
      }
    }
  });
  console.log(`${posX}px`);
  return (
    <StyledWrap
      {...bind()}
      ref={element => {
        if (element) {
          clientWRef.current = element.clientWidth;
        }
      }}
    >
      12312312312
      <StyledContent
        moving={moving}
        style={{ transform: `translateX(${posX}px)` }}
      />
      <StyledRemove>删除</StyledRemove>
    </StyledWrap>
  );
});

export default SwipeOut;
