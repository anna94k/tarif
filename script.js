import {integersToWords, decimalsToWords} from './utils/nums-to-words.js';
import { getUserTime, inputTimeToWords } from './utils/date.js';
import { copyContent, copyRich } from './utils/copy.js';


// -----Calculation-----ხელმოწერები------

function signatures() {
  let pageNum = Number(document.getElementById("pageNum").value); 
  pageNum = Math.round(pageNum);
  let ppl = Number(document.getElementById("ppl").value);
  ppl = Math.round(ppl);
  let copies = Number(document.getElementById("copies").value);
  copies = Math.round(copies);

  if (pageNum <= 0) pageNum = 1;
  if (ppl <= 0) ppl = 1;
  if (copies <= 0) copies = 1;
 
  let notaryPrice = ppl * copies * pageNum;

  if (pageNum === 1) {
    notaryPrice *= 6;
  } else if (pageNum <= 10) {
    notaryPrice *= 4;
  } else if (pageNum <= 50) {
    notaryPrice *= 3;
  } else {
    notaryPrice *= 2;
  }

  return notaryPrice;
}
 

function forProject() {
  const project0 = document.getElementById("project0");
  const project10 = document.getElementById("project10");
  const projectOther = document.getElementById("projectOther");

  if (project0.checked == true) return 0;
  if (project10.checked == true) return 10;
  if (projectOther.checked == true) {
    let projectAmount = Number(document.getElementById("projectAmount").value);
    projectAmount = Math.round(projectAmount * 100) / 100;
    if (projectAmount < 0) projectAmount = 0;
    return projectAmount;
  }
  
}

function priceVAT() {
  const vatPrice = Math.round(((signatures() + forProject())) * 18) / 100;
  let checkBox = document.getElementById("vatSelector");

  if (checkBox.checked == true) {return vatPrice;} else {return 0}
}

function fullPrice() {
  let x = Math.round((forProject() + priceVAT() + signatures() + 5)*100)/100;

  return x;
}



// -------------------------


function mySubmit() {
  const notaryPrice = document.getElementById('signaturesPrice');
  const vatPrice = document.getElementById('signVAT');
  const projectPrice = document.getElementById('forProject');
  const finalPrice = document.getElementById('signFullPrice'); 

  notaryPrice.innerHTML = 
    `<td>საზღაური:</td>
    <td>
      <div class="text-and-copy">
        <span id="copy-notary-txt">
          ${signatures()} (${integersToWords(signatures())}) ლარი
        </span>
        <img id="copySignaturesBttn" class="copy-icon" src="copy1.png" title="Copy">
      </div>
    </td>`;
  
  if (priceVAT() > 0) {vatPrice.innerHTML = 
    `<td>დღგ:</td>
    <td>
      <div class="text-and-copy">
        <span id="copy-VAT-txt">
          ${priceVAT()} (${integersToWords(priceVAT())}${decimalsToWords(priceVAT())} ლარი
        </span>
        <img id="copyVatBttn" class="copy-icon" src="copy1.png" title="Copy">
      </div>
    </td>`
  } else document.getElementById("signVAT").innerHTML = "";

  if (forProject() > 0) {projectPrice.innerHTML = 
    `<td>პროექტისთვის:</td>
    <td >
      <div class="text-and-copy">
          <span id="copy-project-txt">
            ${forProject()} (${integersToWords(forProject())}${decimalsToWords(forProject())} ლარი
          </span>
          <img id="copyProjectBttn" class="copy-icon" src="copy1.png" title="Copy">
      </div>
    </td>`
  } else document.getElementById("forProject").innerHTML = ""; 
  
  finalPrice.innerHTML = 
    `<td>სულ:</td>
    <td>
      <div class="text-and-copy" >
        <span id="full-price-txt">
          ${fullPrice()} (${integersToWords(fullPrice())}${decimalsToWords(fullPrice())} ლარი
        </span> 
        <img id="copyFullBttn" class="copy-icon" src="copy1.png" title="Copy">
      </div>
    </td>`
  ; 


  renderFullText();
}


