```javascript
/* ==========================================================
   CHIPSTAR BAKERY — SEARCH & CHATBOT
   File: chipstar-updated.js
   Currency: USD
   Ordering: WhatsApp
   ========================================================== */

(function () {
    "use strict";

    /* ------------------------------------------------------
       1. BAKERY PRODUCT CATALOGUE
       Prices and availability below are supplied by the user.
       Ingredients, allergens and nutrition need confirmation.
       ------------------------------------------------------ */

    const PRODUCTS = [
        {
            id: "cake-chocolate-birthday",
            name: "Chocolate Birthday Cake",
            category: "Birthday Cakes",
            price: 20,
            currency: "USD",
            availability: "Available",
            size: "8 inch",
            description: "Chocolate birthday cake for celebrations.",
            ingredients: null,
            allergens: null,
            nutrition: null
        },
        {
            id: "cake-vanilla-birthday",
            name: "Vanilla Birthday Cake",
            category: "Birthday Cakes",
            price: 20,
            currency: "USD",
            availability: "Available",
            size: "8 inch",
            description: "Vanilla birthday cake for special occasions.",
            ingredients: null,
            allergens: null,
            nutrition: null
        },
        {
            id: "cake-red-velvet-birthday",
            name: "Red Velvet Birthday Cake",
            category: "Birthday Cakes",
            price: 20,
            currency: "USD",
            availability: "Available",
            size: "8 inch",
            description: "Red velvet birthday cake for celebrations.",
            ingredients: null,
            allergens: null,
            nutrition: null
        },
        {
            id: "sweet-buns",
            name: "Sweet Buns",
            category: "Bakery",
            price: 1,
            currency: "USD",
            availability: "Available",
            size: "8 inch — please confirm",
            description: "Sweet bakery buns.",
            ingredients: null,
            allergens: null,
            nutrition: null
        },
        {
            id: "burger-rolls",
            name: "Burger Rolls",
            category: "Bakery Rolls",
            price: 1,
            currency: "USD",
            availability: "Available",
            size: "8 inch — please confirm",
            description: "Rolls suitable for serving burgers.",
            ingredients: null,
            allergens: null,
            nutrition: null
        },
        {
            id: "hot-dog-rolls",
            name: "Hot Dog Rolls",
            category: "Bakery Rolls",
            price: 1,
            currency: "USD",
            availability: "Available",
            size: "8 inch — please confirm",
            description: "Rolls suitable for serving hot dogs.",
            ingredients: null,
            allergens: null,
            nutrition: null
        },
        {
            id: "choc-ring-doughnut",
            name: "Chocolate Ring Doughnut",
            category: "Doughnuts",
            price: 1,
            currency: "USD",
            availability: "Available",
            size: "8 inch — please confirm",
            description: "Ring doughnut with chocolate.",
            ingredients: null,
            allergens: null,
            nutrition: null
        },
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
    ];

    const WHATSAPP_NUMBER = "263782462881";

    const BUSINESS = {
        name: "Chipstar Bakery",
        slogan: "Home of Sweetness and freshness.",
        address: "3927 Simbi Park, Rutendo",
        phoneNumbers: [
            "+263782462881",
            "+263782246461",
            "+263776813770"
        ]
    };

    /* ------------------------------------------------------
       2. GENERAL HELPERS
       ------------------------------------------------------ */

    function normalize(text) {
        return String(text || "")
            .toLowerCase()
            .replace(/[’']/g, "")
            .replace(/[^a-z0-9.\s-]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[char];
        });
    }

    function formatPrice(product) {
        return "$" + Number(product.price).toFixed(2);
    }

    function findProduct(query) {
        const text = normalize(query);

        if (!text) {
            return [];
        }

        const words = text.split(" ");

        return PRODUCTS.map(function (product) {
            const name = normalize(product.name);
            const category = normalize(product.category);
            const description = normalize(product.description);

            let score = 0;

            if (name === text) {
                score += 100;
            }

            if (name.includes(text)) {
                score += 50;
            }

            if (text.includes(name)) {
                score += 35;
            }

            if (category.includes(text)) {
                score += 20;
            }

            if (description.includes(text)) {
                score += 10;
            }

            words.forEach(function (word) {
                if (word.length < 2) {
                    return;
                }

                if (name.includes(word)) {
                    score += 8;
                } else if (category.includes(word)) {
                    score += 4;
                } else if (description.includes(word)) {
                    score += 2;
                }
            });

            return {
                product: product,
                score: score
            };
        })
        .filter(function (item) {
            return item.score > 0;
        })
        .sort(function (a, b) {
            return b.score - a.score;
        })
        .map(function (item) {
            return item.product;
        });
    }

    function getProductByName(name) {
        const target = normalize(name);

        return PRODUCTS.find(function (product) {
            return normalize(product.name) === target ||
                   normalize(product.id) === target;
        }) || null;
    }

    function availabilityMessage(product) {
        if (product.availability === "Available") {
            return "Our catalogue lists this product as available. " +
                   "Please confirm current stock with the bakery before payment.";
        }

        if (product.availability === "Unavailable") {
            return "This product is currently marked unavailable in our catalogue.";
        }

        return "Current availability has not been confirmed. Please contact the bakery.";
    }

    /* ------------------------------------------------------
       3. PRODUCT SEARCH
       ------------------------------------------------------ */

    function searchProducts(query) {
        return findProduct(query);
    }

    function renderSearchResults(results, container) {
        if (!container) {
            return;
        }

        if (!results.length) {
            container.innerHTML =
                '<p class="chipstar-no-results">' +
                'No matching products were found. Try searching for ' +
                'cake, croissant, buns, rolls or doughnut.' +
                '</p>';
            return;
        }

        container.innerHTML = results.map(function (product) {
            return `
                <article class="chipstar-product-card">
                    <div class="chipstar-product-details">
                        <h3>${escapeHTML(product.name)}</h3>

                        <p>${escapeHTML(product.description)}</p>

                        <p>
                            <strong>Price:</strong>
                            ${formatPrice(product)}
                        </p>

                        <p>
                            <strong>Size:</strong>
                            ${escapeHTML(product.size)}
                        </p>

                        <p>
                            <strong>Catalogue status:</strong>
                            ${escapeHTML(product.availability)}
                        </p>

                        <button
                            type="button"
                            class="chipstar-order-button"
                            data-order-product="${escapeHTML(product.id)}">
                            Order on WhatsApp
                        </button>
                    </div>
                </article>
            `;
        }).join("");
    }

    function connectSearch() {
        const searchInput = document.getElementById("productSearch");
        const searchButton = document.getElementById("searchButton");
        const resultsContainer = document.getElementById("searchResults");

        if (!searchInput || !resultsContainer) {
            return;
        }

        function runSearch() {
            const query = searchInput.value.trim();

            if (!query) {
                resultsContainer.innerHTML =
                    '<p>Enter a bakery product to search.</p>';
                return;
            }

            const results = searchProducts(query);

            renderSearchResults(results, resultsContainer);
        }

        if (searchButton) {
            searchButton.addEventListener("click", runSearch);
        }

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                runSearch();
            }
        });

        searchInput.addEventListener("input", function () {
            if (!searchInput.value.trim()) {
                resultsContainer.innerHTML = "";
            }
        });
    }

    /* ------------------------------------------------------
       4. CHATBOT ANSWER ENGINE
       Answers are based on the catalogue, not guesses.
       ------------------------------------------------------ */

    function answerQuestion(question) {
        const text = normalize(question);

        if (!text) {
            return "Welcome to Chipstar Bakery! What bakery product can I help you find?";
        }

        /* Greetings */

        if (/^(hi|hello|hey|good morning|good afternoon|good evening)$/.test(text)) {
            return "Hello! Welcome to Chipstar Bakery — Home of Sweetness and freshness. " +
                   "You can ask me about our products, prices, sizes and listed availability.";
        }

        /* Business contact and location */

        if (
            text.includes("address") ||
            text.includes("location") ||
            text.includes("where are you")
        ) {
            return "Chipstar Bakery is located at " + BUSINESS.address +
                   ". You can contact us on " +
                   BUSINESS.phoneNumbers.join(", ") + ".";
        }

        if (
            text.includes("contact") ||
            text.includes("phone number") ||
            text.includes("telephone") ||
            text.includes("call you")
        ) {
            return "You can contact Chipstar Bakery on: " +
                   BUSINESS.phoneNumbers.join(", ") + ".";
        }

        if (
            text.includes("whatsapp") ||
            text.includes("place an order") ||
            text.includes("how do i order") ||
            text.includes("how to order")
        ) {
            return "You can order from Chipstar Bakery through WhatsApp at +" +
                   WHATSAPP_NUMBER +
                   ". Tell us which product you want, the quantity and your preferred collection or delivery arrangements.";
        }

        /* Business name */

        if (
            text.includes("who are you") ||
            text.includes("your name") ||
            text.includes("chipstar")
        ) {
            return "We are Chipstar Bakery — " + BUSINESS.slogan +
                   " Ask me about our cakes, buns, rolls, doughnuts or croissants.";
        }

        /* Nutrition questions */

        if (
            text.includes("nutrition") ||
            text.includes("calories") ||
            text.includes("calorie") ||
            text.includes("protein") ||
            text.includes("carbohydrate") ||
            text.includes("carbs") ||
            text.includes("fat content") ||
            text.includes("sugar content")
        ) {
            const matches = findProduct(text);

            if (matches.length === 1) {
                return "I don't yet have verified nutrition information for " +
                       matches[0].name +
                       ". Please contact the bakery for confirmed nutritional values.";
            }

            return "Verified nutrition information is not yet available in my product catalogue. " +
                   "I don't want to guess calorie, protein, carbohydrate, fat or sugar values. " +
                   "Please contact the bakery for confirmed information.";
        }

        /* Ingredients and allergens */

        if (
            text.includes("ingredient") ||
            text.includes("made from") ||
            text.includes("contains what") ||
            text.includes("allergen") ||
            text.includes("allergy") ||
            text.includes("gluten") ||
            text.includes("dairy") ||
            text.includes("milk") ||
            text.includes("egg") ||
            text.includes("nuts")
        ) {
            const matches = findProduct(text);

            if (matches.length === 1) {
                return "The ingredients and allergen details for " +
                       matches[0].name +
                       " have not yet been verified in my catalogue. " +
                       "Please contact the bakery before ordering, especially if you have a food allergy.";
            }

            return "I don't have verified ingredient or allergen information yet. " +
                   "For food allergies or dietary restrictions, please contact the bakery directly " +
                   "before ordering. I won't guess about ingredients or cross-contamination.";
        }

        /* Price questions */

        if (
            text.includes("price") ||
            text.includes("cost") ||
            text.includes("how much") ||
            text.includes("dollar") ||
            text.includes("usd") ||
            text.includes("cheap") ||
            text.includes("expensive")
        ) {
            const matches = findProduct(text);

            if (matches.length === 1) {
                const product = matches[0];

                return product.name + " costs " + formatPrice(product) +
                       ". Listed size: " + product.size +
                       ". " + availabilityMessage(product);
            }

            if (matches.length > 1) {
                return "Here are the matching products and their listed prices:\n" +
                    matches.map(function (product) {
                        return "• " + product.name + ": " + formatPrice(product);
                    }).join("\n") +
                    "\n\nAsk me about a specific product for more details.";
            }

            return "Which product would you like the price for? " +
                   "Our catalogue includes Chocolate Birthday Cake, Vanilla Birthday Cake, " +
                   "Red Velvet Birthday Cake, Sweet Buns, Burger Rolls, Hot Dog Rolls, " +
                   "Chocolate Ring Doughnut and Croissant.";
        }

        /* Availability questions */

        if (
            text.includes("available") ||
            text.includes("in stock") ||
            text.includes("stock") ||
            text.includes("do you have") ||
            text.includes("can i get") ||
            text.includes("is there")
        ) {
            const matches = findProduct(text);

            if (matches.length === 1) {
                return matches[0].name + ": " +
                       availabilityMessage(matches[0]);
            }

            if (matches.length > 1) {
                return matches.map(function (product) {
                    return product.name + ": " + product.availability +
                           " in the catalogue.";
                }).join("\n") +
                "\n\nPlease confirm current stock with the bakery before payment.";
            }

            return "Our catalogue lists the following products as available: " +
                   PRODUCTS.map(function (product) {
                       return product.name;
                   }).join(", ") +
                   ". Please confirm current stock with the bakery before payment.";
        }

        /* Size questions */

        if (
            text.includes("size") ||
            text.includes("inch") ||
            text.includes("big") ||
            text.includes("small") ||
            text.includes("diameter")
        ) {
            const matches = findProduct(text);

            if (matches.length === 1) {
                return "The catalogue lists the size of " +
                       matches[0].name + " as " + matches[0].size +
                       ". Please confirm this measurement with the bakery, particularly for buns, rolls, doughnuts and croissants.";
            }

            return "The three birthday cakes are listed as 8 inches. " +
                   "The size information supplied for the other products needs confirmation. " +
                   "Which product would you like to ask about?";
        }

        /* List products */

        if (
            text.includes("list products") ||
            text.includes("your products") ||
            text.includes("what do you sell") ||
            text.includes("what products") ||
            text.includes("your menu") ||
            text === "menu"
        ) {
            return "Our current catalogue contains:\n" +
                PRODUCTS.map(function (product) {
                    return "• " + product.name + " — " + formatPrice(product);
                }).join("\n") +
                "\n\nAsk me about any product's price, listed size or availability.";
        }

        /* Specific product lookup */

        const matches = findProduct(text);

        if (matches.length === 1) {
            const product = matches[0];

            return product.name + "\n" +
                   "Description: " + product.description + "\n" +
                   "Price: " + formatPrice(product) + "\n" +
                   "Listed size: " + product.size + "\n" +
                   "Catalogue status: " + product.availability + "\n" +
                   availabilityMessage(product) + "\n" +
                   "Ingredients, allergens and nutrition: not yet verified.";
        }

        if (matches.length > 1) {
            return "I found these matching products:\n" +
                matches.map(function (product) {
                    return "• " + product.name + " — " + formatPrice(product);
                }).join("\n") +
                "\n\nPlease specify which product you mean.";
        }

        return "Sorry, I couldn't find a confident answer in the current catalogue. " +
               "Try asking about a product's price, size or listed availability. " +
               "For other questions, contact Chipstar Bakery on +" +
               WHATSAPP_NUMBER + ".";
    }

    /* ------------------------------------------------------
       5. CHATBOT USER INTERFACE
       ------------------------------------------------------ */

    function addChatMessage(container, message, sender) {
        const bubble = document.createElement("div");

        bubble.className = sender === "user"
            ? "chipstar-chat-message chipstar-user-message"
            : "chipstar-chat-message chipstar-bot-message";

        bubble.textContent = message;
        bubble.style.whiteSpace = "pre-line";

        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
    }

    function connectChatbot() {
        const form = document.getElementById("chatForm");
        const input = document.getElementById("chatInput");
        const messages = document.getElementById("chatMessages");

        if (!form || !input || !messages) {
            return;
        }

        if (!messages.dataset.initialized) {
            addChatMessage(
                messages,
                "Welcome to Chipstar Bakery! Ask me about products, prices, sizes or listed availability.",
                "bot"
            );

            messages.dataset.initialized = "true";
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const question = input.value.trim();

            if (!question) {
                return;
            }

            addChatMessage(messages, question, "user");

            const answer = answerQuestion(question);

            addChatMessage(messages, answer, "bot");

            input.value = "";
            input.focus();
        });
    }

    /* ------------------------------------------------------
       6. WHATSAPP ORDERING
       ------------------------------------------------------ */

    function makeWhatsAppLink(product, quantity) {
        const selectedProduct = typeof product === "string"
            ? getProductByName(product) || PRODUCTS.find(function (item) {
                return item.id === product;
            })
            : product;

        if (!selectedProduct) {
            const generalMessage =
                "Hello Chipstar Bakery, I would like to enquire about your products.";

            return "https://wa.me/" + WHATSAPP_NUMBER +
                   "?text=" + encodeURIComponent(generalMessage);
        }

        const qty = Math.max(1, Number(quantity) || 1);

        const message =
            "Hello Chipstar Bakery!\n" +
            "I would like to order:\n" +
            "Product: " + selectedProduct.name + "\n" +
            "Quantity: " + qty + "\n" +
            "Listed unit price: " + formatPrice(selectedProduct) + "\n" +
            "Please confirm availability and the total before payment.";

        return "https://wa.me/" + WHATSAPP_NUMBER +
               "?text=" + encodeURIComponent(message);
    }

    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-order-product]");

        if (!button) {
            return;
        }

        const productId = button.getAttribute("data-order-product");
        const product = PRODUCTS.find(function (item) {
            return item.id === productId;
        });

        if (!product) {
            return;
        }

        window.open(
            makeWhatsAppLink(product, 1),
            "_blank",
            "noopener,noreferrer"
        );
    });

    /* ------------------------------------------------------
       7. PUBLIC API
       ------------------------------------------------------ */

    window.ChipstarBakery = {
        products: PRODUCTS,

        business: BUSINESS,

        searchProducts: searchProducts,

        answerQuestion: answerQuestion,

        getProducts: function () {
            return PRODUCTS.map(function (product) {
                return Object.assign({}, product);
            });
        },

        getProduct: getProductByName,

        makeWhatsAppLink: makeWhatsAppLink,

        /* Update catalogue information when confirmed data arrives. */
        updateProduct: function (productId, updates) {
            const product = PRODUCTS.find(function (item) {
                return item.id === productId;
            });

            if (!product || !updates || typeof updates !== "object") {
                return false;
            }

            const allowedFields = [
                "name",
                "category",
                "price",
                "availability",
                "size",
                "description",
                "ingredients",
                "allergens",
                "nutrition"
            ];

            allowedFields.forEach(function (field) {
                if (Object.prototype.hasOwnProperty.call(updates, field)) {
                    product[field] = updates[field];
                }
            });

            return true;
        },

        exportCatalogueJSON: function () {
            return JSON.stringify(PRODUCTS, null, 2);
        }
    };

    /* ------------------------------------------------------
       8. START THE SEARCH AND CHATBOT
       ------------------------------------------------------ */

    function initialize() {
        connectSearch();
        connectChatbot();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize);
    } else {
        initialize();
    }

})();
```
