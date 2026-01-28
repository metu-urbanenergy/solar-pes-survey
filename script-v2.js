// ============================================
// SOLAR-PES Survey Form JavaScript v2.0
// Enhanced Features & Better UX
// ============================================

// Archetype Database
const ARCHETYPE_DB = {
    climate: {
        "İstanbul": { code: "Z3", name: "Ilıman-Nemli" },
        "Ankara": { code: "Z4", name: "Soğuk" },
        "İzmir": { code: "Z3", name: "Ilıman-Nemli" },
        "Antalya": { code: "Z2", name: "Sıcak-Kuru" },
        "Bursa": { code: "Z3", name: "Ilıman-Nemli" },
        "Adana": { code: "Z2", name: "Sıcak-Nemli" },
        "Gaziantep": { code: "Z2", name: "Sıcak-Kuru" },
        "Konya": { code: "Z4", name: "Soğuk" },
        "Samsun": { code: "Z3", name: "Ilıman-Nemli" },
        "Trabzon": { code: "Z3", name: "Ilıman-Nemli" },
        "Erzurum": { code: "Z5", name: "Çok Soğuk" },
        "Van": { code: "Z4", name: "Soğuk" },
        "Diyarbakır": { code: "Z2", name: "Sıcak-Kuru" },
        "Kayseri": { code: "Z4", name: "Soğuk" },
        "Malatya": { code: "Z4", name: "Soğuk" },
        "Diğer": { code: "Z3", name: "Ilıman-Nemli" }
    },
    function: {
        "İlkokul": { code: "PRI", name: "PRIMARY (K-8)" },
        "Ortaokul": { code: "PRI", name: "PRIMARY (K-8)" },
        "Karma": { code: "PRI", name: "PRIMARY (K-8)" },
        "Lise": { code: "SEC", name: "HIGH SCHOOL" },
        "Yurt": { code: "DOR", name: "DORMITORY" }
    },
    morphology: {
        "Tek Blok": { code: "COM", name: "COMPACT" },
        "Doğrusal": { code: "LIN", name: "LINEAR" },
        "Avlu": { code: "CRT", name: "COURTYARD" },
        "Ayrık": { code: "COM", name: "COMPACT" }
    },
    system: {
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
    },
    parameters: {
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
    }
};

// ============================================
// FORM PROGRESS TRACKING
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

    if (!city || !functionType || !morphology || !buildingYear || !insulation || !fuelType || !cooling) {
        return null;
    }

    const climate = ARCHETYPE_DB.climate[city] || ARCHETYPE_DB.climate["Diğer"];
    const func = ARCHETYPE_DB.function[functionType];
    const morph = ARCHETYPE_DB.morphology[morphology];
    const physics = classifyPhysics(buildingYear, insulation);
    const system = ARCHETYPE_DB.system[fuelType]?.[cooling] || ARCHETYPE_DB.system["Doğalgaz"]["Yok"];

    const archetypeCode = `${climate.code}-${func.code}-${morph.code}-${physics.code}-${system.code}`;

    const params = ARCHETYPE_DB.parameters[physics.code];
    const wallU = ((params.wallU[0] + params.wallU[1]) / 2).toFixed(2);
    const windowU = ((params.windowU[0] + params.windowU[1]) / 2).toFixed(2);
    const lighting = ((params.lighting[0] + params.lighting[1]) / 2).toFixed(1);
    const equipment = ((params.equipment[0] + params.equipment[1]) / 2).toFixed(1);

    return {
        code: archetypeCode,
        climate: climate,
        function: func,
        morphology: morph,
        physics: physics,
        system: system,
        parameters: {
            wallU: `${wallU} W/m²K`,
            windowU: `${windowU} W/m²K`,
            lighting: `${lighting} W/m²`,
            equipment: `${equipment} W/m²`
        }
    };
}

// ============================================
// UI UPDATE
// ============================================

