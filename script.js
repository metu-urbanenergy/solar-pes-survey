// ============================================
// SOLAR-PES Survey Form JavaScript
// Real-time Archetype Classification
// ============================================

// Archetype Database (Same as Python system)
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
// ARCHETYPE CLASSIFICATION LOGIC
// ============================================

function classifyPhysics(year, insulation) {
    const yearNum = parseInt(year) || 2000;
    const hasInsulation = insulation === "Var";
    
    if (yearNum >= 2008) {
        return { code: "MOD", name: "MODERN (>2008)" };
    } else if (hasInsulation) {
        return { code: "RET", name: "RETROFIT" };
    } else {
        return { code: "LEG", name: "LEGACY (<2000)" };
    }
}

function calculateArchetype() {
    // Get form values
    const city = document.getElementById('city').value;
    const functionType = document.getElementById('function').value;
    const morphology = document.getElementById('morphology').value;
    const buildingYear = document.getElementById('buildingYear').value;
    const insulation = document.querySelector('input[name="insulation"]:checked')?.value;
    const fuelType = document.getElementById('fuelType').value;
    const cooling = document.querySelector('input[name="cooling"]:checked')?.value;

    // Check if all required fields are filled
    if (!city || !functionType || !morphology || !buildingYear || !insulation || !fuelType || !cooling) {
        return null;
    }

    // Classify
    const climate = ARCHETYPE_DB.climate[city] || ARCHETYPE_DB.climate["Diğer"];
    const func = ARCHETYPE_DB.function[functionType];
    const morph = ARCHETYPE_DB.morphology[morphology];
    const physics = classifyPhysics(buildingYear, insulation);
    const system = ARCHETYPE_DB.system[fuelType]?.[cooling] || ARCHETYPE_DB.system["Doğalgaz"]["Yok"];

    // Generate archetype code
    const archetypeCode = `${climate.code}-${func.code}-${morph.code}-${physics.code}-${system.code}`;

    // Get parameters
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
// UI UPDATE FUNCTIONS
// ============================================

function updateArchetypeDisplay(archetype) {
    if (!archetype) {
        document.getElementById('archetypeDisplay').style.display = 'none';
        document.querySelector('.placeholder').style.display = 'block';
        return;
    }

    // Hide placeholder, show results
    document.querySelector('.placeholder').style.display = 'none';
    document.getElementById('archetypeDisplay').style.display = 'block';

    // Update archetype code
    document.getElementById('archetypeCode').textContent = archetype.code;

    // Update breakdown
    document.getElementById('climateDesc').textContent = archetype.climate.name;
    document.getElementById('functionDesc').textContent = archetype.function.name;
    document.getElementById('morphologyDesc').textContent = archetype.morphology.name;
    document.getElementById('physicsDesc').textContent = archetype.physics.name;
    document.getElementById('systemDesc').textContent = archetype.system.name;

    // Update parameters
    document.getElementById('wallU').textContent = archetype.parameters.wallU;
    document.getElementById('windowU').textContent = archetype.parameters.windowU;
    document.getElementById('lighting').textContent = archetype.parameters.lighting;
    document.getElementById('equipment').textContent = archetype.parameters.equipment;
}

// ============================================
// GOOGLE SHEETS INTEGRATION
// ============================================

// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

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
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Gönderiliyor...';
    
    // Get archetype
    const archetype = calculateArchetype();
    
    if (!archetype) {
        showMessage('Lütfen tüm zorunlu alanları doldurun!', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = '🚀 Arketipi Hesapla ve Gönder';
        return;
    }
    
    // Collect form data
    const formData = {
        timestamp: new Date().toISOString(),
        buildingName: document.getElementById('buildingName').value,
        city: document.getElementById('city').value,
        function: document.getElementById('function').value,
        floorArea: document.getElementById('floorArea').value,
        numFloors: document.getElementById('numFloors').value,
        buildingYear: document.getElementById('buildingYear').value,
        morphology: document.getElementById('morphology').value,
        wallType: document.getElementById('wallType').value,
        insulation: document.querySelector('input[name="insulation"]:checked')?.value,
        windowType: document.getElementById('windowType').value,
        heatingSystem: document.getElementById('heatingSystem').value,
        fuelType: document.getElementById('fuelType').value,
        cooling: document.querySelector('input[name="cooling"]:checked')?.value,
        email: document.getElementById('email').value,
        archetypeCode: archetype.code,
        climate: archetype.climate.code,
        functionCode: archetype.function.code,
        morphologyCode: archetype.morphology.code,
        physicsCode: archetype.physics.code,
        systemCode: archetype.system.code
    };
    
    // Submit to Google Sheets
    const result = await submitToGoogleSheets(formData);
    
    if (result.success) {
        showMessage('✅ Teşekkürler! Verileriniz başarıyla kaydedildi.', 'success');
        
        // Optional: Reset form after 3 seconds
        setTimeout(() => {
            document.getElementById('buildingForm').reset();
            updateArchetypeDisplay(null);
        }, 3000);
    } else {
        showMessage('⚠️ Verileriniz kaydedildi ancak bir sorun oluştu. Lütfen tekrar deneyin.', 'error');
    }
    
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = '🚀 Arketipi Hesapla ve Gönder';
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('buildingForm');
    
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
    
    // Watch radio buttons
    document.querySelectorAll('input[name="insulation"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const archetype = calculateArchetype();
            updateArchetypeDisplay(archetype);
        });
    });
    
    document.querySelectorAll('input[name="cooling"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const archetype = calculateArchetype();
            updateArchetypeDisplay(archetype);
        });
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll to results (mobile)
function scrollToResults() {
    if (window.innerWidth < 1024) {
        document.querySelector('.results-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Print results
function printResults() {
    window.print();
}

// Export to PDF (requires external library)
// This is a placeholder - implement if needed
function exportToPDF() {
    alert('PDF export özelliği yakında eklenecek!');
}
