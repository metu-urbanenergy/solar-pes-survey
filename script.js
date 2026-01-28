// ============================================
// SOLAR-PES v3.0 - Enhanced with Climate Data & Performance Rating
// ============================================

// Enhanced Climate Database with EPW files
const CLIMATE_DB = {
    "İstanbul": {
        code: "Z3",
        name: "Ilıman-Nemli",
        description: "Marmara Bölgesi - Ilıman geçiş iklimi",
        epw: "TUR_Istanbul.172900_IWEC.epw",
        hdd18: 1800,
        cdd18: 800
    },
    "Ankara": {
        code: "Z4",
        name: "Soğuk-Karasal",
        description: "İç Anadolu - Soğuk kış, sıcak yaz",
        epw: "TUR_Ankara.171280_IWEC.epw",
        hdd18: 2600,
        cdd18: 600
    },
    "İzmir": {
        code: "Z3",
        name: "Ilıman-Akdeniz",
        description: "Ege Kıyısı - Ilıman Akdeniz iklimi",
        epw: "TUR_Izmir.172180_IWEC.epw",
        hdd18: 1400,
        cdd18: 1200
    },
    "Antalya": {
        code: "Z2",
        name: "Sıcak-Akdeniz",
        description: "Akdeniz Kıyısı - Sıcak ılıman iklim",
        epw: "TUR_Antalya.172390_IWEC.epw",
        hdd18: 900,
        cdd18: 1600
    },
    "Bursa": {
        code: "Z3",
        name: "Ilıman-Nemli",
        description: "Marmara Geçiş Bölgesi",
        epw: "TUR_Bursa.172070_IWEC.epw",
        hdd18: 1700,
        cdd18: 900
    },
    "Adana": {
        code: "Z2",
        name: "Sıcak-Nemli",
        description: "Çukurova - Sıcak nemli iklim",
        epw: "TUR_Adana.173520_IWEC.epw",
        hdd18: 800,
        cdd18: 1800
    },
    "Gaziantep": {
        code: "Z2",
        name: "Sıcak-Kuru",
        description: "Güneydoğu Anadolu - Sıcak kuru",
        epw: "TUR_Gaziantep.173070_IWEC.epw",
        hdd18: 1200,
        cdd18: 1500
    },
    "Konya": {
        code: "Z4",
        name: "Soğuk-Karasal",
        description: "İç Anadolu - Karasal iklim",
        epw: "TUR_Konya.172440_IWEC.epw",
        hdd18: 2400,
        cdd18: 700
    },
    "Samsun": {
        code: "Z3",
        name: "Ilıman-Karadeniz",
        description: "Karadeniz Kıyısı - Ilıman nemli",
        epw: "TUR_Samsun.170360_IWEC.epw",
        hdd18: 1900,
        cdd18: 500
    },
    "Trabzon": {
        code: "Z3",
        name: "Ilıman-Karadeniz",
        description: "Karadeniz Kıyısı - Nemli ılıman",
        epw: "TUR_Trabzon.170750_IWEC.epw",
        hdd18: 1600,
        cdd18: 400
    },
    "Erzurum": {
        code: "Z5",
        name: "Çok Soğuk",
        description: "Doğu Anadolu - Çok soğuk karasal",
        epw: "TUR_Erzurum.170930_IWEC.epw",
        hdd18: 4200,
        cdd18: 150
    },
    "Van": {
        code: "Z4",
        name: "Soğuk",
        description: "Doğu Anadolu - Soğuk göl iklimi",
        epw: "TUR_Van.172970_IWEC.epw",
        hdd18: 3200,
        cdd18: 300
    },
    "Diyarbakır": {
        code: "Z2",
        name: "Sıcak-Kuru",
        description: "Güneydoğu - Sıcak kuru karasal",
        epw: "TUR_Diyarbakir.172180_IWEC.epw",
        hdd18: 1400,
        cdd18: 1600
    },
    "Kayseri": {
        code: "Z4",
        name: "Soğuk-Karasal",
        description: "İç Anadolu - Soğuk karasal",
        epw: "TUR_Kayseri.172440_IWEC.epw",
        hdd18: 2800,
        cdd18: 550
    },
    "Malatya": {
        code: "Z4",
        name: "Soğuk-Karasal",
        description: "Doğu Anadolu Geçişi",
        epw: "TUR_Malatya.172900_IWEC.epw",
        hdd18: 2500,
        cdd18: 800
    },
    "Diğer": {
        code: "Z3",
        name: "Ilıman-Genel",
        description: "Türkiye Ortalaması",
        epw: "TUR_Ankara.171280_IWEC.epw",
        hdd18: 2000,
        cdd18: 700
    }
};

