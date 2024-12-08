import {integersToWords} from './nums-to-words.js'


const days = ['პირველ', 'ორ', 'სამ', 'ოთხ', 'ხუთ', 'ექვს', 'შვიდ', 'რვა', 'ცხრა', 'ათ', 'თერთმეტ', 'თორმეტ', 'ცამეტ', 'თოთხმეტ', 'თხუთმეტ', 'თექვსმეტ', 'ჩვიდმეტ', 'თვრამეტ', 'ცხრამეტ', 'ოც', 'ოცდაერთ', 'ოცდაორ', 'ოცდასამ', 'ოცდაოთხ', 'ოცდახუთ', 'ოცდაექვს', 'ოცდაშვიდ', 'ოცდარვა', 'ოცდაცხრა', 'ოცდაათ', 'ოცდათერთმეტ'];

const months = ['იანვარს', 'თებერვალს', 'მარტს', 'აპრილს', 'მაისს', 'ივნისს', 'ივლისს', 'აგვისტოს', 'სექტემბერს', 'ოქტომბერს', 'ნოემბერს', 'დეკემბერს'];


const date = new Date();

export function getUserTime(t = new Date()) {
  const M = months[t.getMonth()];
  const D = days[t.getDate()-1];
  let Y = t.getFullYear();
  Y = integersToWords(Y);
  return `${Y} წლის ${D} ${M}`
}

export function inputTimeToWords(t) {
  t = new Date(t);
  const M = months[t.getMonth()];
  const D = days[t.getDate()-1];
  let Y = t.getFullYear();
  Y = integersToWords(Y);

  return `${Y} წლის ${D} ${M}`
 }
