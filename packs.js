// Static pack downloads - Add your packs here
const STATIC_PACKS = [
    {
        id: 1,
        name: 'Faithful 32x',
        description: 'A faithful recreation of Minecraft textures in 32x resolution with enhanced details',
        tags: ['32x', 'faithful', 'vanilla+', 'survival'],
        resolution: '32x',
        category: 'faithful',
        author: 'Faithful Team',
        downloads: 154320,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/faithful32x.zip'
    },
    {
        id: 2,
        name: 'PvP Optimized 16x',
        description: 'Ultra-optimized 16x textures for competitive PvP with low fire and clear particles',
        tags: ['16x', 'pvp', 'competitive', 'fps', 'low-fire'],
        resolution: '16x',
        category: 'pvp',
        author: 'PvP Legends',
        downloads: 89200,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/pvp16x.zip'
    },
    {
        id: 3,
        name: 'Medieval RPG 64x',
        description: 'Immersive medieval textures perfect for RPG servers and fantasy builds',
        tags: ['64x', 'medieval', 'rpg', 'fantasy', 'building'],
        resolution: '64x',
        category: 'rpg',
        author: 'Medieval Crafters',
        downloads: 45600,
        minecraftVersion: '1.16.5 - 1.21.4',
        url: 'https://example.com/medieval64x.zip'
    },
    {
        id: 4,
        name: 'Crystal PvP 32x',
        description: 'Crystal PvP focused pack with clear end crystals and optimized textures',
        tags: ['32x', 'pvp', 'crystal', 'anarchy', 'crystal-pvp'],
        resolution: '32x',
        category: 'pvp',
        author: 'Crystal King',
        downloads: 67800,
        minecraftVersion: '1.12.2 - 1.21.4',
        url: 'https://example.com/crystalpvp32x.zip'
    },
    {
        id: 5,
        name: 'Default Enhanced 16x',
        description: 'Vanilla Minecraft textures with subtle improvements and better visibility',
        tags: ['16x', 'vanilla', 'enhanced', 'survival', 'beginner-friendly'],
        resolution: '16x',
        category: 'vanilla',
        author: 'Vanilla Plus',
        downloads: 234500,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/default16x.zip'
    },
    {
        id: 6,
        name: 'Realistic HD 128x',
        description: 'Photorealistic textures for high-end PCs with PBR support',
        tags: ['128x', 'realistic', 'hd', 'pbr', 'shaders'],
        resolution: '128x',
        category: 'realistic',
        author: 'Realism Studios',
        downloads: 32100,
        minecraftVersion: '1.16.5 - 1.21.4',
        url: 'https://example.com/realistic128x.zip'
    },
    {
        id: 7,
        name: 'Bedwars Pro 16x',
        description: 'Optimized for Hypixel Bedwars with clear wool and bed textures',
        tags: ['16x', 'pvp', 'bedwars', 'hypixel', 'minigames'],
        resolution: '16x',
        category: 'pvp',
        author: 'Bedwars Champions',
        downloads: 156700,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/bedwars16x.zip'
    },
    {
        id: 8,
        name: 'Skyblock Deluxe 32x',
        description: 'Perfect for Skyblock with custom GUI and clear item textures',
        tags: ['32x', 'skyblock', 'survival', 'gui', 'items'],
        resolution: '32x',
        category: 'survival',
        author: 'Skyblock Masters',
        downloads: 89300,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/skyblock32x.zip'
    },
    {
        id: 9,
        name: 'UHC Champions 16x',
        description: 'UHC focused pack with golden head textures and clean particles',
        tags: ['16x', 'pvp', 'uhc', 'hardcore', 'golden-heads'],
        resolution: '16x',
        category: 'pvp',
        author: 'UHC Pros',
        downloads: 44500,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/uhc16x.zip'
    },
    {
        id: 10,
        name: 'Cartoon Style 64x',
        description: 'Fun cartoon/cel-shaded textures for a unique look',
        tags: ['64x', 'cartoon', 'cel-shaded', 'artistic', 'unique'],
        resolution: '64x',
        category: 'artistic',
        author: 'Cartoon Craft',
        downloads: 28900,
        minecraftVersion: '1.12.2 - 1.21.4',
        url: 'https://example.com/cartoon64x.zip'
    },
    {
        id: 11,
        name: 'FPS Boost 8x',
        description: 'Maximum FPS pack for low-end PCs with ultra-low resolution',
        tags: ['8x', 'fps', 'low-end', 'performance', 'minimal'],
        resolution: '8x',
        category: 'performance',
        author: 'FPS Masters',
        downloads: 198000,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/fps8x.zip'
    },
    {
        id: 12,
        name: 'Sky Overlay Pack',
        description: 'Custom sky textures with beautiful clouds and sun/moon designs',
        tags: ['sky', 'overlay', 'environment', 'aesthetic', '16x'],
        resolution: '16x',
        category: 'environment',
        author: 'Sky Artists',
        downloads: 56700,
        minecraftVersion: '1.8.9 - 1.21.4',
        url: 'https://example.com/skyoverlay.zip'
    }
];