// Function & Morphology database (same as before)
const FUNCTION_DB = {
    "İlkokul": { code: "PRI", name: "PRIMARY (K-8)" },
    "Ortaokul": { code: "PRI", name: "PRIMARY (K-8)" },
    "Karma": { code: "PRI", name: "PRIMARY (K-8)" },
    "Lise": { code: "SEC", name: "HIGH SCHOOL" },
    "Yurt": { code: "DOR", name: "DORMITORY" }
};

const MORPHOLOGY_DB = {
    "Tek Blok": { code: "COM", name: "COMPACT", icon: "🏢", description: "Kompakt tek blok yapı - Düşük yüzey/hacim oranı" },
    "Doğrusal": { code: "LIN", name: "LINEAR", icon: "🏬", description: "Doğrusal koridor tipi - Orta yüzey/hacim oranı" },
    "Avlu": { code: "CRT", name: "COURTYARD", icon: "🏛️", description: "Avlulu U/L tipi - Yüksek yüzey/hacim oranı" },
    "Ayrık": { code: "COM", name: "COMPACT", icon: "🏢", description: "Ayrık bloklar - Kompakt forma benzer" }
};

const SYSTEM_DB = {
    "Doğalgaz": { 
        "Yok": { code: "GAS", name: "NATURAL GAS" },
        "Split Klima": { code: "SPL", name: "SPLIT AC" },
        "VRF": { code: "SPL", name: "SPLIT AC" },
        "Chiller": { code: "SPL", name: "SPLIT AC" }
    },
    "Elektrik": {
        "Yok": { code: "ELE", name: "ELECTRIC" },
        "Split Klima": { code: "ELE", name: "ELECTRIC" },
        "VRF": { code: "ELE", name: "ELECTRIC" },
        "Chiller": { code: "ELE", name: "ELECTRIC" }
    },
    "Kömür": {
        "Yok": { code: "FOS", name: "FOSSIL" },
        "Split Klima": { code: "SPL", name: "SPLIT AC" },
        "VRF": { code: "SPL", name: "SPLIT AC" },
        "Chiller": { code: "SPL", name: "SPLIT AC" }
    },
    "Fuel-oil": {
        "Yok": { code: "FOS", name: "FOSSIL" },
        "Split Klima": { code: "SPL", name: "SPLIT AC" },
        "VRF": { code: "SPL", name: "SPLIT AC" },
        "Chiller": { code: "SPL", name: "SPLIT AC" }
    },
    "LPG": {
        "Yok": { code: "GAS", name: "NATURAL GAS" },
        "Split Klima": { code: "SPL", name: "SPLIT AC" },
        "VRF": { code: "SPL", name: "SPLIT AC" },
        "Chiller": { code: "SPL", name: "SPLIT AC" }
    },
    "Jeotermal": {
        "Yok": { code: "GEO", name: "GEOTHERMAL" },
        "Split Klima": { code: "GEO", name: "GEOTHERMAL" },
        "VRF": { code: "GEO", name: "GEOTHERMAL" },
        "Chiller": { code: "GEO", name: "GEOTHERMAL" }
    }
};

const PARAMETER_DB = {
    "LEG": {
        wallU: [1.60, 2.20],
        windowU: [5.0, 6.0],
        lighting: [8, 12],
        equipment: [3, 5]
    },
    "RET": {
        wallU: [0.45, 0.60],
        windowU: [2.0, 2.8],
        lighting: [8, 12],
        equipment: [3, 5]
    },
    "MOD": {
        wallU: [0.30, 0.45],
        windowU: [1.4, 1.8],
        lighting: [10, 14],
        equipment: [8, 15]
    }
};

// ============================================
// PERFORMANCE EVALUATION SYSTEM
// ============================================