function renderFullText() {
  const fullTextArea = document.getElementById('fullText');
  let fullText = "";
  if (priceVAT() > 0 && forProject() === 10) {
    fullText = `გადახდილია სანოტარო მომსახურების საზღაური სულ: <b> ${fullPrice()} (${integersToWords(fullPrice())}${decimalsToWords(fullPrice())} ლარი,</b> მათ შორის: ${signatures()} (${integersToWords(signatures())}) ლარი - საქართველოს მთავრობის 2011 წლის 29 დეკემბერის №507 დადგენილების (სანოტარო მოქმედებათა შესრულებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ) 31.3 მუხლისა, ${forProject()} (${integersToWords(forProject())}${decimalsToWords(forProject())} ლარი - განცხადების პროექტის შედგენისათვის, თანახმად ამავე დადგენილების 31.13 მუხლისა, 5 (ხუთი) ლარი - ელექტრონულ სანოტარო რეესტრში სანოტარო მოქმედების რეგისტრაციის საფასური, თანახმად ზემოხსენებული დადგენილების 39-ე მუხლისა და დღგ - ${priceVAT()} (${integersToWords(priceVAT())}${decimalsToWords(priceVAT())} ლარი, თანახმად საქართველოს საგადასახადო კოდექსის 166-ე მუხლისა.`
  } else if (priceVAT() > 0 && forProject() > 0) {
    fullText = `გადახდილია სანოტარო მომსახურების საზღაური სულ:<b> ${fullPrice()} (${integersToWords(fullPrice())}${decimalsToWords(fullPrice())} ლარი,</b> მათ შორის: ${signatures()} (${integersToWords(signatures())}) ლარი - საქართველოს მთავრობის 2011 წლის 29 დეკემბერის №507 დადგენილების (სანოტარო მოქმედებათა შესრულებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ) 31.3 მუხლისა, ${forProject()} (${integersToWords(forProject())}${decimalsToWords(forProject())} ლარი - გარიგების პროექტის შედგენისათვის, თანახმად ამავე დადგენილების 30-ე მუხლისა, 5 (ხუთი) ლარი - ელექტრონულ სანოტარო რეესტრში სანოტარო მოქმედების რეგისტრაციის საფასური, თანახმად ზემოხსენებული დადგენილების 39-ე მუხლისა და დღგ - ${priceVAT()} (${integersToWords(priceVAT())}${decimalsToWords(priceVAT())} ლარი, თანახმად საქართველოს საგადასახადო კოდექსის 166-ე მუხლისა.`
  } else if (priceVAT() > 0 && forProject() === 0) {
    fullText = `გადახდილია სანოტარო მომსახურების საზღაური სულ:<b> ${fullPrice()} (${integersToWords(fullPrice())}${decimalsToWords(fullPrice())} ლარი,</b> მათ შორის: ${signatures()} (${integersToWords(signatures())}) ლარი - საქართველოს მთავრობის 2011 წლის 29 დეკემბერის №507 დადგენილების (სანოტარო მოქმედებათა შესრულებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ) 31.3 მუხლისა, 5 (ხუთი) ლარი - ელექტრონულ სანოტარო რეესტრში სანოტარო მოქმედების რეგისტრაციის საფასური, თანახმად ზემოხსენებული დადგენილების 39-ე მუხლისა და დღგ - ${priceVAT()} (${integersToWords(priceVAT())}${decimalsToWords(priceVAT())} ლარი, თანახმად საქართველოს საგადასახადო კოდექსის 166-ე მუხლისა.`
  } else if (priceVAT() === 0 && forProject() === 10) {
    fullText = `გადახდილია სანოტარო მომსახურების საზღაური სულ:<b> ${fullPrice()} (${integersToWords(fullPrice())}${decimalsToWords(fullPrice())} ლარი,</b> მათ შორის: ${signatures()} (${integersToWords(signatures())}) ლარი - საქართველოს მთავრობის 2011 წლის 29 დეკემბერის №507 დადგენილების (სანოტარო მოქმედებათა შესრულებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ) 31.3 მუხლისა, ${forProject()} (${integersToWords(forProject())}${decimalsToWords(forProject())} ლარი - განცხადების პროექტის შედგენისათვის, თანახმად ამავე დადგენილების 31.13 მუხლისა და 5 (ხუთი) ლარი - ელექტრონულ სანოტარო რეესტრში სანოტარო მოქმედების რეგისტრაციის საფასური, თანახმად ზემოხსენებული დადგენილების 39-ე მუხლისა.`
  } else if (priceVAT() === 0 && forProject() > 0) {
    fullText = `გადახდილია სანოტარო მომსახურების საზღაური სულ:<b> ${fullPrice()} (${integersToWords(fullPrice())}${decimalsToWords(fullPrice())} ლარი,</b> მათ შორის: ${signatures()} (${integersToWords(signatures())}) ლარი - საქართველოს მთავრობის 2011 წლის 29 დეკემბერის №507 დადგენილების (სანოტარო მოქმედებათა შესრულებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ) 31.3 მუხლისა, ${forProject()} (${integersToWords(forProject())}${decimalsToWords(forProject())} ლარი - გარიგების პროექტის შედგენისათვის, თანახმად ამავე დადგენილების 30-ე მუხლისა და 5 (ხუთი) ლარი - ელექტრონულ სანოტარო რეესტრში სანოტარო მოქმედების რეგისტრაციის საფასური, თანახმად ზემოხსენებული დადგენილების 39-ე მუხლისა.`
  } else if (priceVAT() === 0 && forProject() === 0) {
    fullText = `გადახდილია სანოტარო მომსახურების საზღაური სულ:<b> ${fullPrice()} (${integersToWords(fullPrice())}${decimalsToWords(fullPrice())} ლარი,</b> მათ შორის: ${signatures()} (${integersToWords(signatures())}) ლარი - საქართველოს მთავრობის 2011 წლის 29 დეკემბერის №507 დადგენილების (სანოტარო მოქმედებათა შესრულებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ) 31.3 მუხლისა და 5 (ხუთი) ლარი - ელექტრონულ სანოტარო რეესტრში სანოტარო მოქმედების რეგისტრაციის საფასური, თანახმად ზემოხსენებული დადგენილების 39-ე მუხლისა.`
  }  
  
  fullTextArea.innerHTML = 
    `<div class = "fullText">
      <span id="copy-full-txt">${fullText}</span>
      <div class="copy-full-bttn">
        <button id="copyFullText">კოპირება</button>
      </div>
    </div>`;

  eventListenersforCopying();
}


