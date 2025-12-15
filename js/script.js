// Password comuni - caricata dal file
let PASSWORD_COMUNI = [];

// Carica il file delle password comuni all'avvio
async function carica_password_comuni() {
    try {
	let response = await fetch('assets/100k-most-used-passwords-NCSC.txt');
        let testo = await response.text();
        let righe = testo.split('\n');
        
        for (let riga of righe) {
            let temp = riga.trim().toLowerCase();
            if (temp !== "") {
                PASSWORD_COMUNI.push(temp);
            }
        }
        
        console.log(`✅ Caricate ${PASSWORD_COMUNI.length} password comuni`);
    } catch (errore) {
        console.log("⚠️ File password comuni non trovato, uso lista base");
        PASSWORD_COMUNI = [
            "password", "123456", "123456789", "12345678", "12345", "1234567",
            "password1", "123123", "1234567890", "qwerty", "abc123", "Password1",
            "password123", "111111", "123321", "admin", "letmein", "welcome"
        ];
    }
}

function there_is_an_uppercase(psw) {
    for (let caratteri of psw) {
        if (caratteri === caratteri.toUpperCase() && caratteri !== caratteri.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function there_is_a_lowercase(psw) {
    for (let caratteri of psw) {
        if (caratteri === caratteri.toLowerCase() && caratteri !== caratteri.toUpperCase()) {
            return true;
        }
    }
    return false;
}

function min_carateri(password) {
    
    if (password.length < 8) {
        return false;
    } else {
        return true;
    }
}

function there_is_a_number(psw) {

    for (let caratteri of psw) {
        if ("1234567890".includes(caratteri)) {
            return true;
        }
    }
    
    return false;
}

function there_is_a_special_caracter(psw) {
    
    for (let caratteri of psw) {
        if ('!"£%&/()=?^*°#@|$§{[}]~€&'.includes(caratteri)) {
            return true;
        }
    }
    
    return false;
}

function is_password_common(psw) {

    let password_comuni = PASSWORD_COMUNI;

    if (password_comuni.includes(psw.toLowerCase())) {
        return true;
    }

    return false;
}

function count_special_caracters(psw) {

    let count_special_caracters = 0;

    for (let carattere of psw) {
        if ('!"£%&/()=?^*°#@|$§{[}]~€&'.includes(carattere)) {
            count_special_caracters += 1;
        }
    }
    
    if (count_special_caracters === psw.length) {
        return true;
    } else {
        return false;
    }
}

function count_minuscole(psw) {

    let count_minuscole = 0;

    for (let carattere of psw) {
        if (carattere === carattere.toLowerCase() && carattere !== carattere.toUpperCase()) {
            count_minuscole += 1;
        }
    }
    
    if (count_minuscole === psw.length) {
        return true;
    } else {
        return false;
    }
}

function count_maiuscole(psw) {

    let count_maiuscole = 0;

    for (let carattere of psw) {
        if (carattere === carattere.toUpperCase() && carattere !== carattere.toLowerCase()) {
            count_maiuscole += 1;
        }
    }
    
    if (count_maiuscole === psw.length) {
        return true;
    } else {
        return false;
    }
}

function time_to_crack(psw) {

    let base = 0;

    let is_num_presente = there_is_a_number(psw);
    let is_minuscola_presente = there_is_a_lowercase(psw);
    let is_maiuscola_presente = there_is_an_uppercase(psw);
    let is_speciale_presente = there_is_a_special_caracter(psw);
    

    if (is_num_presente && is_minuscola_presente && is_maiuscola_presente && is_speciale_presente) {
        base = 94;
    }

    else if (is_minuscola_presente && is_maiuscola_presente && is_num_presente) {
        base = 62; // 26 (m) + 26 (M) + 10 (N)
    }
        
    else if (is_minuscola_presente && is_maiuscola_presente) {
        base = 52; // 26 (m) + 26 (M)
    }
        
    else if (is_num_presente) {
        base = 10;
    }
    else if (is_minuscola_presente || is_maiuscola_presente) {
        base = 26;
    }
    else if (is_speciale_presente) {
        base = 32;
    }

    

    let n_combinazini = Math.pow(base, psw.length);

    // Velocità di attacco al secondo (quello che riesce a fare un pc buono oggi secondo gemini )
    let tentativi_al_secondo = 100000000000;


    let secondi = n_combinazini / tentativi_al_secondo;
    
    
    let minuti = secondi / 60;
    let ore = minuti / 60;
    let giorni = ore / 24;
    let anni = giorni / 365;
    let secoli = anni / 100;
    let millenni = anni / 1000;
    let milioni_anni = anni / 1000000;
    let miliardi_anni = anni / 1000000000;

    // Restituiamo il tempo nel formato più appropriato
    if (miliardi_anni >= 1) {
        return `${Math.floor(miliardi_anni)} miliardi di anni`;
    }
    else if (milioni_anni >= 1) {
        return `${Math.floor(milioni_anni)} milioni di anni`;
    }
    else if (millenni >= 1) {
        return `${Math.floor(millenni)} millenni`;
    }
    else if (secoli >= 1) {
        return `${Math.floor(secoli)} secoli`;
    }
    else if (anni >= 1) {
        return `${Math.floor(anni)} anni`;
    }
    else if (giorni >= 1) {
        return `${Math.floor(giorni)} giorni`;
    }
    else if (ore >= 1) {
        return `${Math.floor(ore)} ore`;
    }
    else if (minuti >= 1) {
        return `${Math.floor(minuti)} minuti`;
    }
    else {
        return `${Math.floor(secondi)} secondi`;
    }
}


function get_strength_score(psw) {
    if (!psw) return 0;
    
    let score = 0;
    
    // Requisiti base danno meno punti
    if (min_carateri(psw)) score += 15;
    if (there_is_an_uppercase(psw)) score += 15;
    if (there_is_a_lowercase(psw)) score += 15;
    if (there_is_a_number(psw)) score += 15;
    if (there_is_a_special_caracter(psw)) score += 15;
    
    // Password comune è MOLTO grave
    if (is_password_common(psw)) score -= 70;
    
    // Bonus per lunghezza extra (importante!)
    if (psw.length >= 10) score += 5;
    if (psw.length >= 12) score += 10;
    if (psw.length >= 14) score += 10;
    if (psw.length >= 16) score += 15;
    
    return Math.max(0, Math.min(100, score));
}

function get_strength_text(strength) {
    if (strength >= 80) return 'Molto Forte';
    if (strength >= 60) return 'Forte';
    if (strength >= 40) return 'Media';
    if (strength >= 20) return 'Debole';
    return 'Molto Debole';
}

function get_strength_color_class(strength) {
    if (strength >= 80) return 'strength-very-strong';
    if (strength >= 60) return 'strength-strong';
    if (strength >= 40) return 'strength-medium';
    return 'strength-weak';
}


function main(password) {
    
    let tempo_crack = time_to_crack(password);

    // Check 
    
    let password_is_common = is_password_common(password);
    let output1 = min_carateri(password);
    let output2 = there_is_a_number(password);
    let output3 = there_is_a_special_caracter(password);
    let output4 = there_is_an_uppercase(password);
    let output5 = there_is_a_lowercase(password);


    let errori_riscontrati = [];
    

    if (output4 === false) {
        errori_riscontrati.push("Una lettera maiuscola");
    }
    
    if (output5 === false) {
        errori_riscontrati.push("Una lettera minuscola");
    }

    if (output1 === false) {
        errori_riscontrati.push("Lunghezza minima (8 caratteri)");
    }
    
    if (output2 === false) {
        errori_riscontrati.push("Un numero");
    }
        
    if (output3 === false) {
        errori_riscontrati.push("Un carattere speciale");
    }
        

    // Restituisci tutti i risultati
    return {
        tempo_crack: tempo_crack,
        password_is_common: password_is_common,
        errori_riscontrati: errori_riscontrati,
        is_strong: output1 && output2 && output3 && output4 && output5 && !password_is_common,
        strength: get_strength_score(password)
    };
}


function update_checklist(psw) {
    let checks = [
        { check: min_carateri(psw), text: '8+ caratteri' },
        { check: there_is_an_uppercase(psw), text: 'Maiuscola' },
        { check: there_is_a_lowercase(psw), text: 'Minuscola' },
        { check: there_is_a_number(psw), text: 'Numero' },
        { check: there_is_a_special_caracter(psw), text: 'Simbolo' },
        { check: !is_password_common(psw), text: 'Non comune' },
    ];

    let checklist = document.getElementById('checklist');
    checklist.innerHTML = checks.map(item => `
        <div class="check-item ${item.check ? 'checked' : 'unchecked'}">
            <div class="check-circle ${item.check ? 'checked' : 'unchecked'}">
                ${item.check ? '<span class="check-mark">✓</span>' : ''}
            </div>
            <span class="check-text">${item.text}</span>
        </div>
    `).join('');
}


// Collega all'HTML
document.addEventListener('DOMContentLoaded', async function() {
    
    // Carica prima le password comuni
    await carica_password_comuni();
    
    let passwordInput = document.getElementById('passwordInput');
    let toggleBtn = document.getElementById('togglePassword');
    let eyeIcon = document.getElementById('eyeIcon');
    let resultsDiv = document.getElementById('results');
    let emptyState = document.getElementById('emptyState');
    
    // Toggle visibilità password
    toggleBtn.addEventListener('click', function() {
        let type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        eyeIcon.innerHTML = type === 'password' 
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>';
    });
    
    let timeout;
    passwordInput.addEventListener('input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            let password = passwordInput.value;
            
            if (password === "") {
                resultsDiv.classList.add('hidden');
                emptyState.classList.remove('hidden');
                return;
            }
            
            let risultati = main(password);
            
            // Mostra risultati
            emptyState.classList.add('hidden');
            resultsDiv.classList.remove('hidden');
            
            // Aggiorna strength bar
            let strength = risultati.strength;
            let strengthBar = document.getElementById('strengthBar');
            let strengthText = document.getElementById('strengthText');
            
            strengthBar.style.width = strength + '%';
            strengthBar.className = 'strength-bar ' + get_strength_color_class(strength);
            strengthText.textContent = get_strength_text(strength);
            strengthText.className = 'strength-value ' + (strength >= 60 ? 'text-green' : 'text-red');
            
            // Tempo di crack
            document.getElementById('crackTime').textContent = risultati.tempo_crack;
            
            // Password comune warning
            let commonWarning = document.getElementById('commonWarning');
            if (risultati.password_is_common) {
                commonWarning.classList.remove('hidden');
            } else {
                commonWarning.classList.add('hidden');
            }
            
            // Errori
            let errorsBox = document.getElementById('errorsBox');
            let errorsList = document.getElementById('errorsList');
            
            if (risultati.errori_riscontrati.length > 0) {
                errorsBox.classList.remove('hidden');
                errorsList.innerHTML = risultati.errori_riscontrati.map(e => 
                    `<li class="text-orange-300 flex items-center gap-2">
                        <span class="w-2 h-2 bg-orange-400 rounded-full"></span>${e}
                    </li>`
                ).join('');
            } else {
                errorsBox.classList.add('hidden');
            }
            
            // Password forte
            let strongBox = document.getElementById('strongBox');
            if (risultati.is_strong) {
                strongBox.classList.remove('hidden');
            } else {
                strongBox.classList.add('hidden');
            }
            
            // Aggiorna checklist
            update_checklist(password);
            
        }, 300);
    });
});
