import React from 'react';

export const MiddleDot = ({ ...props }) => {
  return <span {...props}> &#183; </span>;
};
export const Bullet = ({ ...props }) => {
  return <span {...props}> &#8226; </span>;
};
export const BlackCircle = ({ ...props }) => {
  return <span {...props}> &#9679;</span>;
};

export const BlackLargeCircle = ({ ...props }) => {
  return <span {...props}> &#11044; </span>;
};

export const Space = ({ ...props }) => {
  return <span {...props}> &nbsp; </span>;
};

// https://stackoverflow.com/questions/7250381/html-entity-for-the-middle-dot    char   description          unicode   html       html entity    utf-8

// ·      Middle Dot           U+00B7    &#183;     &middot;       C2 B7
// ·      Greek Ano Teleia     U+0387    &#903;                    CE 87
// •      Bullet               U+2022    &#8226;    &bull;         E2 80 A2
// ‧      Hyphenation Point    U+2027    &#8321;                   E2 80 A7
// ∙      Bullet Operator      U+2219    &#8729;                   E2 88 99
// ●      Black Circle         U+25CF    &#9679;                   E2 97 8F
// ⬤     Black Large Circle   U+2B24    &#11044;                  E2 AC A4
