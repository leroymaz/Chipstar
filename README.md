# Chipstar Bakery Website

**Brand:** Chipstar Bakery  
**Slogan:** Home of Sweetness and freshness.  
**Currency:** USD  
**WhatsApp ordering:** +263782462881

A responsive bakery website project with product search, a catalogue-powered chatbot, and WhatsApp order links. It is intended to pair with the Chipstar navy-blue and silver visual theme.

## Project files

Keep these files together in one folder:

```text
chipstar-bakery/
├── index.html
├── style.css
├── chipstar-updated.js
└── README.md
```

- `index.html` — website structure and page content.
- `style.css` — visual styling and responsive layout.
- `chipstar-updated.js` — product catalogue, search, chatbot responses, and WhatsApp order links.
- `README.md` — setup and maintenance instructions.

## Current product catalogue

| Product | Listed price | Catalogue availability | Size recorded |
|---|---:|---|---|
| Chocolate Birthday Cake | $20.00 | Available | 8 inch |
| Vanilla Birthday Cake | $20.00 | Available | 8 inch |
| Red Velvet Birthday Cake | $20.00 | Available | 8 inch |
| Sweet Buns | $1.00 | Available | 8 inch — confirm |
| Burger Rolls | $1.00 | Available | 8 inch — confirm |
| Hot Dog Rolls | $1.00 | Available | 8 inch — confirm |
| Chocolate Ring Doughnut | $1.00 | Available | 8 inch — confirm |
| Croissant | $1.00 | Available | 8 inch — confirm |

Prices and availability reflect the details supplied for the catalogue. This project does not currently connect to live stock tracking. Customers should confirm current availability and the final order total with the bakery before paying.

## Business contact details

- **Address:** 3927 Simbi Park, Rutendo
- **Phone:** +263782462881
- **Phone:** +263782246461
- **Phone:** +263776813770
- **WhatsApp orders:** +263782462881

WhatsApp ordering opens a pre-filled message. The customer must review and send it; the website does not submit orders automatically.

## Setup instructions

1. Create a folder named `chipstar-bakery`.
2. Place `index.html`, `style.css`, and `chipstar-updated.js` in that folder.
3. Save this document as `README.md` in the same folder.
4. Make sure the JavaScript filename is exactly `chipstar-updated.js`, not `chipstar-updated.js.txt`.

### Link the stylesheet

Inside the `<head>` section of `index.html`, add:

```html
<link rel="stylesheet" href="style.css">
```

### Link the JavaScript

Before the closing `</body>` tag in `index.html`, add:

```html
<script src="chipstar-updated.js" defer></script>
```

### Required search and chatbot IDs

The JavaScript looks for these HTML element IDs:

- `productSearch`
- `searchButton`
- `searchResults`
- `chatMessages`
- `chatForm`
- `chatInput`

If your page already has these elements, check that the IDs match. Do not create duplicate controls if they already exist.

Example markup:

```html
<section aria-label="Product search">
  <label for="productSearch">Search bakery products</label>
  <input id="productSearch" type="search"
         placeholder="Search cakes, buns, rolls...">
  <button id="searchButton" type="button">Search</button>
  <div id="searchResults" aria-live="polite"></div>
</section>

<section aria-label="Bakery chatbot">
  <div id="chatMessages" aria-live="polite"></div>
  <form id="chatForm">
    <label for="chatInput">Ask Chipstar Bakery</label>
    <input id="chatInput" type="text"
           placeholder="Ask about products or prices..." required>
    <button type="submit">Send</button>
  </form>
</section>
```

### Open and test the website

Open `index.html` in a modern browser. Search for a product, try a chatbot question, and click an order button to open WhatsApp. For local development, you can also use a local web server or the Live Server extension in Visual Studio Code.

## Features

- Search the local bakery product catalogue.
- Ask the chatbot about listed products, prices, sizes, and catalogue availability.
- Open a pre-filled WhatsApp order message.
- Display prices in USD.
- Show bakery contact information and address.
- Avoid inventing ingredient, allergen, or nutrition details when verified information has not been added.

## Testing checklist

1. Search for `chocolate birthday cake`.
2. Search for `croissant`.
3. Ask: `How much is a vanilla birthday cake?`
4. Ask: `What products do you sell?`
5. Ask: `Where are you located?`
6. Ask: `How do I order?`
7. Ask about ingredients or calories; the chatbot should say verified details have not been supplied.
8. Click **Order on WhatsApp** and check the recipient number.
9. Check the website on desktop and a narrow mobile screen.

If something does not work, open your browser's developer tools and check the Console for errors. Verify the filenames and required HTML IDs.

## Updating products and prices

Open `chipstar-updated.js` and find the `PRODUCTS` array near the top. Each product has fields such as:

```javascript
{
    id: "croissant",
    name: "Croissant",
    category: "Breakfast",
    price: 1,
    currency: "USD",
    availability: "Available",
    size: "8 inch — please confirm",
    description: "Croissant for breakfast or a snack.",
    ingredients: null,
    allergens: null,
    nutrition: null
}
```

Update `price`, `availability`, `size`, or `description` when the bakery confirms the information. Keep each product's `id` unique.

The chatbot can only report details included in its catalogue. The browser API also provides `window.ChipstarBakery.updateProduct(productId, updates)`, but changes made this way last only until the page is reloaded unless you update the source file or add persistent storage.

## Ingredients, allergens, and nutrition

Ingredient, allergen, and nutrition fields are currently unconfirmed and are deliberately left empty. The chatbot should not guess these details.

Before publishing this information:
- Use details verified by the bakery or a qualified source.
- Record serving sizes and units for nutrition values.
- Identify relevant allergens and cross-contact risks.
- Review details when recipes or suppliers change.

The current chatbot is a browser-based rule-and-catalogue assistant. It is not connected to a live inventory, payment service, customer database, or external AI service.

## Troubleshooting

### CSS styling does not appear
- Check that `style.css` is in the same folder as `index.html`.
- Confirm the stylesheet link is inside `<head>`.
- Check filename spelling and capitalization.

### Search or chatbot does not work
- Check that `chipstar-updated.js` is in the same folder as `index.html`.
- Confirm the script tag is present.
- Check the required HTML IDs.
- Review errors in the browser developer console.

### WhatsApp does not open
- Make sure WhatsApp or WhatsApp Web is available on your device.
- Check the phone number in the JavaScript file.
- Remember that the customer must send the prepared message themselves.

### A product is marked available but has sold out
The catalogue is manually maintained. Update the product's availability in the JavaScript file and reload the page. Real-time stock requires a backend or inventory system.

## Before publishing

- Confirm all prices, sizes, and stock status.
- Add verified ingredients, allergens, and nutrition information where available.
- Test every WhatsApp order link.
- Add real product images with meaningful alternative text.
- Test mobile layout, keyboard navigation, and browser compatibility.
- Review privacy practices if customer data, analytics, accounts, or order storage are added.
- Test the deployed website after hosting it.

## Licence and ownership

This README does not assign a software licence. Decide how the source code should be licensed before distributing it. The website footer can still follow the requested design without a licence section.

---

**Chipstar Bakery — Home of Sweetness and freshness.**
