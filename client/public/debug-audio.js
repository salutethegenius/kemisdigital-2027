// Script to help debug audio playback issues
(function() {
  console.log('Audio debug script loaded and executing');
  
  // Function to verify sound files exist and are accessible
  function checkSoundFiles() {
    const sounds = ['click', 'hover', 'success', 'toggle'];
    
    sounds.forEach(sound => {
      const url = `/sounds/${sound}.mp3`;
      
      // Use fetch to check if the file exists
      fetch(url)
        .then(response => {
          if (response.ok) {
            console.log(`✅ Sound file exists: ${url}`);
          } else {
            console.error(`❌ Sound file not found: ${url}`);
          }
        })
        .catch(error => {
          console.error(`❌ Error checking sound file: ${url}`, error);
        });
    });
  }
  
  // Helper to manually test sound on user interaction
  window.playTestSound = (soundType = 'click') => {
    try {
      console.log(`Attempting to play sound: ${soundType}`);
      
      // Create a new audio element
      const audio = new Audio(`/sounds/${soundType}.mp3`);
      
      // Add event listeners for debugging
      audio.addEventListener('canplaythrough', () => {
        console.log(`✅ Sound ${soundType} is ready to play`);
      });
      
      audio.addEventListener('playing', () => {
        console.log(`✅ Sound ${soundType} is playing`);
      });
      
      audio.addEventListener('error', (e) => {
        console.error(`❌ Error loading sound ${soundType}:`, e);
      });
      
      // Set properties
      audio.volume = 0.5;
      
      // Play the sound
      console.log(`⏳ Playing ${soundType} sound...`);
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`✅ ${soundType} sound played successfully`);
          })
          .catch(error => {
            console.error(`❌ ${soundType} sound failed to play:`, error);
            
            // Additional troubleshooting info
            if (error.name === 'NotAllowedError') {
              console.info('💡 Browser blocked autoplay. User interaction is required first.');
            } else if (error.name === 'NotSupportedError') {
              console.info('💡 Audio format may not be supported by this browser.');
            }
          });
      }
    } catch (error) {
      console.error('❌ Error in playTestSound:', error);
    }
  };
  
  // Function to add test interface
  function addTestInterface() {
    console.log('Adding audio test interface');
    
    // Create container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '8px';
    container.style.background = 'rgba(0,0,0,0.8)';
    container.style.padding = '12px';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    
    // Add title
    const title = document.createElement('div');
    title.innerText = 'Sound Debug';
    title.style.color = 'white';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';
    container.appendChild(title);
    
    // Add sound buttons
    const sounds = [
      { label: 'Click', type: 'click' },
      { label: 'Hover', type: 'hover' },
      { label: 'Success', type: 'success' },
      { label: 'Toggle', type: 'toggle' }
    ];
    
    sounds.forEach(sound => {
      const btn = document.createElement('button');
      btn.innerText = `Test ${sound.label}`;
      btn.style.padding = '6px 12px';
      btn.style.background = '#00A0E3';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.borderRadius = '4px';
      btn.style.cursor = 'pointer';
      btn.style.fontSize = '14px';
      
      btn.addEventListener('click', () => {
        window.playTestSound(sound.type);
      });
      
      container.appendChild(btn);
    });
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close';
    closeBtn.style.padding = '6px 12px';
    closeBtn.style.background = '#555';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '4px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginTop = '8px';
    closeBtn.style.fontSize = '14px';
    
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(container);
    });
    
    container.appendChild(closeBtn);
    document.body.appendChild(container);
  }
  
  // Function to initialize once DOM is ready
  function initialize() {
    console.log('Initializing audio debug tools');
    checkSoundFiles();
    
    // Wait a bit to make sure React is loaded
    setTimeout(() => {
      addTestInterface();
    }, 1000);
  }
  
  // Handle different loading states
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM already loaded
    initialize();
  }
})();
