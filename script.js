  (function(){
      const timeEl = document.getElementById('time');
      const secondsEl = document.getElementById('seconds');
      const ampmEl = document.getElementById('ampm');
      const dateEl = document.getElementById('date');
      const toggleFormatBtn = document.getElementById('toggleFormat');
      const toggleThemeBtn = document.getElementById('toggleTheme');
      const toggleSecondsBtn = document.getElementById('toggleSeconds');
      const copyBtn = document.getElementById('copyTime');
      const watch = document.getElementById('watch');

      let showSeconds = true;
      let is24 = false;
      let isLight = false;

      function pad(n){return n.toString().padStart(2,'0')}

      function update(){
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        let ampm = '';
        if(!is24){
          ampm = h >= 12 ? 'PM' : 'AM';
          h = h % 12 || 12;
        }

        const displayHours = pad(h);
        const displayMinutes = pad(m);
        secondsEl.textContent = pad(s);
        ampmEl.textContent = is24 ? '' : ampm;

      
        timeEl.firstChild && timeEl.removeChild(timeEl.firstChild);
      
        const hmText = document.createTextNode(`${displayHours}:${displayMinutes}`);
        timeEl.insertBefore(hmText, secondsEl);

        dateEl.textContent = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      }

    
      update();
   
      setInterval(update, 250);

      toggleFormatBtn.addEventListener('click', ()=>{
        is24 = !is24;
        toggleFormatBtn.textContent = is24 ? 'Switch to 12h' : 'Switch to 24h';
     
        document.getElementById('ampm').style.display = is24 ? 'none' : 'inline-block';
      });

      toggleThemeBtn.addEventListener('click', ()=>{
        isLight = !isLight;
        if(isLight){
          document.documentElement.classList.add('light');
          toggleThemeBtn.textContent = 'Dark Mode';
        } else {
          document.documentElement.classList.remove('light');
          toggleThemeBtn.textContent = 'Light Mode';
        }
      });

      toggleSecondsBtn.addEventListener('click', ()=>{
        showSeconds = !showSeconds;
        secondsEl.style.display = showSeconds ? 'inline-block' : 'none';
        toggleSecondsBtn.textContent = showSeconds ? 'Hide Seconds' : 'Show Seconds';
      });

      copyBtn.addEventListener('click', async ()=>{
        
        const text = timeEl.textContent.trim() + (ampmEl.textContent ? ' ' + ampmEl.textContent : '');
        try{
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = 'Copied!';
          setTimeout(()=>copyBtn.textContent = 'Copy Time',1000);
        }catch(e){
          copyBtn.textContent = 'Copy Failed';
          setTimeout(()=>copyBtn.textContent = 'Copy Time',1000);
        }
      });

   
      window.addEventListener('keydown', (e)=>{
        if(e.key.toLowerCase() === 't') toggleThemeBtn.click();
        if(e.key.toLowerCase() === 'f') toggleFormatBtn.click();
        if(e.key.toLowerCase() === 's') toggleSecondsBtn.click();
      });

    })();
