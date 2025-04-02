# Seznam úkolů (Todo App)

Jednoduchá aplikace pro správu úkolů, kterou budeme vytvářet krok za krokem. Začneme s HTML strukturou a postupně budeme přidávat JavaScript funkcionalitu.

Tento projekt je součástí kurzu **Základy programování v Reactu (4IT427)** na Vysoké škole ekonomické v Praze.

## Obsah

- [Popis projektu](#popis-projektu)
- [Jak spustit projekt](#jak-spustit-projekt)
- [Struktura HTML](#struktura-html)
- [Základní funkce JavaScriptu](#základní-funkce-javascriptu)
- [Klíčové koncepty JavaScriptu](#klíčové-koncepty-javascriptu)
  - [Datové typy](#datové-typy)
  - [Proměnné (let, var, const)](#proměnné-let-var-const)
  - [Funkce (normální a arrow)](#funkce-normální-a-arrow)
  - [Podmínky](#podmínky)
  - [Cykly](#cykly)
- [Užitečné odkazy](#užitečné-odkazy)

## Popis projektu

V tomto projektu budeme společně vytvářet jednoduchou aplikaci pro správu úkolů. Začneme s HTML strukturou, která bude obsahovat formulář pro přidání nových úkolů a seznam pro jejich zobrazení. Poté budeme postupně přidávat JavaScript funkcionalitu, která umožní:

- Přidávat nové úkoly
- Označovat úkoly jako dokončené
- Mazat úkoly
- Zobrazovat seznam všech úkolů

Tento přístup vám pomůže pochopit, jak JavaScript interaguje s HTML a jak můžeme postupně přidávat funkcionalitu k základní HTML struktuře.

## Jak spustit projekt

1. Ujistěte se, že máte nainstalovaný Node.js
2. Nainstalujte závislosti:
   ```
   npm install
   ```
3. Spusťte vývojový server:
   ```
   npm run dev
   ```
4. Otevřete prohlížeč na adrese: `http://localhost:5173`

## Struktura HTML

HTML struktura aplikace je jednoduchá a srozumitelná:

```html
<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seznam úkolů</title>
    <link rel="stylesheet" href="./src/style.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Můj seznam úkolů</h1>
        <p class="subtitle">Přidejte si své úkoly</p>
      </header>

      <main>
        <form id="todo-form">
          <div class="input-group">
            <input
              name="todo-text"
              id="new-todo-input"
              placeholder="Co je potřeba udělat?"
              autocomplete="off"
            />
            <button type="submit" id="add-btn">Přidat</button>
          </div>
        </form>

        <div class="todo-container">
          <ul id="todo-list"></ul>
        </div>
      </main>

      <footer>
        <p>Kliknutím na úkol ho označíte jako dokončený</p>
      </footer>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Hlavní elementy:

- `<form id="todo-form">` - formulář pro přidání nového úkolu
- `<input name="todo-text" id="new-todo-input">` - vstupní pole pro text úkolu
- `<button type="submit" id="add-btn">` - tlačítko pro přidání úkolu
- `<ul id="todo-list">` - seznam úkolů, který je dynamicky generován JavaScriptem

## Základní funkce JavaScriptu

V aplikaci jsou použity následující základní funkce JavaScriptu:

### 1. Získání elementů ze stránky

```javascript
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
```

Funkce `document.getElementById()` vrací element podle jeho ID. V TypeScriptu používáme `as HTMLFormElement` pro určení typu elementu.

### 2. Přidání posluchače události

```javascript
todoForm.addEventListener("submit", handleTodoFormSubmit);
```

Metoda `addEventListener()` přidává posluchače události na element. V tomto případě posloucháme událost `submit` na formuláři.

### 3. Získání dat z formuláře

```javascript
const formData = new FormData(todoForm);
const todoText = formData.get("todo-text") as string;
```

`FormData` je objekt, který umožňuje snadno získat data z formuláře. Metoda `get()` vrací hodnotu podle jména pole.

### 4. Vytvoření elementů

```javascript
const todoItem = document.createElement("li");
const span = document.createElement("span");
const button = document.createElement("button");
```

Metoda `document.createElement()` vytváří nový HTML element.

### 5. Nastavení atributů a vlastností

```javascript
todoItem.setAttribute("data-id", todo.id);
span.textContent = todo.text;
button.textContent = "Smazat";
```

Metoda `setAttribute()` nastavuje atribut elementu, vlastnost `textContent` nastavuje textový obsah elementu.

### 6. Přidání elementů do DOM

```javascript
todoItem.appendChild(span);
todoItem.appendChild(button);
todoList.appendChild(todoItem);
```

Metoda `appendChild()` přidává element jako potomka jiného elementu.

### 7. Vyčištění obsahu elementu

```javascript
todoList.innerHTML = "";
```

Vlastnost `innerHTML` umožňuje nastavit nebo získat HTML obsah elementu. Nastavením na prázdný řetězec vyčistíme obsah elementu.

## Klíčové koncepty JavaScriptu

### Datové typy

JavaScript má několik základních datových typů:

#### Primitivní typy

```javascript
// String (řetězec)
const text = "Ahoj světe";

// Number (číslo)
const cislo = 42;
const desetinne = 3.14;

// Boolean (logická hodnota)
const jePravda = true;
const jeNepravda = false;

// Undefined (nedefinovaná hodnota)
let nedefinovano;
console.log(nedefinovano); // undefined

// Null (prázdná hodnota)
const prazdno = null;

// Symbol (unikátní identifikátor)
const symbol = Symbol("popis");

// BigInt (velká celá čísla)
const velkeCislo = 9007199254740991n;
```

#### Objekty

```javascript
// Objekt
const osoba = {
  jmeno: "Jan",
  vek: 30,
  adresa: {
    ulice: "Hlavní 123",
    mesto: "Praha",
  },
};

// Pole (speciální typ objektu)
const barvy = ["červená", "zelená", "modrá"];
```

### Operátory

JavaScript podporuje různé typy operátorů:

#### Aritmetické operátory

```javascript
const a = 10;
const b = 5;

console.log(a + b); // Sčítání: 15
console.log(a - b); // Odčítání: 5
console.log(a * b); // Násobení: 50
console.log(a / b); // Dělení: 2
console.log(a % b); // Modulo (zbytek po dělení): 0
console.log(a ** b); // Umocnění: 100000
console.log(a++); // Inkrementace: 10 (vrátí hodnotu a pak zvýší)
console.log(++a); // Inkrementace: 12 (zvýší a pak vrátí hodnotu)
console.log(b--); // Dekrementace: 5 (vrátí hodnotu a pak sníží)
console.log(--b); // Dekrementace: 3 (sníží a pak vrátí hodnotu)
```

#### Porovnávací operátory

```javascript
console.log(5 == "5"); // Rovná se (typová konverze): true
console.log(5 === "5"); // Rovná se (bez typové konverze): false
console.log(5 != "5"); // Nerovná se (typová konverze): false
console.log(5 !== "5"); // Nerovná se (bez typové konverze): true
console.log(5 > 3); // Větší než: true
console.log(5 >= 5); // Větší nebo rovno: true
console.log(3 < 5); // Menší než: true
console.log(5 <= 5); // Menší nebo rovno: true
```

#### Logické operátory

```javascript
console.log(true && true); // AND: true
console.log(true && false); // AND: false
console.log(true || false); // OR: true
console.log(false || false); // OR: false
console.log(!true); // NOT: false
```

#### Operátor nullish coalescing (??)

```javascript
const hodnota = null;
const vychozi = hodnota ?? "výchozí hodnota"; // "výchozí hodnota"
```

#### Operátor optional chaining (?.)

```javascript
const osoba = { adresa: { mesto: "Praha" } };
console.log(osoba?.adresa?.mesto); // "Praha"
console.log(osoba?.kontakt?.email); // undefined (bez chyby)
```

### Proměnné (let, var, const)

JavaScript nabízí tři způsoby deklarace proměnných:

#### var

```javascript
var x = 10;
```

- Funkční scope (přístupná v celé funkci)
- Hoisting (proměnná je dostupná v celém scope, i když je deklarována později)
- Může být znovu deklarována
- Nedoporučuje se používat v moderním JavaScriptu

#### let

```javascript
let y = 20;
```

- Blokový scope (přístupná pouze v bloku, kde je deklarována)
- Žádný hoisting
- Může být změněna, ale ne znovu deklarována
- Doporučený způsob deklarace proměnných, které se budou měnit

#### const

```javascript
const z = 30;
```

- Blokový scope
- Žádný hoisting
- Nemůže být změněna ani znovu deklarována
- Doporučený způsob deklarace konstant

### Objekty a třídy

JavaScript je objektově orientovaný jazyk, který podporuje práci s objekty a třídami.

#### Objekty

```javascript
// Vytvoření objektu pomocí literálu
const osoba = {
  jmeno: "Jan",
  vek: 30,
  pozdravit: function () {
    return `Ahoj, jsem ${this.jmeno}`;
  },
};

// Přístup k vlastnostem
console.log(osoba.jmeno); // "Jan"
console.log(osoba["vek"]); // 30
console.log(osoba.pozdravit()); // "Ahoj, jsem Jan"

// Přidání nové vlastnosti
osoba.povolani = "programátor";

// Smazání vlastnosti
delete osoba.vek;
```

#### Třídy

```javascript
// Definice třídy
class Osoba {
  constructor(jmeno, vek) {
    this.jmeno = jmeno;
    this.vek = vek;
  }

  pozdravit() {
    return `Ahoj, jsem ${this.jmeno}`;
  }

  // Statická metoda
  static vytvorAnonymni() {
    return new Osoba("Anonym", 0);
  }
}

// Vytvoření instance
const jan = new Osoba("Jan", 30);
console.log(jan.pozdravit()); // "Ahoj, jsem Jan"

// Dědičnost
class Programator extends Osoba {
  constructor(jmeno, vek, jazyk) {
    super(jmeno, vek);
    this.jazyk = jazyk;
  }

  programovat() {
    return `${this.jmeno} programuje v ${this.jazyk}`;
  }
}

const programator = new Programator("Jan", 30, "JavaScript");
console.log(programator.programovat()); // "Jan programuje v JavaScript"
```

### Pole (Arrays)

Pole v JavaScriptu jsou speciální typ objektu, který umožňuje ukládat a zpracovávat kolekce hodnot.

```javascript
// Vytvoření pole
const barvy = ["červená", "zelená", "modrá"];

// Přístup k prvkům
console.log(barvy[0]); // "červená"
console.log(barvy.length); // 3

// Přidání prvku na konec
barvy.push("žlutá");
console.log(barvy); // ["červená", "zelená", "modrá", "žlutá"]

// Odstranění posledního prvku
const posledni = barvy.pop();
console.log(posledni); // "žlutá"
console.log(barvy); // ["červená", "zelená", "modrá"]

// Přidání prvku na začátek
barvy.unshift("bílá");
console.log(barvy); // ["bílá", "červená", "zelená", "modrá"]

// Odstranění prvního prvku
const prvni = barvy.shift();
console.log(prvni); // "bílá"
console.log(barvy); // ["červená", "zelená", "modrá"]

// Metody pro práci s poli
const cisla = [1, 2, 3, 4, 5];

// map - transformace každého prvku
const dvojnasobek = cisla.map((cislo) => cislo * 2);
console.log(dvojnasobek); // [2, 4, 6, 8, 10]

// filter - filtrování prvků podle podmínky
const suda = cisla.filter((cislo) => cislo % 2 === 0);
console.log(suda); // [2, 4]

// reduce - redukce pole na jednu hodnotu
const soucet = cisla.reduce((akumulator, cislo) => akumulator + cislo, 0);
console.log(soucet); // 15

// find - nalezení prvního prvku splňujícího podmínku
const vetsiNezTri = cisla.find((cislo) => cislo > 3);
console.log(vetsiNezTri); // 4

// some - zjištění, zda alespoň jeden prvek splňuje podmínku
const obsahujeTri = cisla.some((cislo) => cislo === 3);
console.log(obsahujeTri); // true

// every - zjištění, zda všechny prvky splňují podmínku
const vsechnyVetsiNezNula = cisla.every((cislo) => cislo > 0);
console.log(vsechnyVetsiNezNula); // true
```

### Funkce (normální a arrow)

#### Normální funkce

```javascript
function add(a, b) {
  return a + b;
}
```

- Vlastní `this` kontext
- Může být použita jako konstruktor (s klíčovým slovem `new`)
- Má přístup k `arguments` objektu
- Může být pojmenována

#### Arrow funkce

```javascript
const multiply = (a, b) => a * b;
```

- Dědí `this` kontext z okolního scope
- Nemůže být použita jako konstruktor
- Nemá přístup k `arguments` objektu
- Stručnější syntaxe
- Ideální pro callback funkce

#### Rozdíl ve scopingu

```javascript
// Normální funkce
function example() {
  console.log(this); // this je kontext, ve kterém je funkce volána

  setTimeout(function () {
    console.log(this); // this je window nebo undefined (v závislosti na strict mode)
  }, 1000);
}

// Arrow funkce
function example() {
  console.log(this); // this je kontext, ve kterém je funkce volána

  setTimeout(() => {
    console.log(this); // this je stejný jako v nadřazeném scope
  }, 1000);
}
```

Hlavní rozdíl je v tom, jak pracují s `this` kontextem. Arrow funkce nemají vlastní `this`, ale dědí ho z nadřazeného scope. To je užitečné zejména v callback funkcích, kde chceme zachovat původní `this` kontext.

### Podmínky

Podmínky v JavaScriptu umožňují provádět různé akce podle toho, zda je splněna určitá podmínka.

#### if, else if, else

```javascript
if (podmínka) {
  // Kód, který se provede, pokud je podmínka splněna
} else if (jiná podmínka) {
  // Kód, který se provede, pokud je jiná podmínka splněna
} else {
  // Kód, který se provede, pokud není splněna žádná podmínka
}
```

#### Ternární operátor

```javascript
const výsledek = podmínka ? hodnota1 : hodnota2;
```

Ternární operátor je zkrácený zápis podmínky. Pokud je podmínka splněna, vrátí se hodnota1, jinak hodnota2.

#### switch

```javascript
switch (hodnota) {
  case 1:
    // Kód pro hodnotu 1
    break;
  case 2:
    // Kód pro hodnotu 2
    break;
  default:
  // Kód pro všechny ostatní hodnoty
}
```

Switch je užitečný, když chceme provést různé akce podle hodnoty proměnné.

### Cykly

Cykly v JavaScriptu umožňují opakovaně provádět určitý blok kódu.

#### for

```javascript
for (let i = 0; i < 10; i++) {
  // Kód, který se provede 10krát
}
```

For cyklus se používá, když víme, kolikrát chceme cyklus opakovat.

#### while

```javascript
let i = 0;
while (i < 10) {
  // Kód, který se provede, dokud je i < 10
  i++;
}
```

While cyklus se provádí, dokud je splněna podmínka.

#### do...while

```javascript
let i = 0;
do {
  // Kód, který se provede alespoň jednou
  i++;
} while (i < 10);
```

Do...while cyklus se provede alespoň jednou, i když podmínka není splněna.

#### for...of

```javascript
const pole = [1, 2, 3, 4, 5];
for (const hodnota of pole) {
  // Kód, který se provede pro každou hodnotu v poli
}
```

For...of cyklus se používá pro iteraci přes iterovatelné objekty (pole, řetězce, atd.).

#### for...in

```javascript
const objekt = { a: 1, b: 2, c: 3 };
for (const klíč in objekt) {
  // Kód, který se provede pro každý klíč v objektu
}
```

For...in cyklus se používá pro iteraci přes vlastnosti objektu.

### Události (Events)

JavaScript umožňuje reagovat na různé události, které se dějí v prohlížeči.

#### Základní události

```javascript
// Události myši
element.addEventListener("click", function (event) {
  console.log("Kliknutí na element");
});

element.addEventListener("mouseover", function (event) {
  console.log("Myš je nad elementem");
});

element.addEventListener("mouseout", function (event) {
  console.log("Myš opustila element");
});

// Události klávesnice
document.addEventListener("keydown", function (event) {
  console.log(`Stisknuta klávesa: ${event.key}`);
});

// Události formuláře
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Zabránění výchozímu chování (odeslání formuláře)
  console.log("Formulář byl odeslán");
});

input.addEventListener("change", function (event) {
  console.log(`Hodnota změněna na: ${event.target.value}`);
});

// Události okna
window.addEventListener("load", function () {
  console.log("Stránka byla načtena");
});

window.addEventListener("resize", function () {
  console.log(`Velikost okna: ${window.innerWidth}x${window.innerHeight}`);
});
```

#### Event objekt

Když se událost spustí, JavaScript vytvoří objekt události, který obsahuje informace o události.

```javascript
element.addEventListener("click", function (event) {
  console.log(event.type); // "click"
  console.log(event.target); // Element, na který bylo kliknuto
  console.log(event.clientX); // X souřadnice kliknutí
  console.log(event.clientY); // Y souřadnice kliknutí
  console.log(event.preventDefault); // Funkce pro zabránění výchozímu chování
  console.log(event.stopPropagation); // Funkce pro zastavení šíření události
});
```

#### Delegování událostí

Delegování událostí je technika, při které se událost zachytí na nadřazeném elementu a zpracuje se podle cílového elementu.

```javascript
// Místo přidávání události na každý element
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    console.log("Kliknutí na tlačítko");
  });
});

// Použijeme delegování událostí
const container = document.querySelector(".container");
container.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    console.log("Kliknutí na tlačítko");
  }
});
```

### Asynchronní programování

JavaScript je jednovláknový jazyk, což znamená, že může provádět pouze jeden blok kódu najednou. Asynchronní programování umožňuje provádět dlouhotrvající operace bez blokování hlavního vlákna.

#### Callback funkce

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data); // { name: "John", age: 30 }
});
```

Callback funkce jsou předávány jako argumenty jiným funkcím a jsou volány po dokončení operace. Mohou vést k "callback hell" (vnořené callbacky), což ztěžuje čtení a údržbu kódu.

#### Promises

Promise je objekt, který představuje dokončení (nebo selhání) asynchronní operace a její výslednou hodnotu.

```javascript
const promise = new Promise((resolve, reject) => {
  // Asynchronní operace
  const success = true;

  if (success) {
    resolve({ name: "John", age: 30 });
  } else {
    reject(new Error("Operace selhala"));
  }
});

promise
  .then((data) => {
    console.log(data); // { name: "John", age: 30 }
  })
  .catch((error) => {
    console.error(error);
  });
```

Promise má tři stavy:

- **Pending (čekající)**: Počáteční stav, operace ještě není dokončena
- **Fulfilled (splněná)**: Operace byla úspěšně dokončena
- **Rejected (zamítnutá)**: Operace selhala

#### async/await

`async/await` je syntaktický cukr nad Promises, který umožňuje psát asynchronní kód v synchronním stylu.

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
    throw error;
  }
}

// Použití
fetchData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

Klíčová slova:

- `async` před funkcí označuje, že funkce vrací Promise
- `await` může být použito pouze uvnitř `async` funkce a čeká na dokončení Promise
- `try/catch` blok umožňuje zachytit chyby v asynchronním kódu

#### Paralelní zpracování

```javascript
async function fetchMultipleData() {
  try {
    // Paralelní zpracování více Promise
    const [data1, data2] = await Promise.all([
      fetch("https://api.example.com/data1").then((res) => res.json()),
      fetch("https://api.example.com/data2").then((res) => res.json()),
    ]);

    return { data1, data2 };
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
    throw error;
  }
}
```

`Promise.all()` umožňuje spustit více Promise paralelně a počkat na dokončení všech z nich.

## Užitečné odkazy

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/cs/docs/Web/JavaScript) - Oficiální dokumentace JavaScriptu
- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) - Dokumentace DOM API
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Oficiální dokumentace TypeScriptu
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/) - Interaktivní tutoriál JavaScriptu
- [JavaScript.info](https://javascript.info/) - Moderní JavaScript tutoriál