function setupEventListeners() {
  const submitBttn = document.getElementById('submit');
  const resetBttn = document.getElementById('reset');
  
  //submitBttn.removeEventListener('click', mySubmit);
  submitBttn.addEventListener('click', mySubmit);
  submitBttn.addEventListener('click', renderFullText);
  resetBttn.addEventListener('click', reset);


  const project0 = document.getElementById("project0");
  const project10 = document.getElementById("project10");
  const projectOther = document.getElementById("projectOther"); 

  project0.addEventListener('click', () => {document.getElementById('projectAmount').setAttribute('disabled', 'disabled'); const projectInput = document.getElementById("projectAmount"); projectInput.value = "0"});
  project10.addEventListener('click', () => {document.getElementById('projectAmount').setAttribute('disabled', 'disabled'); const projectInput = document.getElementById("projectAmount"); projectInput.value = "10"});
  projectOther.addEventListener('click', () => {document.getElementById('projectAmount').removeAttribute('disabled')});

}

setupEventListeners();



function eventListenersforCopying() {
  const copyFullBttn = document.getElementById('copyFullBttn');
  const copySignaturesBttn = document.getElementById('copySignaturesBttn');
  const copyProjectBttn = document.getElementById('copyProjectBttn');
  const copyVatBttn = document.getElementById('copyVatBttn');
  const copyFullText = document.getElementById('copyFullText');

  copyFullBttn.addEventListener('click', () => {copyContent(document.getElementById('full-price-txt').innerText)});
  copySignaturesBttn.addEventListener('click', () => {copyContent(document.getElementById('copy-notary-txt').innerText)}); 
  copyProjectBttn?.addEventListener('click', () => {copyContent(document.getElementById('copy-project-txt').innerText)});
  copyVatBttn?.addEventListener('click', () => {copyContent(document.getElementById('copy-VAT-txt').innerText)});
  copyFullText.addEventListener('click', () => {copyRich(document.getElementById('copy-full-txt'))});

}



function reset() {
  document.getElementById("signatureForm").reset();
  document.getElementById("signaturesPrice").innerHTML = "";
  document.getElementById("signVAT").innerHTML = "";
  document.getElementById("forProject").innerHTML = "";
  document.getElementById('signFullPrice').innerHTML = "";
  document.getElementById('fullText').innerHTML = "";

  document.getElementById('projectAmount').setAttribute('disabled', 'disabled');
}










// --------------DATE
document.getElementById("date1").innerHTML = `${getUserTime()}`;

function toDateInputValue(dateObject){
  const local = new Date(dateObject);
  local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
  return local.toJSON().slice(0,10);
};

const dateControl = document.querySelector('input[type="date"]');
dateControl.value = toDateInputValue(new Date());


