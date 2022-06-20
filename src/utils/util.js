function calcPosition(num, color) {
  let colors = [
    { x: -17, y: -225 }, //方块花色的坐标
    { x: -17, y: -6 }, //梅花花色的坐标
    { x: -162, y: -6 }, //红桃花色的坐标
    { x: -162, y: -225 }, //黑桃花色的坐标
  ];

  let x, y;

  if (num !== 14) {
    x = colors[color].x;
    y = colors[color].y;
  } else {
    if (color === 0) {
      x = -162;
      y = -6;
    } else {
      x = -17;
      y = -6;
    }
  }

  const background = require(`../assets/images/${num}.png`);
  return { x: x, y: y, background: background };
}

export { calcPosition };
