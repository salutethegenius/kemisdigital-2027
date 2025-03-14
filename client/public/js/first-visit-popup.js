// First Visit Popup for KemisDigital
(function() {
  // Check if visitor has seen the popup before
  function hasVisitedBefore() {
    return localStorage.getItem('kemisDigital_firstVisit') === 'true';
  }

  // Mark as visited
  function markAsVisited() {
    localStorage.setItem('kemisDigital_firstVisit', 'true');
  }

  // Create popup HTML
  function createPopup() {
    const popupElement = document.createElement('div');
    popupElement.id = 'first-visit-popup';
    popupElement.innerHTML = `
      <div class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4" id="popup-backdrop">
        <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full relative transform transition-all">
          <button 
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            id="popup-close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div class="flex flex-col items-center text-center">
            <img 
              src="/images/logo.png"
              alt="KemisDigital Logo"
              class="w-24 h-auto mb-4"
            />
            <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome to KemisDigital!</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Where Bahamian-driven innovation meets your digital needs. 
              We're passionate about delivering top-tier digital services with 
              island spirit.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Explore our services for NGOs, businesses, and tourism companies.
            </p>
            
            <div class="flex gap-3">
              <button
                id="popup-explore"
                class="bg-[#00A0E3] hover:bg-[#00A0E3]/90 text-white px-4 py-2 rounded-md"
              >
                Explore Now
              </button>
              <button
                id="popup-later"
                class="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-md"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(popupElement);
    
    // Add animation class after a small delay (for entrance effect)
    setTimeout(() => {
      const popupContent = popupElement.querySelector('.transform');
      if (popupContent) {
        popupContent.classList.add('scale-100');
        popupContent.classList.remove('scale-90');
      }
    }, 10);
    
    // Add event listeners
    document.getElementById('popup-close').addEventListener('click', closePopup);
    document.getElementById('popup-explore').addEventListener('click', closePopup);
    document.getElementById('popup-later').addEventListener('click', closePopup);
    document.getElementById('popup-backdrop').addEventListener('click', function(e) {
      if (e.target === this) closePopup();
    });
  }
  
  // Close and remove popup
  function closePopup() {
    const popup = document.getElementById('first-visit-popup');
    if (popup) {
      // Add exit animation
      const popupContent = popup.querySelector('.transform');
      if (popupContent) {
        popupContent.classList.add('scale-90', 'opacity-0');
        popupContent.classList.remove('scale-100');
      }
      
      // Remove after animation completes
      setTimeout(() => {
        popup.classList.add('opacity-0');
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 300);
      }, 200);
    }
    markAsVisited();
  }
  
  // Show popup with delay when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (!hasVisitedBefore()) {
      // Show popup with a slight delay for better UX
      setTimeout(createPopup, 1500);
    }
  });
})();