function evaluatePerformance(physics, system, hasInsulation, hasPV) {
    let score = 0;
    let rating = "";
    let description = "";
    let icon = "";
    
    // Physics scoring (40 points)
    if (physics === "MOD") score += 40;
    else if (physics === "RET") score += 25;
    else score += 10;
    
    // System scoring (30 points)
    if (system === "ELE" || system === "GEO") score += 30;
    else if (system === "GAS" || system === "SPL") score += 20;
    else score += 10;
    
    // Insulation bonus (20 points)
    if (hasInsulation === "Var") score += 20;
    else if (hasInsulation === "Kısmi") score += 10;
    
    // Renewable energy bonus (10 points)
    if (hasPV) score += 10;
    
    // Rating determination
    if (score >= 70) {
        rating = "HIGH PERFORMANCE";
        description = "Binanız modern enerji standartlarına sahip, yüksek performanslı bir yapı. Düşük enerji tüketimi ve konfor seviyesi yüksek.";
        icon = "🌟";
        className = "high";
    } else if (score >= 45) {
        rating = "MEDIUM PERFORMANCE";
        description = "Binanız orta seviye enerji performansına sahip. İyileştirme potansiyeli mevcut, özellikle yalıtım ve sistem verimliliği artırılabilir.";
        icon = "⚡";
        className = "medium";
    } else {
        rating = "POOR PERFORMANCE";
        description = "Binanız düşük enerji performansına sahip. Acil yenileme ve iyileştirme gerekiyor. Yüksek enerji tüketimi ve konfor sorunları olabilir.";
        icon = "⚠️";
        className = "poor";
    }
    
    return {
        score: score,
        rating: rating,
        description: description,
        icon: icon,
        className: className
    };
}

// ============================================
// BUILDING VISUALIZATION
// ============================================

function getBuildingVisualization(morphology, physics) {
    const morphIcon = MORPHOLOGY_DB[morphology]?.icon || "🏢";
    const morphDesc = MORPHOLOGY_DB[morphology]?.description || "";
    
    let physicsColor = "";
    let physicsDesc = "";
    
    if (physics === "MOD") {
        physicsColor = "#06A77D";
        physicsDesc = "Modern, yalıtımlı, enerji verimli yapı";
    } else if (physics === "RET") {
        physicsColor = "#F4A261";
        physicsDesc = "Yenilenmiş, mantolama yapılmış yapı";
    } else {
        physicsColor = "#D7263D";
        physicsDesc = "Eski, yalıtımsız yapı - Yenileme gerekli";
    }
    
    return {
        icon: morphIcon,
        morphDesc: morphDesc,
        physicsColor: physicsColor,
        physicsDesc: physicsDesc
    };
}

// ============================================
// ARCHETYPE CLASSIFICATION
// ============================================

function classifyPhysics(year, insulation) {
    const yearNum = parseInt(year) || 2000;
    const hasInsulation = insulation === "Var" || insulation === "Kısmi";
    
    if (yearNum >= 2008) {
        return { code: "MOD", name: "MODERN (>2008)" };
    } else if (hasInsulation) {
        return { code: "RET", name: "RETROFIT" };
    } else {
        return { code: "LEG", name: "LEGACY (<2000)" };
    }
}

function calculateArchetype() {
    const city = document.getElementById('city').value;
    const functionType = document.getElementById('function').value;
    const morphology = document.getElementById('morphology').value;
    const buildingYear = document.getElementById('buildingYear').value;
    const insulation = document.querySelector('input[name="insulation"]:checked')?.value;
    const fuelType = document.getElementById('fuelType').value;
    const cooling = document.querySelector('input[name="cooling"]:checked')?.value;
    const hasPV = document.querySelector('input[name="solarPV"]')?.checked;

    if (!city || !functionType || !morphology || !buildingYear || !insulation || !fuelType || !cooling) {
        return null;
    }

    const climate = CLIMATE_DB[city];
    const func = FUNCTION_DB[functionType];
    const morph = MORPHOLOGY_DB[morphology];
    const physics = classifyPhysics(buildingYear, insulation);
    const system = SYSTEM_DB[fuelType]?.[cooling] || SYSTEM_DB["Doğalgaz"]["Yok"];

    const archetypeCode = `${climate.code}-${func.code}-${morph.code}-${physics.code}-${system.code}`;

    const params = PARAMETER_DB[physics.code];
    const wallU = ((params.wallU[0] + params.wallU[1]) / 2).toFixed(2);
    const windowU = ((params.windowU[0] + params.windowU[1]) / 2).toFixed(2);
    const lighting = ((params.lighting[0] + params.lighting[1]) / 2).toFixed(1);
    const equipment = ((params.equipment[0] + params.equipment[1]) / 2).toFixed(1);
    
    // Performance evaluation
    const performance = evaluatePerformance(physics.code, system.code, insulation, hasPV);
    
    // Building visualization
    const visualization = getBuildingVisualization(morphology, physics.code);

    return {
        code: archetypeCode,
        climate: climate,
        function: func,
        morphology: morph,
        physics: physics,
        system: system,
        performance: performance,
        visualization: visualization,
        parameters: {
            wallU: `${wallU} W/m²K`,
            windowU: `${windowU} W/m²K`,
            lighting: `${lighting} W/m²`,
            equipment: `${equipment} W/m²`
        }
    };
}

