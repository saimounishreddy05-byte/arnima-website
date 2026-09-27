/* ==========================================================================
   Arnima - Parent Enterprise Application JavaScript
   Parent Company: ARNIMA
   Sectors: Arnima Agro, Arnima Healthcare, Arnima Beauty, Arnima Homecare, etc.
   Tagline: "Nourish every day, Flourish every way"
   ========================================================================== */

// 1. Official Contact Configuration
const ARNIMA_WHATSAPP_NUMBER = "919908784646"; 
const ARNIMA_EMAIL = "arnima4646@gmail.com";

// 2. Product Database Catalog with Prices & Sector Tags
const PRODUCTS_DATA = [
  // Arnima Agro Sector
  {
    id: "agro-01",
    title: "Bio-Growth Promoter Ultra",
    category: "agro",
    categoryLabel: "Arnima Agro",
    desc: "Liquid plant growth stimulator for root development and crop foliage.",
    pack: "1 Liter Bottle",
    price: 650,
    tag: "Arnima Agro"
  },
  {
    id: "agro-02",
    title: "EcoShield Bio-Insecticide",
    category: "crop-protection",
    categoryLabel: "Arnima Agro",
    desc: "Biological formulation for controlling sucking insects and caterpillars in field crops.",
    pack: "500 ml Pack",
    price: 480,
    tag: "Arnima Agro"
  },
  {
    id: "agro-03",
    title: "GreenCure Broad-Spectrum Fungicide",
    category: "crop-protection",
    categoryLabel: "Arnima Agro",
    desc: "Powder formulation for controlling leaf spot, mildew, and soil fungal pathogens.",
    pack: "250g Powder",
    price: 350,
    tag: "Arnima Agro"
  },
  {
    id: "agro-04",
    title: "AgroClean Selective Herbicide",
    category: "crop-protection",
    categoryLabel: "Arnima Agro",
    desc: "Selective broadleaf herbicide for agricultural weed management.",
    pack: "1 Liter Bottle",
    price: 520,
    tag: "Arnima Agro"
  },
  {
    id: "agro-05",
    title: "Herbal Soil Vitalizer Formula",
    category: "agro",
    categoryLabel: "Arnima Agro",
    desc: "Soil application granules containing organic compost and mineral trace elements.",
    pack: "5 Kg Bag",
    price: 750,
    tag: "Arnima Agro"
  },

  // Arnima Healthcare Sector
  {
    id: "well-01",
    title: "Arnima Herbal Immunity Booster",
    category: "wellness",
    categoryLabel: "Arnima Healthcare",
    desc: "Herbal capsule formulation containing natural botanical extracts.",
    pack: "60 Capsules",
    price: 499,
    tag: "Arnima Healthcare"
  },
  {
    id: "well-02",
    title: "Pure Herbal Energy Drops",
    category: "wellness",
    categoryLabel: "Arnima Healthcare",
    desc: "Concentrated herbal drops for daily health supplementation.",
    pack: "30 ml Drops",
    price: 399,
    tag: "Arnima Healthcare"
  },

  // Arnima Beauty & Homecare Sectors
  {
    id: "home-01",
    title: "EcoFresh Herbal Disinfectant",
    category: "personal-home",
    categoryLabel: "Arnima Homecare",
    desc: "Surface disinfectant liquid containing neem extract and citrus oils.",
    pack: "1 Liter Refill",
    price: 249,
    tag: "Arnima Homecare"
  },
  {
    id: "home-02",
    title: "Botanical Nourishing Face Wash",
    category: "personal-home",
    categoryLabel: "Arnima Beauty",
    desc: "Facial cleanser formulation with aloe vera and neem extracts.",
    pack: "150 ml Tube",
    price: 199,
    tag: "Arnima Beauty"
  },

  // Arnima Foods & Fitness Sector
  {
    id: "food-01",
    title: "Organic Multi-Grain Nutrition Powder",
    category: "food-fitness",
    categoryLabel: "Arnima Foods",
    desc: "Multi-grain organic nutrition powder for daily diet.",
    pack: "500g Jar",
    price: 349,
    tag: "Arnima Foods"
  },
  {
    id: "fitness-01",
    title: "Ergonomic Core Fitness Resistance Band Set",
    category: "food-fitness",
    categoryLabel: "Arnima Fitness",
    desc: "Rubber resistance bands for home physical conditioning.",
    pack: "Set of 5 Bands",
    price: 599,
    tag: "Arnima Fitness"
  },

  // Arnima Publications Sector
  {
    id: "book-01",
    title: "Guide to Modern Organic Farming",
    category: "books",
    categoryLabel: "Arnima Publications",
    desc: "Practical handbook on organic farming practices and crop schedules.",
    pack: "Paperback Book",
    price: 299,
    tag: "Publications"
  }
];

