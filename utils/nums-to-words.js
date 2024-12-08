const numbersToWords = {
  0: "",
  1: "ერთი",
  2: "ორი",
  3: "სამი",
  4: "ოთხი",
  5: "ხუთი",
  6: "ექვსი",
  7: "შვიდი",
  8: "რვა",
  9: "ცხრა",
  10: "ათი",
  11: "თერთმეტი",
  12: "თორმეტი",
  13: "ცამეტი",
  14: "თოთხმეტი",
  15: "თხუთმეტი",
  16: "თექვსმეტი",
  17: "ჩვიდმეტი",
  18: "თვრამეტი",
  19: "ცხრამეტი",
  20: "ოცი",
  40: "ორმოცი",
  60: "სამოცი",
  80: "ოთხმოცი",
  100: "ასი",
  200: "ორასი",
  300: "სამასი",
  400: "ოთხასი",
  500: "ხუთასი",
  600: "ექვსასი",
  700: "შვიდასი",
  800: "რვაასი",
  900: "ცხრაასი",
  1000: "ათასი",
  2000: "ორი ათასი",
  3000: "სამი ათასი",
  4000: "ოთხი ათასი",
  5000: "ხუთი ათასი",
  6000: "ექვსი ათასი",
  7000: "შვიდი ათასი",
  8000: "რვა ათასი",
  9000: "ცხრა ათასი",
  10000: "ათი ათასი",
  20000: "ოცი ათასი",
};

export function integersToWords(number) {
  number = Number(number);
  number = Math.trunc(number);
  if (number in numbersToWords && number !==0) return numbersToWords[number];

  if (number === 0) return "";
  let words = "";

  if (number > 2000) {
    words += numbersToWords[Math.floor(number / 1000)];
    words = words + " ათას";

    number %= 1000;
  }

  if (number > 1000 && number < 2000) {
    
    words += "ათას";

    number %= 1000;
  }

  if (number == 300 || number == 400 || number == 500 || number == 600|| number == 700 || number == 900) {
    if (words !== "") words += " ";
    words += numbersToWords[Math.floor(number / 100)];
    words = String(words);
    words = words.replace(/.$/, "");
    words = words + "ასი";

    number %= 100;
  }

  if (number > 800 && number < 1000) {
    if (words !== "") words += " ";
    words += numbersToWords[Math.floor(number / 100)];
    words = words + "ას";

    number %= 100;
  }

  if (number > 200 && number < 800) {
    if (words !== "") words += " ";
    words += numbersToWords[Math.floor(number / 100)];
    words = String(words);
    words = words.replace(/.$/, "");
    words = words + "ას";

    number %= 100;
  }

  if (number > 100 && number < 200) {
    if (words !== "") words += " ";
    words += "ას";

    number %= 100;
  }

  if (number > 0) {
    if (words !== "") words += " ";

    if (number < 20) words += numbersToWords[number];
    else {

      words += numbersToWords[Math.floor(number / 20)  * 20];

      if (number % 20 > 0) {
        words = String(words);
        words = words.replace(/.$/, ""); 
        words += "და" + numbersToWords[number % 20];
      }
    }
  }

  return words;
}


export function decimalsToWords(fullNum) {
  fullNum = Number(fullNum);
  let decimal = fullNum - Math.trunc(fullNum);
  decimal = Math.round((decimal + Number.EPSILON)*100);

  if (decimal in numbersToWords && fullNum < 1 && decimal !==0) return `${numbersToWords[decimal]} თეთრი)`;

  if (decimal in numbersToWords && decimal !==0) return ` ლარი და ${numbersToWords[decimal]} თეთრი)`;

  if (decimal === 0) return ")";

  let words = "";

  if (decimal > 0 && fullNum < 1) {
    if (words !== "") words += " ";

    if (decimal < 20) words += numbersToWords[decimal];
    else {

      words += numbersToWords[Math.floor(decimal / 20)  * 20];

      if (decimal % 20 > 0) {
        words = String(words);
        words = words.replace(/.$/, ""); 
        words += "და" + numbersToWords[decimal % 20];
      }
    }

    return `${words} თეთრი)`;
  }

  if (decimal > 0) {
    if (words !== "") words += " ";

    if (decimal < 20) words += numbersToWords[decimal];
    else {

      words += numbersToWords[Math.floor(decimal / 20)  * 20];

      if (decimal % 20 > 0) {
        words = String(words);
        words = words.replace(/.$/, ""); 
        words += "და" + numbersToWords[decimal % 20];
      }
    }
  }

  return ` ლარი და ${words} თეთრი)`;

}