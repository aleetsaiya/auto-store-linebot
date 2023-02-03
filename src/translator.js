const map = {
  波龍: 'boston-lobster',
  帝王蟹: 'king-crab',
};

const mapReverse = {
  'boston-lobster': '波龍',
  'king-crab': '帝王蟹',
};

// translate product name from Chinese to Eng
export function translateToEng(chinese) {
  return map[chinese];
}

export function translateToChinese(eng) {
  return mapReverse[eng];
}