// 3. Top Ticker Text Messages
const TICKER_MESSAGES = [
  "ARNIMA ANNOUNCEMENT: Direct Factory Margins Available Across Arnima Agro & Healthcare Divisions | Contact: +91 99087 84646",
  "FREIGHT SHIPPING: Free Freight Shipping Available on Wholesale Orders Above 50 Units",
  "ARNIMA: Multi-Sector Enterprise — Arnima Agro, Arnima Healthcare, Arnima Beauty & Arnima Homecare"
];

// 4. Application State
let cart = JSON.parse(localStorage.getItem("arnima_cart")) || [];
let currentOfferIndex = 0;
let offerTimer = null;
let tickerIndex = 0;

// 5. DOM Element References
const productGrid = document.getElementById("product-grid");
const categoryTabs = document.getElementById("category-tabs");
const cartTrigger = document.getElementById("cart-trigger");
const cartBadge = document.getElementById("cart-count-badge");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");
const cartBody = document.getElementById("cart-body");
const cartTotalElem = document.getElementById("cart-total-amount");
const sendWhatsappBtn = document.getElementById("send-whatsapp-order");
const buyerTypeSelect = document.getElementById("buyer-type-select");
const dealerForm = document.getElementById("distributor-form");
const cookieBanner = document.getElementById("cookie-banner");
const acceptCookiesBtn = document.getElementById("accept-cookies-btn");

// 6. Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderProducts("all");
  updateCartUI();
  setupEventListeners();
  initOfferSlider();
  initTopTicker();
  initCookieBanner();
});

// 7. Render Product Grid
function renderProducts(filterCategory) {
  if (!productGrid) return;
  productGrid.innerHTML = "";

  const filteredProducts = filterCategory === "all"
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(item => item.category === filterCategory);

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No products found in this category.</p>`;
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <span class="product-img-placeholder-text">${product.categoryLabel}</span>
        <span class="badge badge-primary product-badge-tag">${product.tag}</span>
        <span class="product-price-badge">Rs. ${product.price}</span>
      </div>
      <div class="product-info">
        <span style="font-size: 0.75rem; color: var(--secondary); font-weight: 600;">${product.categoryLabel}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-desc">${product.desc}</p>
        
        <div class="product-meta">
          <span class="product-pack">Pack: ${product.pack}</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="adjustCardQty('${product.id}', -1)" aria-label="Decrease Quantity">-</button>
            <span id="qty-${product.id}" class="qty-val">1</span>
            <button class="qty-btn" onclick="adjustCardQty('${product.id}', 1)" aria-label="Increase Quantity">+</button>
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%; font-size: 0.85rem;" onclick="addToCart('${product.id}')">
          Add to Cart (Rs. ${product.price})
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// 8. Quantity Counter on Cards
window.adjustCardQty = function(productId, delta) {
  const qtyElem = document.getElementById(`qty-${productId}`);
  if (!qtyElem) return;
  let currentQty = parseInt(qtyElem.innerText, 10);
  currentQty = Math.max(1, currentQty + delta);
  qtyElem.innerText = currentQty;
};

// 9. Cart Operations
window.addToCart = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const qtyElem = document.getElementById(`qty-${productId}`);
  const quantity = qtyElem ? parseInt(qtyElem.innerText, 10) : 1;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      pack: product.pack,
      price: product.price,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
};

function saveCart() {
  localStorage.setItem("arnima_cart", JSON.stringify(cart));
}

function updateCartUI() {
  if (!cartBadge) return;
  
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartBadge.innerText = totalCount;
  if (cartTotalElem) {
    cartTotalElem.innerText = `Rs. ${totalAmount.toLocaleString('en-IN')}`;
  }

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty-msg">
        <p style="font-weight: 600;">Your order cart is empty.</p>
        <p style="font-size: 0.85rem; margin-top: 0.3rem;">Browse products in the catalog and click "Add to Cart".</p>
      </div>
    `;
    if (sendWhatsappBtn) {
      sendWhatsappBtn.disabled = true;
      sendWhatsappBtn.style.opacity = "0.5";
    }
  } else {
    if (sendWhatsappBtn) {
      sendWhatsappBtn.disabled = false;
      sendWhatsappBtn.style.opacity = "1";
    }
    
    let html = "";
    cart.forEach((item, idx) => {
      const itemSubtotal = item.price * item.quantity;
      html += `
        <div class="cart-item">
          <div style="flex-grow: 1;">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-meta">Pack: ${item.pack} • Rs. ${item.price} each</div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary); margin-top: 2px;">
              Subtotal: Rs. ${itemSubtotal.toLocaleString('en-IN')}
            </div>
          </div>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartItemQty(${idx}, -1)" aria-label="Decrease quantity">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQty(${idx}, 1)" aria-label="Increase quantity">+</button>
          </div>
          <button style="background:none; border:none; color: #d90429; font-weight: bold; cursor:pointer;" onclick="removeCartItem(${idx})" aria-label="Remove item">&times;</button>
        </div>
      `;
    });
    cartBody.innerHTML = html;
  }
}

