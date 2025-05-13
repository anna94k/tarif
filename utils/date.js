import { integersToWords } from './nums-to-words.js'


const days = ['პირველი', 'ორი', 'სამი', 'ოთხი', 'ხუთი', 'ექვსი', 'შვიდი', 'რვა', 'ცხრა', 'ათი', 'თერთმეტი', 'თორმეტი', 'ცამეტი', 'თოთხმეტი', 'თხუთმეტი', 'თექვსმეტი', 'ჩვიდმეტი', 'თვრამეტი', 'ცხრამეტი', 'ოცი', 'ოცდაერთი', 'ოცდაორი', 'ოცდასამი', 'ოცდაოთხი', 'ოცდახუთი', 'ოცდაექვსი', 'ოცდაშვიდი', 'ოცდარვა', 'ოცდაცხრა', 'ოცდაათი', 'ოცდათერთმეტი'];

const months = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];


function toDative(str) {
  if (str.slice(-1) === 'ი') {
    return str.slice(0, -1) + 'ს';
  }
  return str + 'ს';

}

const monthsGenitive = months.map(month => {
  const len = month.length;
  if (len >= 4) {
    const fourthFromEnd = month[len - 4];
    if (fourthFromEnd === 'ვ' || fourthFromEnd === 'ბ') {
      return month.slice(0, len - 3) + month.slice(len - 2) + "ს";
    }
  }
  return month + "ს";
});


const monthsDative = months.map(toDative);

function toDativеDays(str) {
  if (str.slice(-1) === 'ი') {
    return str.slice(0, -1);
  } else {
    return str;
  }
}

const daysDative = days.map(toDativеDays);


//-------------------------------------

export function getUserTime(t = new Date()) {
  const M = months[t.getMonth()];
  const D = days[t.getDate() - 1];
  let Y = t.getFullYear();
  Y = integersToWords(Y);
  return `${Y} წლის ${D} ${M}`
}

export function inputTimeToWords(t) {
  t = new Date(t);
  const M = months[t.getMonth()];
  const D = days[t.getDate() - 1];
  let Y = t.getFullYear();
  Y = integersToWords(Y);

  return `${Y} წლის ${D} ${M}`
}

export function inputTimeToWordsDative(t) {
  t = new Date(t);
  const M = monthsDative[t.getMonth()];
  const D = daysDative[t.getDate() - 1];
  let Y = t.getFullYear();
  Y = integersToWords(Y);

  return `${Y} წლის ${D} ${M}`
}

export function inputTimeToWordsGenitive(t) {
  t = new Date(t);
  const M = monthsGenitive[t.getMonth()];
  const D = days[t.getDate() - 1];
  const dayNum = t.getDate();
  let Y = t.getFullYear();
  //Y = integersToWords(Y);

  return `${Y} (${integersToWords(Y)}) წლის ${dayNum} (${D}) ${M}`
}
