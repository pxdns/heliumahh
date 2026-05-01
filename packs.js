// Real packs from the /packs folder
const PACKS = [
    { name: "§4§lRed§r Cobweb Outline", file: "§4§lRed§r Cobweb Outline_1.12.2.zip", downloads: 1240, added: "2024-01-15" },
    { name: "§5Eagler§fCPVP", file: "§5Eagler§fCPVP.zip", downloads: 3420, added: "2024-02-20" },
    { name: "§5Eagler§fEssentials", file: "§5Eagler§fEssentials.zip", downloads: 4150, added: "2024-02-21" },
    { name: "§6§lPvP Essentials §7v8.2", file: "§6§lPvP Essentials §7v8.2_1.12.2.zip", downloads: 8920, added: "2024-03-10" },
    { name: "§6§lPvP Essentials §7v8.2 (1.21)", file: "§6§lPvP Essentials §7v8.2.zip", downloads: 7340, added: "2024-03-11" },
    { name: "§8§lSmall crosshair", file: "§8§lSmall crosshair_1.12.zip", downloads: 2180, added: "2024-01-28" },
    { name: "§8§lSmall crosshair (1.21)", file: "§8§lSmall crosshair.zip", downloads: 1890, added: "2024-01-29" },
    { name: "§8Small Shield Overlay", file: "§8Small Shield Overlay.zip", downloads: 1560, added: "2024-02-05" },
    { name: "§a§loVanilla Edit §a16x§8", file: "§a§loVanilla_Edit_§a16x§8_1.12.2.zip", downloads: 5670, added: "2024-03-15" },
    { name: "§a§loVanilla Edit §a16x§8 (1.21)", file: "§a§loVanilla_Edit_§a16x§8.zip", downloads: 4920, added: "2024-03-16" },
    { name: "§b§lSharpness §6§l[500K]FINAL", file: "§b§lSharpness §6§l[500K]FINAL_1.12.zip", downloads: 15600, added: "2024-04-01" },
    { name: "§d§lVoltrex's Eagler Mashup Pack", file: "§d§lVoltrex's Eagler Mashup Pack.zip", downloads: 3280, added: "2024-02-18" },
    { name: "§eItzRealMes Overlay", file: "§eItzRealMes Overlay 1.12.zip", downloads: 2940, added: "2024-02-12" },
    { name: "§f§lHealth Indicators §7v2.0.0", file: "§f§lHealth Indicators §7v2.0.0_1.12.2.zip", downloads: 4560, added: "2024-03-05" },
    { name: "§f§lHealth Indicators §7v2.0.0 (1.21)", file: "§f§lHealth Indicators §7v2.0.0.zip", downloads: 3890, added: "2024-03-06" },
    { name: "#3 SMPUtils 1.7", file: "#3 SMPUtils 1.7.zip", downloads: 1820, added: "2024-01-20" },
    { name: "ATG12 Overlay", file: "ATG12 Overlay.zip", downloads: 2340, added: "2024-02-08" },
    { name: "Awerial Private", file: "Awerial Private.zip", downloads: 6780, added: "2024-03-22" },
    { name: "BaseballBeans 100K", file: "BaseballBeans 100K.zip", downloads: 12400, added: "2024-04-05" },
    { name: "Better Shield Sounds 1.1", file: "Better Shield Sounds 1.1.zip", downloads: 1670, added: "2024-01-25" },
    { name: "Black Pack", file: "Black Pack.zip", downloads: 3120, added: "2024-02-15" },
    { name: "clEvantii Pack 234", file: "clEvantii_Pack_234_1.12.2.zip", downloads: 2890, added: "2024-02-10" },
    { name: "Cobweb Outline", file: "Cobweb_Outline.zip", downloads: 1450, added: "2024-01-18" },
    { name: "Combat Overhaul - AikoTap", file: "Combat_Overhaul_-AikoTap_1.12.zip", downloads: 5230, added: "2024-03-12" },
    { name: "Combat Overhaul - AikoTap (1.21)", file: "Combat_Overhaul_-AikoTap.zip", downloads: 4680, added: "2024-03-13" },
    { name: "DangerMario Private", file: "DangerMario Private.zip", downloads: 7890, added: "2024-03-25" },
    { name: "depressed 1.21.11", file: "depressed 1.21.11_1.12.zip", downloads: 3560, added: "2024-02-22" },
    { name: "depressed 1.21.11 (1.21)", file: "depressed 1.21.11.zip", downloads: 3120, added: "2024-02-23" },
    { name: "FerreMC durabilidad overlay", file: "FerreMC_durabilidad_overlay_1.12.2.zip", downloads: 2670, added: "2024-02-09" },
    { name: "Gallery Pack", file: "Gallery Pack.zip", downloads: 4230, added: "2024-03-02" },
    { name: "GG SMP PACK", file: "GG SMP PACK.zip", downloads: 3780, added: "2024-02-28" },
    { name: "Green Femboy", file: "Green Femboy_1.12.2.zip", downloads: 5890, added: "2024-03-18" },
    { name: "Hardcore Hearts v3", file: "Hardcore Hearts - v3.zip", downloads: 2340, added: "2024-02-06" },
    { name: "Harluuuu Default PVP Edit 1.21", file: "Harluuuu Default PVP Edit 1.21.zip", downloads: 6450, added: "2024-03-20" },
    { name: "itzrealme privated", file: "itzrealme privated 1.12.zip", downloads: 4120, added: "2024-03-01" },
    { name: "Lavander by Upwqrd 1.21.5", file: "Lavander by Upwqrd 1.21.5_1.12.2.zip", downloads: 8340, added: "2024-04-10" },
    { name: "lluri's aimbot pack", file: "lluri's aimbot pack 1.12.zip", downloads: 9870, added: "2024-04-08" },
    { name: "Low fire", file: "Low fire.zip", downloads: 3450, added: "2024-02-19" },
    { name: "ManePear 100k Pack", file: "ManePear 100k Pack.zip", downloads: 11200, added: "2024-04-03" },
    { name: "Mugm Pack", file: "Mugm Pack 1.12.zip", downloads: 3890, added: "2024-02-27" },
    { name: "org4nic private", file: "org4nic private (1)_1.12.2.zip", downloads: 7230, added: "2024-03-23" },
    { name: "Ospree14s' Pack", file: "Ospree14s' Pack 1.12.zip", downloads: 5120, added: "2024-03-14" },
    { name: "Puluu Default 2024", file: "Puluu Default 2024 1.12.zip", downloads: 6780, added: "2024-03-21" },
    { name: "Quo's Overlay Pack", file: "Quo's Overlay Pack 1.12.zip", downloads: 4560, added: "2024-03-07" },
    { name: "Shield Blocking", file: "Shield Blocking_1.12.2.zip", downloads: 2890, added: "2024-02-11" },
    { name: "Shield Overhaul", file: "Shield Overhaul.zip", downloads: 3120, added: "2024-02-16" },
    { name: "Side Shield Overlay 1.21", file: "Side Shield Overlay 1.21.zip", downloads: 2450, added: "2024-02-07" },
    { name: "sideshielde", file: "sideshielde.zip", downloads: 1890, added: "2024-01-30" },
    { name: "simba default", file: "simba default - 1.12.zip", downloads: 4670, added: "2024-03-08" },
    { name: "small shield overlay", file: "small_shield_overlay.zip", downloads: 1780, added: "2024-01-27" },
    { name: "Sogar PvP Aqua", file: "Sogar PvP Aqua_1.12.2.zip", downloads: 5340, added: "2024-03-17" },
    { name: "Sox Default", file: "Sox_Default_1.12.2.zip", downloads: 7890, added: "2024-03-26" },
    { name: "Sox Default (1.21)", file: "Sox_Default.zip", downloads: 6920, added: "2024-03-27" },
    { name: "tier 2 sword default", file: "tier 2 sword default.zip", downloads: 2340, added: "2024-02-04" },
    { name: "Tryhard default overlay", file: "Tryhard default overlay 1.12.zip", downloads: 4890, added: "2024-03-09" },
    { name: "Vanilla SMP - Standard v1.9", file: "Vanilla SMP - Standard v1.9 1.12.zip", downloads: 3670, added: "2024-02-25" },
    { name: "Z174 Private r3", file: "Z174_Private_r3_1.12.2.zip", downloads: 8120, added: "2024-04-02" },
    { name: "Zxynns", file: "Zxynns 1.12.zip", downloads: 4230, added: "2024-03-03" },
    { name: "Zxynns Pack V2", file: "Zxynns Pack V2 1.12.zip", downloads: 5670, added: "2024-03-19" }
];

