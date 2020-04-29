/* eslint-disable @typescript-eslint/no-explicit-any */
export const parserMtgaDeckData = (importData: string): any[] => {
  const cards = [];
  const cardParser = /(\d+)\s(.+)\s(?:\(\w\w\w\))\s(?:\d+)/gm;
  for (const cardData of importData.split("\r\n")) {
    const matches = cardParser.exec(cardData);
    if (!matches) {
      continue;
    }
    const [_, amount, text] = matches;
    const card = { amount: +amount, text };
    cards.push(card);
  }

  return cards;
};
