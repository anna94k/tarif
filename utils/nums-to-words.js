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
  1000: "ათასი",
  1000000: "მილიონი",
};

export function integersToWords(number) {
  number = Number(number);
  number = Math.trunc(number);
  if (number in numbersToWords && number !==0) return numbersToWords[number];

  if (number === 0) return "";
  let words = "";



  //=========================================

  if (number > 1000000) {
    let words2 = Math.floor(number / 1000000);

    if (words2 in numbersToWords && words2 !==0) words += numbersToWords[words2];

    if (words2 == 300 || words2 == 400 || words2 == 500 || words2 == 600|| words2 == 700 || words2 == 900) {
      if (words !== "") words += " ";
      words += numbersToWords[Math.floor(words2 / 100)];
      words = String(words);
      words = words.replace(/.$/, "");
      words = words + "ასი";
  
      words2 %= 100;
    }
  
    if (words2 >= 800 && words2 < 1000) {
      if (words !== "") words += " ";
      words += numbersToWords[Math.floor(words2 / 100)];
      if (words2 % 100 ===0) {words += "ასი"} else words += "ას";
      
      words2 %= 100;
    }
  
    if (words2 >= 200) {
      if (words !== "") words += " ";
      words += numbersToWords[Math.floor(words2 / 100)];
      words = String(words);
      words = words.replace(/.$/, "");
      if (words2 % 100 ===0) {words += "ასი"} else words += "ას";
      
      words2 %= 100;
    }
  
    if (words2 > 100) {
      if (words !== "") words += " ";
      words += "ას";
  
      words2 %= 100;
    }

    if (words2 > 10) {
      if (words !== "") words += " ";
  
      if (words2 < 20) words += numbersToWords[words2];
      else {
  
        words += numbersToWords[Math.floor(words2 / 20)  * 20];
  
        if (words2 % 20 > 0) {
          words = String(words);
          words = words.replace(/.$/, ""); 
          words += "და" + numbersToWords[words2 % 20];
        }
      }
    }

    if (number % 1000000 === 0) {words += " მილიონი"} else words += " მილიონ";

    number %= 1000000;
  }

  //==========================================

  if (number > 100000) {
    if (words !== "") words += " ";

    let words2 = Math.floor(number / 1000);

    if (words2 in numbersToWords && words2 !==0) words += numbersToWords[words2];

    if (words2 == 300 || words2 == 400 || words2 == 500 || words2 == 600|| words2 == 700 || words2 == 900) {
      if (words !== "") words += " ";
      words += numbersToWords[Math.floor(words2 / 100)];
      words = String(words);
      words = words.replace(/.$/, "");
      words = words + "ასი";
  
      words2 %= 100;
    }
  
    if (words2 >= 800 && words2 < 1000) {
      if (words !== "") words += " ";
      words += numbersToWords[Math.floor(words2 / 100)];
      if (words2 % 100 ===0) {words += "ასი"} else words += "ას";
      
      words2 %= 100;
    }
  
    if (words2 >= 200) {
      if (words !== "") words += " ";
      words += numbersToWords[Math.floor(words2 / 100)];
      words = String(words);
      words = words.replace(/.$/, "");
      if (words2 % 100 ===0) {words += "ასი"} else words += "ას";
      
      words2 %= 100;
    }
  
    if (words2 > 100) {
      if (words !== "") words += " ";
      words += "ას";
  
      words2 %= 100;
    }

    if (words2 > 0) {
      if (words !== "") words += " ";
  
      if (words2 < 20) words += numbersToWords[words2];
      else {
  
        words += numbersToWords[Math.floor(words2 / 20)  * 20];
  
        if (words2 % 20 > 0) {
          words = String(words);
          words = words.replace(/.$/, ""); 
          words += "და" + numbersToWords[words2 % 20];
        }
      }
    }

    if (number % 1000 === 0) {words += " ათასი"} else words += " ათას";

    number %= 1000;
  }



  //==========================================


  if (number > 20000) {
    if (words !== "") words += " ";
    let words2 = Math.floor(number / 1000);
    
    words += numbersToWords[Math.floor(words2 / 20)  * 20];
    
    if (words2 % 20 > 0) {
      words = String(words);
      words = words.replace(/.$/, ""); 
      words += "და" + numbersToWords[words2 % 20];
    }

    if (number % 1000 === 0) {words += " ათასი"} else words += " ათას";

    number %= 1000;
  }




  if (number >= 2000) {
    if (words !== "") words += " ";
    words += numbersToWords[Math.floor(number / 1000)];
    if (number % 1000 === 0) {words += " ათასი"} else words += " ათას";

    number %= 1000;
  }

  if (number > 1000) {
    
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

  if (number >= 800 && number < 1000) {
    if (words !== "") words += " ";
    words += numbersToWords[Math.floor(number / 100)];
   
    if (number % 100 ===0) {words += "ასი"} else words += "ას";

    number %= 100;
  }

  if (number >= 200) {
    if (words !== "") words += " ";
    words += numbersToWords[Math.floor(number / 100)];
    words = String(words);
    words = words.replace(/.$/, "");
    
    if (number % 100 ===0) {words += "ასი"} else words += "ას";

    number %= 100;
  }

  if (number > 100) {
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