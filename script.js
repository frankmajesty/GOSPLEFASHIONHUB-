// Wait for DOM ready
document.addEventListener("DOMContentLoaded", () => {

    /* Smooth Scroll */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  
    /* Hero Fade-in */
    const hero = document.querySelector(".hero-content");
    if (hero) {
      hero.style.opacity = "0";
      hero.style.transform = "translateY(30px)";
      setTimeout(() => {
        hero.style.transition = "all 1s ease";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
      }, 300);
    }
  
    /* Gallery Lightbox */
    const imgs = document.querySelectorAll(".gallery-grid img");
    if (imgs.length) {
      const lb = document.createElement("div");
      lb.id = "lightbox";
      lb.innerHTML = `
        <button class="prev">&#10094;</button>
        <img alt="Preview">
        <button class="next">&#10095;</button>
      `;
      document.body.appendChild(lb);
      const big = lb.querySelector("img");
      let index = 0;
  
      function show(i) {
        index = (i + imgs.length) % imgs.length;
        big.src = imgs[index].src;
        lb.classList.add("active");
      }
  
      imgs.forEach((img,i)=> img.addEventListener("click",()=>show(i)));
      lb.querySelector(".prev").addEventListener("click", e=>{ e.stopPropagation(); show(index-1); });
      lb.querySelector(".next").addEventListener("click", e=>{ e.stopPropagation(); show(index+1); });
      lb.addEventListener("click", e=>{ if(e.target===lb) lb.classList.remove("active"); });
  
      document.addEventListener("keydown", e=>{
        if(!lb.classList.contains("active")) return;
        if(e.key==="ArrowLeft") show(index-1);
        if(e.key==="ArrowRight") show(index+1);
        if(e.key==="Escape") lb.classList.remove("active");
      });
    }
  
    /* Gallery Filters */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");
    filterBtns.forEach(btn=>{
      btn.addEventListener("click", ()=>{
        filterBtns.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        items.forEach(it=>{
          it.style.display = (cat==="all" || it.dataset.category===cat) ? "block":"none";
        });
      });
    });
  
    /* Contact Form Feedback */
    const form = document.querySelector(".contact-form");
    if(form){
      form.addEventListener("submit", e=>{
        e.preventDefault();
        form.querySelectorAll(".form-msg").forEach(m=>m.remove());
        const msg=document.createElement("p");
        msg.className="form-msg";
        msg.textContent="✅ Thank you! We’ll get back to you soon.";
        msg.style.color="green";
        msg.style.marginTop="10px";
        form.appendChild(msg);
        form.reset();
      });
    }
  
  });
/* ===== Cart System ===== */
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCart = document.getElementById("close-cart");

// Add to cart
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".gallery-item");
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    cart.push({ name, price });
    updateCart();
  });
});

// Open cart
document.querySelector(".cart-icon").addEventListener("click", () => {
  cartSidebar.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

// Update cart
function updateCart() {
  cartCount.textContent = cart.length;
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${index})">✖</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = Total: $${total};
}

// Remove item
window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCart();
};  