function dateSubmit() {
  const dateInput = dateControl.value;
  const toWords = inputTimeToWords(dateInput);

 return `${toWords}`;
}


const renderDate = () => document.getElementById("date2").innerHTML = `${dateSubmit()}`;

renderDate();
dateControl.addEventListener('change', renderDate);










// ------------ ასლის დამოწმება ---calculation

function copies() {
  let pageNum = Number(document.getElementById("pageNumCopy").value); 
  pageNum = Math.round(pageNum);
  let copies = Number(document.getElementById("copiesCopy").value);
  copies = Math.round(copies);

  if (pageNum <= 0) pageNum = 1;
  if (copies <= 0) copies = 1;
 
  let notaryPrice = copies * pageNum;

  if (pageNum === 1) {
    notaryPrice *= 4;
  } else if (pageNum <= 10) {
    notaryPrice *= 2;
  } else if (pageNum <= 50) {
    notaryPrice *= 1;
  } else {
    notaryPrice /= 2;
  }

  return notaryPrice;
}

function forCopying() {
  const copy0 = document.getElementById("copy0");
  const copyYes = document.getElementById("copyYes");

  if (copy0.checked == true) return 0;
  if (copyYes.checked == true) {
    let forCopying = Number(document.getElementById("forCopying").value);
    forCopying = Math.round(forCopying * 100) / 100;

    let pageNum = Number(document.getElementById("pageNumCopy").value); 
    pageNum = Math.round(pageNum);

    let copies = Number(document.getElementById("copies").value);
    copies = Math.round(copies);

    if (forCopying < 0) {
      forCopying = 0;
    } else if (forCopying > 0) {
      forCopying = (forCopying * pageNum * copies) / 100;
    }
    return forCopying;
  }
  
}

function copiesVAT() {
  const vatPrice = Math.round(((copies() + forCopying())) * 18) / 100;
  let checkBox = document.getElementById("copyVatSelector");

  if (checkBox.checked == true) {return vatPrice;} else {return 0}
}

function copiesFullPrice() {
  let x = Math.round((forCopying() + copiesVAT() + copies())*100)/100;

  return x;
}


// -------------------------

function mySubmitCopies() {
  const notaryPrice = document.getElementById('copiesPrice');
  const vatPrice = document.getElementById('copiesVAT');
  const forCopyingResult = document.getElementById('forCopyingResult');
  const finalPrice = document.getElementById('copyFullPrice'); 

  notaryPrice.innerHTML = `${copies()} (${integersToWords(copies())}) ლარი`;  
  
  if (copiesVAT() > 0) {vatPrice.innerHTML = `${copiesVAT()} (${integersToWords(copiesVAT())}${decimalsToWords(copiesVAT())} ლარი`} else vatPrice.innerHTML = ""; 

  if (forCopying() > 0) {forCopyingResult.innerHTML = `${forCopying()} (${integersToWords(forCopying())}${decimalsToWords(forCopying())} ლარი`} else forCopyingResult.innerHTML = "";  
  
  finalPrice.innerHTML = `${copiesFullPrice()} (${integersToWords(copiesFullPrice())}${decimalsToWords(copiesFullPrice())} ლარი`; 
}