// State
let filteredPacks = [...PACKS];
let currentSort = 'newest';

// Clean pack name (remove Minecraft color codes)
function cleanName(name) {
    return name.replace(/§[0-9a-fk-or]/gi, '');
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

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
    resultsCount.textContent = `${packs.length} pack${packs.length !== 1 ? 's' : ''}`;
    
    packs.forEach((pack, index) => {
        const card = document.createElement('div');
        card.className = 'pack-card';
        
        const displayName = cleanName(pack.name);
        const isLegacy = pack.file.includes('1.12');
        const version = isLegacy ? '1.12.2' : '1.21+';
        
        card.innerHTML = `
            <div class="pack-badges">
                <span class="pack-resolution">${version}</span>
            </div>
            <h3 class="pack-title">${displayName}</h3>
            <div class="pack-stats">${formatNumber(pack.downloads)} downloads</div>
            <div class="pack-actions">
                <a href="packs/${encodeURIComponent(pack.file)}" class="btn btn-primary" download>Download</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search packs
function searchPacks(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) {
        filteredPacks = [...PACKS];
    } else {
        filteredPacks = PACKS.filter(pack => {
            const cleanedName = cleanName(pack.name).toLowerCase();
            return cleanedName.includes(lowerQuery) || pack.file.toLowerCase().includes(lowerQuery);
        });
    }
    
    sortPacks(currentSort);
}

// Sort packs
function sortPacks(sortType) {
    currentSort = sortType;
    
    if (sortType === 'downloads') {
        filteredPacks.sort((a, b) => b.downloads - a.downloads);
    } else {
        // newest
        filteredPacks.sort((a, b) => new Date(b.added) - new Date(a.added));
    }
    
    displayPacks(filteredPacks);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial load
    sortPacks('newest');
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchPacks(e.target.value);
    });
    
    // Sort buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sortPacks(btn.dataset.sort);
        });
    });
});
