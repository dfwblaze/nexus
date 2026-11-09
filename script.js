// Updated script.js with Interactive Preview Modal Logic
const items = [
  {
    id: 1,
    title: "Glassmorphism Card UI Pack",
    category: "ui",
    desc: "A set of modern, frosted glass UI cards built with clean Tailwind CSS utility classes.",
    tag: "Tailwind CSS",
    rating: 4.9,
    downloads: "1.2k",
    details: "Includes 12 pre-built card variations, smooth hover states, fully responsive layouts, and customizable Tailwind theme configs."
  },
  {
    id: 2,
    title: "Canvas 2D Engine Starter",
    category: "tools",
    desc: "Lightweight 2D physics and rendering engine built using vanilla HTML5 Canvas JS.",
    tag: "JavaScript",
    rating: 4.8,
    downloads: "850",
    details: "Features collision detection, particle emissions, frame rate loop optimizer, and simple keyboard/touch listeners."
  },
  {
    id: 3,
    title: "SaaS Landing Page Template",
    category: "templates",
    desc: "High-converting single-page layout designed with dark mode toggle and responsive components.",
    tag: "HTML / CSS",
    rating: 5.0,
    downloads: "2.4k",
    details: "Complete SaaS layout including pricing table, feature grid, testimonial carousel, and sticky navigation bar."
  },
  {
    id: 4,
    title: "Dynamic Filter & Search Script",
    category: "tools",
    desc: "Zero-dependency JS module for instant client-side array search and pill-based filtering.",
    tag: "Vanilla JS",
    rating: 4.7,
    downloads: "610",
    details: "Blazing fast in-memory array processing, dynamic regex string matchers, and simple event callbacks."
  },
  {
    id: 5,
    title: "Neumorphic Button Component",
    category: "ui",
    desc: "Interactive soft-shadow buttons with active tactile click response animations.",
    tag: "CSS3",
    rating: 4.6,
    downloads: "940",
    details: "Pure CSS soft-shadow UI buttons with press down inset effects and accessibility compliant focus states."
  },
  {
    id: 6,
    title: "Portfolio Showcase Layout",
    category: "templates",
    desc: "Minimalist portfolio showcase layout optimized for mobile performance and crisp typography.",
    tag: "Responsive",
    rating: 4.9,
    downloads: "1.8k",
    details: "Clean dark-mode grid gallery layout designed specifically for developers, creators, and visual designers."
  }
];

const cardsGrid = document.getElementById("cardsGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentCategory = "all";
let currentSearch = "";

function renderGrid() {
  const filtered = items.filter(item => {
    const matchesCategory = currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                          item.desc.toLowerCase().includes(currentSearch.toLowerCase()) ||
                          item.tag.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    cardsGrid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <i class="fa-solid fa-folder-open text-4xl text-slate-600 mb-3"></i>
        <p class="text-slate-400 text-sm font-medium">No components found matching your search.</p>
      </div>
    `;
    return;
  }

  cardsGrid.innerHTML = filtered.map(item => `
    <article class="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-brand-500/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase bg-slate-800 text-brand-400 rounded-md border border-slate-700/50">
            ${item.tag}
          </span>
          <div class="flex items-center gap-1 text-xs text-amber-400">
            <i class="fa-solid fa-star text-[11px]"></i>
            <span class="font-bold text-slate-300">${item.rating}</span>
          </div>
        </div>

        <h3 class="text-lg font-bold text-slate-100 group-hover:text-brand-400 transition-colors">
          ${item.title}
        </h3>
        <p class="mt-2 text-xs text-slate-400 leading-relaxed">
          ${item.desc}
        </p>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
        <span class="text-xs text-slate-500 font-medium">
          <i class="fa-solid fa-download text-slate-600 mr-1"></i> ${item.downloads} downloads
        </span>
        <button onclick="openModal(${item.id})" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white transition-all">
          Preview
        </button>
      </div>
    </article>
  `).join('');
}

// Modal Trigger Handler
function openModal(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;

  const modalHtml = `
    <div id="previewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-sm">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>
        <span class="px-2 py-0.5 text-[10px] font-semibold uppercase bg-brand-500/10 text-brand-400 rounded border border-brand-500/20">
          ${item.tag}
        </span>
        <h2 class="text-xl font-bold text-slate-100 mt-2">${item.title}</h2>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">${item.details}</p>
        
        <div class="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-xs text-slate-400 font-medium"><i class="fa-solid fa-star text-amber-400"></i> ${item.rating} Rating</span>
          <button onclick="closeModal()" class="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-all">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeModal() {
  const modal = document.getElementById("previewModal");
  if (modal) modal.remove();
}

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  renderGrid();
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => {
      b.classList.remove("bg-brand-600", "text-white");
      b.classList.add("bg-slate-900", "text-slate-400");
    });

    btn.classList.remove("bg-slate-900", "text-slate-400");
    btn.classList.add("bg-brand-600", "text-white");

    currentCategory = btn.getAttribute("data-category");
    renderGrid();
  });
});

renderGrid();
