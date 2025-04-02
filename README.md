# Seznam úkolů (Todo App)

Jednoduchá aplikace pro správu úkolů, kterou budeme vytvářet krok za krokem. Začneme s HTML strukturou a postupně budeme přidávat JavaScript funkcionalitu.

## Obsah

- [Popis projektu](#popis-projektu)
- [Jak spustit projekt](#jak-spustit-projekt)
- [Struktura HTML](#struktura-html)
- [Základní funkce JavaScriptu](#základní-funkce-javascriptu)
- [Klíčové koncepty JavaScriptu](#klíčové-koncepty-javascriptu)
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

## Užitečné odkazy

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/cs/docs/Web/JavaScript) - Oficiální dokumentace JavaScriptu
- [MDN Web Docs - DOM](https://developer.mozilla.org/cs/docs/Web/API/Document_Object_Model) - Dokumentace DOM API
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Oficiální dokumentace TypeScriptu
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/) - Interaktivní tutoriál JavaScriptu
- [JavaScript.info](https://javascript.info/) - Moderní JavaScript tutoriál