// State
let filteredPacks = [...STATIC_PACKS];
let currentFilter = 'all';

// Display packs
function displayPacks(packs) {
    const grid = document.getElementById('packsGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    grid.innerHTML = '';
    
    if (packs.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        resultsCount.textContent = '';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    resultsCount.textContent = `Showing ${packs.length} pack${packs.length !== 1 ? 's' : ''}`;
    
    packs.forEach(pack => {
        const card = document.createElement('div');
        card.className = 'pack-card';
        card.innerHTML = `
            <div class="pack-header">
                <div class="pack-badges">
                    <span class="pack-resolution">${pack.resolution}</span>
                    <span class="pack-category">${pack.category}</span>
                </div>
                <h3 class="pack-title">${pack.name}</h3>
                <p class="pack-description">${pack.description}</p>
            </div>
            <div class="pack-content">
                <div class="pack-tags">
                    ${pack.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="pack-meta">
                    <span class="pack-author">By: ${pack.author}</span>
                    <span class="pack-version">MC: ${pack.minecraftVersion}</span>
                </div>
                <div class="pack-stats">
                    <span>Downloads: ${formatNumber(pack.downloads)}</span>
                </div>
            </div>
            <div class="pack-actions">
                <button class="btn btn-primary" onclick="downloadPack(${pack.id})">
                    Download
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Download pack
function downloadPack(id) {
    const pack = STATIC_PACKS.find(p => p.id === id);
    if (pack) {
        window.open(pack.url, '_blank');
    }
}

// Search packs
function searchPacks(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) {
        filterPacks(currentFilter);
        return;
    }
    
    filteredPacks = STATIC_PACKS.filter(pack => {
        const matchesSearch = 
            pack.name.toLowerCase().includes(lowerQuery) ||
            pack.description.toLowerCase().includes(lowerQuery) ||
            pack.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            pack.author.toLowerCase().includes(lowerQuery) ||
            pack.category.toLowerCase().includes(lowerQuery);
        
        const matchesFilter = currentFilter === 'all' || 
            pack.tags.includes(currentFilter) ||
            pack.category === currentFilter ||
            pack.resolution === currentFilter;
        
        return matchesSearch && matchesFilter;
    });
    
    displayPacks(filteredPacks);
}

// Filter packs
function filterPacks(filter) {
    currentFilter = filter;
    
    const searchQuery = document.getElementById('searchInput').value;
    
    if (searchQuery) {
        searchPacks(searchQuery);
        return;
    }
    
    if (filter === 'all') {
        filteredPacks = [...STATIC_PACKS];
    } else {
        filteredPacks = STATIC_PACKS.filter(pack => 
            pack.tags.includes(filter) ||
            pack.category === filter ||
            pack.resolution === filter
        );
    }
    
    displayPacks(filteredPacks);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial load
    displayPacks(STATIC_PACKS);
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchInput.addEventListener('input', (e) => {
        searchPacks(e.target.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPacks(e.target.value);
        }
    });
    
    searchBtn.addEventListener('click', () => {
        searchPacks(searchInput.value);
    });
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPacks(btn.dataset.filter);
        });
    });
});