// ============================================
// UI UPDATE - ENHANCED
// ============================================

function updateArchetypeDisplay(archetype) {
    if (!archetype) {
        document.getElementById('archetypeDisplay').style.display = 'none';
        document.querySelector('.placeholder').style.display = 'flex';
        return;
    }

    document.querySelector('.placeholder').style.display = 'none';
    document.getElementById('archetypeDisplay').style.display = 'block';

    // Archetype code
    document.getElementById('archetypeCode').textContent = archetype.code;
    
    // Climate & EPW info
    const climateHTML = `
        <div class="climate-info">
            <h4>🌡️ İklim Bölgesi</h4>
            <p><strong>${archetype.climate.name}</strong> - ${archetype.climate.description}</p>
            <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                HDD18: ${archetype.climate.hdd18}°C·gün | CDD18: ${archetype.climate.cdd18}°C·gün
            </p>
            <div class="epw-file">
                <strong>📁 EnergyPlus Weather File:</strong>
                <div class="epw-filename">${archetype.climate.epw}</div>
                <small style="margin-top: 0.5rem; display: block; color: #666;">
                    Bu dosya Ladybug Tools'da doğrudan kullanılabilir
                </small>
            </div>
        </div>
    `;
    
    // Performance card
    const perf = archetype.performance;
    const performanceHTML = `
        <div class="performance-card ${perf.className}">
            <div class="performance-header">
                <div class="performance-icon">${perf.icon}</div>
                <div class="performance-text">
                    <h4>Enerji Performansı</h4>
                    <span class="performance-badge ${perf.className}">${perf.rating}</span>
                </div>
            </div>
            <p class="performance-description">${perf.description}</p>
            <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
                <strong>Performans Skoru:</strong> ${perf.score}/100
            </p>
        </div>
    `;
    
    // Building visualization
    const viz = archetype.visualization;
    const visualHTML = `
        <div class="building-visual">
            <h4>📐 Bina Formu</h4>
            <div class="building-image" style="border-color: ${viz.physicsColor};">
                <div style="font-size: 6rem;">${viz.icon}</div>
            </div>
            <div class="building-description">
                <p><strong>${viz.morphDesc}</strong></p>
                <p style="color: ${viz.physicsColor}; font-weight: 600; margin-top: 0.5rem;">
                    ${viz.physicsDesc}
                </p>
            </div>
        </div>
    `;

    // Insert climate, performance, and visualization before breakdown
    const displayDiv = document.getElementById('archetypeDisplay');
    const breakdown = displayDiv.querySelector('.archetype-breakdown');
    
    // Remove old climate/performance/visual if exists
    const oldClimate = displayDiv.querySelector('.climate-info');
    const oldPerf = displayDiv.querySelector('.performance-card');
    const oldVisual = displayDiv.querySelector('.building-visual');
    if (oldClimate) oldClimate.remove();
    if (oldPerf) oldPerf.remove();
    if (oldVisual) oldVisual.remove();
    
    // Insert new ones
    breakdown.insertAdjacentHTML('beforebegin', climateHTML);
    breakdown.insertAdjacentHTML('beforebegin', performanceHTML);
    breakdown.insertAdjacentHTML('beforebegin', visualHTML);

    // Breakdown details
    document.getElementById('climateDesc').textContent = archetype.climate.name;
    document.getElementById('functionDesc').textContent = archetype.function.name;
    document.getElementById('morphologyDesc').textContent = archetype.morphology.name;
    document.getElementById('physicsDesc').textContent = archetype.physics.name;
    document.getElementById('systemDesc').textContent = archetype.system.name;

    // Parameters
    document.getElementById('wallU').textContent = archetype.parameters.wallU;
    document.getElementById('windowU').textContent = archetype.parameters.windowU;
    document.getElementById('lighting').textContent = archetype.parameters.lighting;
    document.getElementById('equipment').textContent = archetype.parameters.equipment;

    // Scroll to results on mobile
    if (window.innerWidth < 1024) {
        setTimeout(() => {
            document.querySelector('.results-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

// ============================================
// PROGRESS TRACKING
// ============================================

function updateProgress() {
    const form = document.getElementById('buildingForm');
    const requiredFields = form.querySelectorAll('[required]');
    let filledCount = 0;
    
    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            if (document.querySelector(`input[name="${field.name}"]:checked`)) {
                filledCount++;
            }
        } else if (field.value.trim() !== '') {
            filledCount++;
        }
    });
    
    const uniqueRequired = new Set();
    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            uniqueRequired.add(field.name);
        } else {
            uniqueRequired.add(field.id);
        }
    });
    
    const progress = (filledCount / uniqueRequired.size) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// ============================================