function renderFullTextCopies() {
  const fullTextArea = document.getElementById('copiesFullText');
  if (copiesVAT() > 0 && forCopying() > 0) {
    fullTextArea.innerHTML = `სანოტარო მოქმედების შესრულებისათვის გადახდილ იქნა საზღაური სულ: <b> ${copiesFullPrice()} (${integersToWords(copiesFullPrice())}${decimalsToWords(copiesFullPrice())} ლარი,</b> მათ შორის: ${copies()} (${integersToWords(copies())}) ლარი – თანახმად "სანოტარო მოქმედებათა შესრულეებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ" საქართველოს მთავრობის 2011 წლის 29 დეკემბრის #507 დადგენილების 31-ე მუხლისა, ${forCopying()} (${integersToWords(forCopying())}${decimalsToWords(forCopying())} ლარი თანახმად ამავე დადგენილების 35-ე მუხლისა და დღგ ${copiesVAT()} (${integersToWords(copiesVAT())}${decimalsToWords(copiesVAT())} ლარი თანახმად საქართველოს საგადასახადო კოდექსის 166-ე მუხლისა.`
  } else if (copiesVAT() > 0 && forCopying() === 0) {
    fullTextArea.innerHTML = `სანოტარო მოქმედების შესრულებისათვის გადახდილ იქნა საზღაური სულ: <b> ${copiesFullPrice()} (${integersToWords(copiesFullPrice())}${decimalsToWords(copiesFullPrice())} ლარი,</b> მათ შორის: ${copies()} (${integersToWords(copies())}) ლარი – თანახმად "სანოტარო მოქმედებათა შესრულეებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ" საქართველოს მთავრობის 2011 წლის 29 დეკემბრის #507 დადგენილების 31-ე მუხლისა და დღგ ${copiesVAT()} (${integersToWords(copiesVAT())}${decimalsToWords(copiesVAT())} ლარი თანახმად საქართველოს საგადასახადო კოდექსის 166-ე მუხლისა.`
  } else if (copiesVAT() === 0 && forCopying() > 0) {
    fullTextArea.innerHTML = `სანოტარო მოქმედების შესრულებისათვის გადახდილ იქნა საზღაური სულ: <b> ${copiesFullPrice()} (${integersToWords(copiesFullPrice())}${decimalsToWords(copiesFullPrice())} ლარი,</b> მათ შორის: ${copies()} (${integersToWords(copies())}) ლარი – თანახმად "სანოტარო მოქმედებათა შესრულეებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ" საქართველოს მთავრობის 2011 წლის 29 დეკემბრის #507 დადგენილების 31-ე მუხლისა და ${forCopying()} (${integersToWords(forCopying())}${decimalsToWords(forCopying())} ლარი თანახმად ამავე დადგენილების 35-ე მუხლისა.`
  } else if (copiesVAT() === 0 && forCopying() === 0) {
    fullTextArea.innerHTML = `სანოტარო მოქმედების შესრულებისათვის გადახდილ იქნა საზღაური - <b> ${copies()} (${integersToWords(copies())}) ლარი,</b> თანახმად "სანოტარო მოქმედებათა შესრულეებისათვის საზღაურისა და საქართველოს ნოტარიუსთა პალატისთვის დადგენილი საფასურის ოდენობების, მათი გადახდევინების წესისა და მომსახურების ვადების დამტკიცების შესახებ" საქართველოს მთავრობის 2011 წლის 29 დეკემბრის #507 დადგენილების 31-ე მუხლისა.`
  }  
}

function setupEventListenersCopies() {
  const submitBttn = document.getElementById('submit-copies');
  const resetBttn = document.getElementById('reset-copies');
  
  //submitBttn.removeEventListener('click', mySubmit);
  submitBttn.addEventListener('click', mySubmitCopies);
  submitBttn.addEventListener('click', renderFullTextCopies);
  resetBttn.addEventListener('click', resetCopies);


  const copy0 = document.getElementById("copy0");
  const copyYes = document.getElementById("copyYes"); 

  copy0.addEventListener('click', () => {document.getElementById('forCopying').setAttribute('disabled', 'disabled'); const forCopyingInput = document.getElementById("forCopying"); forCopyingInput.value = "0"});
  copyYes.addEventListener('click', () => {document.getElementById('forCopying').removeAttribute('disabled')});

}

setupEventListenersCopies();

function eventListenersforCopyingCopies() {
  const copyFullBttn = document.getElementById('copy-full-copies');
  const copySignaturesBttn = document.getElementById('copy-notary-copies');
  const copyForCopyingBttn = document.getElementById('copy-for-copying'); 
  const copyVatBttn = document.getElementById('copy-VAT-copies');
  const copyFullText = document.getElementById('copyFullTextCopies');

  copyFullBttn.addEventListener('click', () => {copyContent(document.getElementById('copyFullPrice').innerText)});
  copySignaturesBttn.addEventListener('click', () => {copyContent(document.getElementById('copiesPrice').innerText)});
  copyForCopyingBttn.addEventListener('click', () => {copyContent(document.getElementById('forCopyingResult').innerText)});
  copyVatBttn.addEventListener('click', () => {copyContent(document.getElementById('copiesVAT').innerText)});
  copyFullText.addEventListener('click', () => {copyRich(document.getElementById('copiesFullText'))});

}

eventListenersforCopyingCopies();

function resetCopies() {
  document.getElementById("copiesForm").reset();
  document.getElementById("copiesPrice").innerHTML = "";
  document.getElementById("copiesVAT").innerHTML = "";
  document.getElementById("forCopyingResult").innerHTML = "";
  document.getElementById('copyFullPrice').innerHTML = "";
  document.getElementById('copiesFullText').innerHTML = "";

  document.getElementById('forCopying').setAttribute('disabled', 'disabled');
}