window.updateCartItemQty = function(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
};

window.removeCartItem = function(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
  }
};

// 10. Drawer Controls
function openCartDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// 11. WhatsApp Order Generator
function sendOrderToWhatsApp() {
  if (cart.length === 0) return;

  const buyerType = buyerTypeSelect ? buyerTypeSelect.value : "Customer";
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let message = `ARNIMA - NEW ORDER INQUIRY\n`;
  message += `Tagline: "Nourish every day, Flourish every way"\n\n`;
  message += `Customer Type: ${buyerType}\n`;
  message += `-----------------------------------\n`;
  message += `ORDERED ITEMS:\n`;

  cart.forEach((item, i) => {
    const itemSubtotal = item.price * item.quantity;
    message += `${i + 1}. ${item.title} (${item.pack})\n   Quantity: ${item.quantity} x Rs. ${item.price} = Rs. ${itemSubtotal.toLocaleString('en-IN')}\n`;
  });

  message += `-----------------------------------\n`;
  message += `ESTIMATED TOTAL AMOUNT: Rs. ${totalAmount.toLocaleString('en-IN')}\n`;
  message += `-----------------------------------\n`;
  message += `Please confirm order pricing, availability, and dispatch details for phone +91 99087 84646. Thank you.`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${ARNIMA_WHATSAPP_NUMBER}?text=${encodedMsg}`;
  
  window.open(whatsappUrl, "_blank");
}

// 12. Offer Slider Logic
function initOfferSlider() {
  const slides = document.querySelectorAll(".offer-slide");
  const dots = document.querySelectorAll(".slider-dot");
  if (slides.length === 0) return;

  window.goToOfferSlide = function(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    currentOfferIndex = (index + slides.length) % slides.length;
    slides[currentOfferIndex].classList.add("active");
    if (dots[currentOfferIndex]) dots[currentOfferIndex].classList.add("active");
  };

  window.nextOfferSlide = function() {
    goToOfferSlide(currentOfferIndex + 1);
  };

  window.prevOfferSlide = function() {
    goToOfferSlide(currentOfferIndex - 1);
  };

  if (offerTimer) clearInterval(offerTimer);
  offerTimer = setInterval(nextOfferSlide, 5000);
}

// 13. Top Ticker Text Rotator
function initTopTicker() {
  const tickerElem = document.getElementById("top-ticker-content");
  if (!tickerElem) return;

  setInterval(() => {
    tickerIndex = (tickerIndex + 1) % TICKER_MESSAGES.length;
    tickerElem.style.opacity = "0";
    setTimeout(() => {
      tickerElem.innerText = TICKER_MESSAGES[tickerIndex];
      tickerElem.style.opacity = "1";
    }, 200);
  }, 4000);
}

// 14. Cookie Banner Control
function initCookieBanner() {
  const accepted = localStorage.getItem("arnima_cookies_accepted");
  if (accepted === "true" && cookieBanner) {
    cookieBanner.style.display = "none";
  }
  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener("click", () => {
      localStorage.setItem("arnima_cookies_accepted", "true");
      if (cookieBanner) cookieBanner.style.display = "none";
    });
  }
}

// 15. Event Listeners Setup
function setupEventListeners() {
  if (categoryTabs) {
    categoryTabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-btn")) {
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        const category = e.target.getAttribute("data-category");
        renderProducts(category);
      }
    });
  }

  if (cartTrigger) cartTrigger.addEventListener("click", openCartDrawer);
  if (cartClose) cartClose.addEventListener("click", closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);
  if (sendWhatsappBtn) sendWhatsappBtn.addEventListener("click", sendOrderToWhatsApp);

  if (dealerForm) {
    dealerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const consentCheckbox = document.getElementById("dealer-dpdp-consent");
      if (consentCheckbox && !consentCheckbox.checked) {
        alert("Please accept the data processing consent checkbox to submit your inquiry under India's DPDP Act 2023.");
        return;
      }

      const name = document.getElementById("dealer-name").value;
      const business = document.getElementById("dealer-business").value;
      const phone = document.getElementById("dealer-phone").value;
      const location = document.getElementById("dealer-location").value;
      const interest = document.getElementById("dealer-interest").value;

      let msg = `ARNIMA - DISTRIBUTOR INQUIRY\n`;
      msg += `Tagline: "Nourish every day, Flourish every way"\n\n`;
      msg += `Name: ${name}\n`;
      msg += `Business/Agency: ${business}\n`;
      msg += `Phone: ${phone}\n`;
      msg += `Location: ${location}\n`;
      msg += `Interest Area: ${interest}\n\n`;
      msg += `I am interested in becoming an authorized distributor for ARNIMA. I consent to processing under DPDP Act 2023. Please send dealership terms and product catalog.`;

      const whatsappUrl = `https://wa.me/${ARNIMA_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, "_blank");
    });
  }
}