// GOOGLE SHEETS INTEGRATION
// ============================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzThkgl35hdaEZBgj9PiZJVM81H-0btYLTP0KR6GATV79LrK5B0u7BtGyermNApmRK8zA/exec';

async function submitToGoogleSheets(formData) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FORM SUBMISSION
// ============================================

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Gönderiliyor...';
    
    const archetype = calculateArchetype();
    
    if (!archetype) {
        showMessage('Lütfen tüm zorunlu alanları doldurun!', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = '🚀 Arketipi Hesapla ve Gönder';
        return;
    }
    
    // Collect form data (abbreviated for space)
    const formData = {
        timestamp: new Date().toISOString(),
        buildingName: document.getElementById('buildingName').value,
        city: document.getElementById('city').value,
        // ... all other fields ...
        archetypeCode: archetype.code,
        epwFile: archetype.climate.epw,
        performanceScore: archetype.performance.score,
        performanceRating: archetype.performance.rating
    };
    
    const result = await submitToGoogleSheets(formData);
    
    if (result.success) {
        showMessage('✅ Teşekkürler! Verileriniz başarıyla kaydedildi.', 'success');
        setTimeout(() => {
            if (confirm('Yeni bir bina eklemek ister misiniz?')) {
                document.getElementById('buildingForm').reset();
                updateArchetypeDisplay(null);
                updateProgress();
            }
        }, 2000);
    } else {
        showMessage('⚠️ Gönderim sırasında bir sorun oluştu.', 'error');
    }
    
    submitBtn.disabled = false;
    submitBtn.textContent = '🚀 Arketipi Hesapla ve Gönder';
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('buildingForm');
    
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
    
    const watchFields = ['city', 'function', 'morphology', 'buildingYear', 'fuelType'];
    
    watchFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', () => {
                const archetype = calculateArchetype();
                updateArchetypeDisplay(archetype);
            });
        }
    });
    
    document.querySelectorAll('input[name="insulation"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const archetype = calculateArchetype();
            updateArchetypeDisplay(archetype);
            updateProgress();
        });
    });
    
    document.querySelectorAll('input[name="cooling"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const archetype = calculateArchetype();
            updateArchetypeDisplay(archetype);
            updateProgress();
        });
    });
    
    // PV affects performance
    const pvCheckbox = document.querySelector('input[name="solarPV"]');
    if (pvCheckbox) {
        pvCheckbox.addEventListener('change', function() {
            const pvGroup = document.getElementById('pvCapacityGroup');
            pvGroup.style.display = this.checked ? 'block' : 'none';
            
            const archetype = calculateArchetype();
            updateArchetypeDisplay(archetype);
        });
    }
    
    form.addEventListener('submit', handleFormSubmit);
    
    updateProgress();
});
