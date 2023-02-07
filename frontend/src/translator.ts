interface TranslateMap {
  [key: string]: string;
}

const map: TranslateMap = {
  波龍: 'boston-lobster',
  帝王蟹: 'king-crab',
  大閘蟹: 'hairy-crab',
  生蠔: 'oysters',
};

const mapReverse: TranslateMap = {
  'boston-lobster': '波龍',
  'king-crab': '帝王蟹',
  'hairy-crab': '大閘蟹',
  oysters: '生蠔',
};

// translate product name from Chinese to Eng
export function translateToEng(chinese: string) {
  return map[chinese];
}

export function translateToChinese(eng: string) {
  return mapReverse[eng];
}
