(function() {
    // =================== 1. TALHA FIREBASE CONFIG ===================
    const dbURL = "https://talha-admin-panel-default-rtdb.firebaseio.com/users.json";
    const mainLogo = "https://i.ibb.co/HTB34WrY/20260128-162554.png";
    const teleIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png";
    const waIcon = "https://www.freeiconspng.com/thumbs/logo-whatsapp-png/logo-whatsapp-png-pic-0.png";
    
    // =================== 2. 20-DIGIT UNIQUE ID GENERATION ===================
    let myUID = localStorage.getItem('ahmad_script_uid');
    if (!myUID) {
        // Generates a proper 20-digit random numeric ID
        myUID = Array.from({length: 20}, () => Math.floor(Math.random() * 10)).join('');
        localStorage.setItem('ahmad_script_uid', myUID);
    }

    // =================== 3. TALHA DATABASE VERIFICATION ===================
    fetch(dbURL).then(r => r.json()).then(data => {
        let isUnlocked = false;
        if (data) {
            // Hum database ke har user ko check kar rahe hain ke UID match karti hai ya nahi
            Object.values(data).forEach(user => {
                if (user.id === myUID) isUnlocked = true;
            });
        }

        if (isUnlocked) {
            executeMainScript();
        } else {
            showLockUI();
        }
    }).catch(() => {
        // Connection error par script retry karegi
        console.error("Firebase Connection Error!");
        setTimeout(() => location.reload(), 3000);
    });

    // =================== 4. LOCK UI (AHMAD BHAI STYLE) ===================
    function showLockUI() {
        const overlay = document.createElement('div');
        overlay.id = "talha-lock-screen";
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            background: '#000', zIndex: '2147483647', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'
        });

        overlay.innerHTML = `
            <div style="background: white; width: 340px; padding: 30px; border-radius: 25px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.8);">
                <img src="${mainLogo}" style="width: 80px; margin-bottom: 10px; border-radius: 50%;">
                
                <div style="background: #f1f5f9; color: #1e293b; padding: 12px; border-radius: 12px; font-family: monospace; font-size: 14px; border: 2px dashed #2563eb; margin: 15px 0; word-break: break-all; font-weight:bold;">
                    ${myUID}
                </div>

                <div style="color: black; font-size: 28px; font-weight: 900; letter-spacing: 1px; margin-bottom: 5px;">LOCKED</div>
                <div style="color: #64748b; font-size: 12px; margin-bottom: 20px;">ACCESS DENIED BY ADMIN</div>
                
                <hr style="border: 0; height: 1px; background: #e2e8f0; margin-bottom: 20px;">

                <div style="text-align: left; padding: 0 5px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <img src="${teleIcon}" style="width: 24px; margin-right: 12px;">
                        <a href="https://t.me/TALHATRADER3" style="text-decoration:none; color:#0088cc; font-size:15px; font-weight:bold;">@TalhaTrader3</a>
                    </div>

                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <img src="${waIcon}" style="width: 24px; margin-right: 12px;">
                        <a href="https://api.whatsapp.com/send?phone=+923276680486" style="text-decoration:none; color:#25d366; font-size:15px; font-weight:bold;">+923276680486</a>
                    </div>
                </div>

                <button onclick="location.reload()" style="margin-top: 25px; width: 100%; background: #000; color: white; border: none; padding: 15px; border-radius: 15px; font-weight: bold; cursor: pointer; transition: 0.3s;">RETRY ACCESS</button>
                <div style="margin-top: 15px; font-size: 11px; color: #94a3b8;">SYSTEM BY AHMAD BHAI</div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // =================== 5. MAIN SIGNAL SCRIPT ===================
    function executeMainScript() {
        // Pehle purane dialogs clear karo
        var dia = document.querySelectorAll("dialog");
        if (dia.length) dia.forEach(d => d.remove());
        
        var loader = document.createElement("dialog");
        document.body.appendChild(loader);
        loader.innerHTML = `<div style="font-weight:bold; color:#000;">VERIFYING SUCCESS...</div>`;
        loader.style = "border:none; outline:none; margin:auto; padding:1.5rem; background:#fff; border-radius:15px;";
        loader.showModal();
        setTimeout(() => { if(loader.open) loader.close(); }, 1500);

        let selectedSeconds = 60; 

        window.toggleOptions = function() {
            const opt = document.getElementById('timeOptions');
            if(opt) opt.style.display = (opt.style.display === 'block') ? 'none' : 'block';
        };

        window.selectOption = function(label, sec) {
            const labelEl = document.getElementById('timeLabel');
            if(labelEl) labelEl.innerText = label;
            selectedSeconds = sec;
            toggleOptions();
        };

        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');
        const progressBar = document.getElementById('progressBar');
        const previewArea = document.getElementById('preview');
        const timerDisplay = document.getElementById('timerDisplay');

        if(fileInput) {
            fileInput.addEventListener('change', function() {
                if (this.files && this.files.length > 0) {
                    uploadBtn.style.pointerEvents = "none";
                    uploadBtn.style.opacity = "0.5";
                    uploadBtn.innerText = "ANALYZING...";
                    fileInput.disabled = true;
                    previewArea.innerHTML = '';
                    progressBar.style.display = 'block';
                    let progress = 0;
                    const bar = progressBar.querySelector('div');

                    const pInterval = setInterval(() => {
                        progress += 2;
                        bar.style.width = progress + '%';
                        if (progress >= 100) {
                            clearInterval(pInterval);
                            showSignal();
                        }
                    }, 35);
                }
            });
        }

        function showSignal() {
            const isCall = Math.random() > 0.5;
            const signal = isCall ? 'CALL' : 'PUT';
            const scriptUrl = isCall 
                ? "https://ahmad-bhai-next-candle-bot.netlify.app/candle-green.js" 
                : "https://ahmad-bhai-next-candle-bot.netlify.app/candle-red.js";
            const color = isCall ? '#00ff44' : '#ff3a3a';

            progressBar.style.display = 'none';

            previewArea.innerHTML = `
                <div id="candle-box" style="width: 100%; background: #000; padding: 15px; border-radius: 15px; border: 2px solid #34ace1; text-align: center; margin-top:10px;">
                    <iframe id="candle-frame" style="width: 100%; height: 180px; border: none; background:transparent;"></iframe>
                    <div style="font-size: 3rem; font-weight: 900; color: ${color}; letter-spacing: 2px;">${signal}</div>
                </div>`;

            const frame = document.getElementById('candle-frame');
            const frameDoc = frame.contentDocument || frame.contentWindow.document;
            frameDoc.open();
            frameDoc.write(`<html><body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; height:100vh;"><script src="${scriptUrl}"></script></body></html>`);
            frameDoc.close();

            startCountdown(selectedSeconds);
        }

        function startCountdown(seconds) {
            let timeLeft = seconds;
            const countdown = setInterval(() => {
                if(timerDisplay) {
                    timerDisplay.innerHTML = `<div style="color:#fff; font-size:14px; margin-top:10px;">TRADE EXPIRES IN: <span style="color:#ff3a3a; font-size:18px; font-weight:bold;">${timeLeft}s</span></div>`;
                }
                timeLeft--;

                if (timeLeft < 0) {
                    clearInterval(countdown);
                    if(timerDisplay) timerDisplay.innerHTML = `<div style="color:#34ace1; font-weight:bold;">REFRESHING MARKET...</div>`;
                    
                    setTimeout(() => {
                        uploadBtn.style.pointerEvents = "auto";
                        uploadBtn.style.opacity = "1";
                        uploadBtn.innerText = "Choose Image";
                        fileInput.disabled = false;
                        fileInput.value = ""; 
                        if(timerDisplay) timerDisplay.innerHTML = `<div style="color:#00ff44; font-size:12px;">READY FOR NEXT SIGNAL</div>`;
                    }, 2000);
                }
            }, 1000);
        }
    }
})();