function updateArchetypeDisplay(archetype) {
    if (!archetype) {
        document.getElementById('archetypeDisplay').style.display = 'none';
        document.querySelector('.placeholder').style.display = 'flex';
        return;
    }

    document.querySelector('.placeholder').style.display = 'none';
    document.getElementById('archetypeDisplay').style.display = 'block';

    document.getElementById('archetypeCode').textContent = archetype.code;
    document.getElementById('climateDesc').textContent = archetype.climate.name;
    document.getElementById('functionDesc').textContent = archetype.function.name;
    document.getElementById('morphologyDesc').textContent = archetype.morphology.name;
    document.getElementById('physicsDesc').textContent = archetype.physics.name;
    document.getElementById('systemDesc').textContent = archetype.system.name;

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
// GOOGLE SHEETS INTEGRATION
// ============================================

// IMPORTANT: Your Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxFOCVbbYfMNzGgcy5wKQuQUPPaFWSvY5EWYjJ4p8UFGFCxUmmpF0A7nJEJiWV4YpmRBQ/exec';

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
    
    // Collect all form data
    const formData = {
        timestamp: new Date().toISOString(),
        // General
        buildingName: document.getElementById('buildingName').value,
        city: document.getElementById('city').value,
        district: document.getElementById('district').value || '',
        function: document.getElementById('function').value,
        ownership: document.getElementById('ownership').value || '',
        // Physical
        floorArea: document.getElementById('floorArea').value,
        plotArea: document.getElementById('plotArea').value || '',
        numFloors: document.getElementById('numFloors').value,
        floorHeight: document.getElementById('floorHeight').value || '',
        buildingYear: document.getElementById('buildingYear').value,
        renovationYear: document.getElementById('renovationYear').value || '',
        morphology: document.getElementById('morphology').value,
        orientation: document.getElementById('orientation').value || '',
        // Materials
        wallType: document.getElementById('wallType').value || '',
        roofType: document.getElementById('roofType').value || '',
        insulation: document.querySelector('input[name="insulation"]:checked')?.value,
        windowType: document.getElementById('windowType').value || '',
        shadingSystem: document.getElementById('shadingSystem').value || '',
        // HVAC
        heatingSystem: document.getElementById('heatingSystem').value,
        fuelType: document.getElementById('fuelType').value,
        cooling: document.querySelector('input[name="cooling"]:checked')?.value,
        ventilationType: document.getElementById('ventilationType').value || '',
        lightingSystem: document.getElementById('lightingSystem').value || '',
        // Renewable
        solarPV: document.querySelector('input[name="solarPV"]')?.checked ? 'Var' : 'Yok',
        solarThermal: document.querySelector('input[name="solarThermal"]')?.checked ? 'Var' : 'Yok',
        pvCapacity: document.getElementById('pvCapacity').value || '',
        // Operation
        numStudents: document.getElementById('numStudents').value || '',
        numStaff: document.getElementById('numStaff').value || '',
        operatingDays: document.getElementById('operatingDays').value || '',
        operatingHours: document.getElementById('operatingHours').value || '',
        // Contact
        contactName: document.getElementById('contactName').value || '',
        email: document.getElementById('email').value || '',
        phone: document.getElementById('phone').value || '',
        notes: document.getElementById('notes').value || '',
        // Archetype
        archetypeCode: archetype.code,
        climate: archetype.climate.code,
        functionCode: archetype.function.code,
        morphologyCode: archetype.morphology.code,
        physicsCode: archetype.physics.code,
        systemCode: archetype.system.code
    };
    
    const result = await submitToGoogleSheets(formData);
    
    if (result.success) {
        showMessage('✅ Teşekkürler! Verileriniz başarıyla kaydedildi.', 'success');
        
        setTimeout(() => {
            if (confirm('Form başarıyla gönderildi! Yeni bir bina eklemek ister misiniz?')) {
                document.getElementById('buildingForm').reset();
                updateArchetypeDisplay(null);
                updateProgress();
            }
        }, 2000);
    } else {
        showMessage('⚠️ Gönderim sırasında bir sorun oluştu. Lütfen tekrar deneyin.', 'error');
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
    
    // Progress tracking
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
    
    // Real-time archetype calculation
    const watchFields = [
        'city', 'function', 'morphology', 
        'buildingYear', 'fuelType'
    ];
    
    watchFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', () => {
                const archetype = calculateArchetype();
                updateArchetypeDisplay(archetype);
            });
        }
    });
    
    // Radio buttons
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
    
    // PV Capacity toggle
    const pvCheckbox = document.querySelector('input[name="solarPV"]');
    if (pvCheckbox) {
        pvCheckbox.addEventListener('change', function() {
            const pvGroup = document.getElementById('pvCapacityGroup');
            pvGroup.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Initial progress
    updateProgress();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Auto-save to localStorage (optional)
function autoSave() {
    const formData = new FormData(document.getElementById('buildingForm'));
    const data = Object.fromEntries(formData);
    localStorage.setItem('solarpes_draft', JSON.stringify(data));
}

// Load draft (optional)
function loadDraft() {
    const draft = localStorage.getItem('solarpes_draft');
    if (draft && confirm('Kayıtlı bir taslak bulundu. Yüklemek ister misiniz?')) {
        const data = JSON.parse(draft);
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
            if (field) field.value = data[key];
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+S to save draft
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        autoSave();
        alert('Taslak kaydedildi!');
    }
});
