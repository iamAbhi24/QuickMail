
// Main function to initialize the detector and icon injection
function initGmailDetector() {

    // Function to check if any Gmail window is active
    function isGmailWindowActive() {
      const selectors = [
        'div[role="dialog"][aria-label*="Compose"]',
        'div[role="dialog"][aria-label*="Reply"]',
        'div[role="dialog"][aria-label*="Forward"]',
        // Also check for popup windows
        'div.aSD[role="dialog"]',
        'div.Am.Al.editable[role="textbox"]'
      ];
  
      return selectors.some(selector => document.querySelector(selector) !== null);
    }
  
    // Function to create and inject the custom icon
    function injectCustomIcon() {
      const btcElements = document.getElementsByClassName('btC');
  
      for (const btcElement of btcElements) {
        // Check if icon already exists
        if (!btcElement.querySelector('.custom-gmail-icon')) {
          // Create icon container
          const iconContainer = document.createElement('div');
          iconContainer.className = 'custom-gmail-icon';
  
  
          // Create icon element
          const icon = document.createElement('span');
          const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#6222fd" fill-rule="evenodd" d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.8 256-256S397.2 0 256 0z" clip-rule="evenodd" opacity="1" data-original="#fec006" class=""></path><path fill="#ffffff" d="M222.7 414c-1.5 0-3-.3-4.3-1-4.3-2.1-6.4-6.8-5.2-11.4L243.8 288H161c-3.8 0-7.1-2.1-8.8-5.5-1.7-3.3-1.3-7.3.9-10.4l128.2-170.2c2.8-3.8 8-5 12.2-2.9 4.3 2.1 6.4 6.8 5.2 11.4L268.2 224H351c3.8 0 7.2 2.1 8.8 5.5 1.6 3.3 1.3 7.3-.9 10.4L230.6 410.1c-1.9 2.5-4.8 3.9-7.9 3.9z" opacity="1" data-original="#ffffff" class=""></path></g></svg>`;
          icon.innerHTML = svgIcon; // You can replace this with any other icon or SVG
          icon.id = "icon";
  
          // Add click handler
          iconContainer.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
  
            //Insert Popup Window
            const windowDetector = document.getElementById("draggable-window");
            if (!windowDetector) {
              const threads = await getEmailThreadDetails();
             // logThreadDetails(threads);
             console.log(threads);
              
              injectWindow(combineThreads(threads));
            }
  
          };
  
          // Append icon to container and container to btC
          iconContainer.appendChild(icon);
          btcElement.insertBefore(iconContainer, btcElement.lastChild);
        }
      }
    }
  
    // Function to observe DOM changes for new email windows
    function observeGmailChanges() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(async (mutation) => {
          if (mutation.addedNodes.length) {
  
            // Send Email Title and Threads to extension window for further processing 
            // const emailTitle = document.querySelector(".hP");
            // if (emailTitle) {
            //   // Send the title to the background script
            //   chrome.runtime.sendMessage({ type: "EMAIL_TITLE", title: emailTitle.textContent });
            //   chrome.runtime.sendMessage({ type: "EMAIL_THREADS", threads: await getEmailThreadDetails() });
            // }
  
            // Check if new btC class elements are added
            if (document.getElementsByClassName('btC').length > 0) {
              injectCustomIcon();
            }
          }
  
          // Log window state changes
          const isActive = isGmailWindowActive();
          console.log('Email window state:', isActive ? 'active' : 'inactive');
        });
      });
  
      // Configure the observer
      const config = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      };
  
      // Start observing the entire document
      observer.observe(document.body, config);
      return observer;
    }
  
    // Initialize icon injection and observation
    function initialize() {
      // Initial check and icon injection
      if (document.getElementsByClassName('btC').length > 0) {
        injectCustomIcon();
      }
  
      // Start observing for changes
      const observer = observeGmailChanges();
  
      // Return cleanup function
      return () => {
        observer.disconnect();
        // Remove all custom icons
        document.querySelectorAll('.custom-gmail-icon').forEach(icon => icon.remove());
      };
    }
  
    // Start the initialization
    return initialize();
  
  
    async function expandCollapsedThreads() {
      // Find all collapsed thread toggles
      const collapsedToggleButtons = document.querySelectorAll('.aZi');
  
      // Click each toggle to expand
      for (const toggle of collapsedToggleButtons) {
        if (toggle && toggle.click) {
          toggle.click();
          // Add a small delay to allow expansion
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
  
      // Wait a bit for all threads to expand
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  
    // Function to extract email thread details
    async function getEmailThreadDetails() {
      // First expand all collapsed threads
      await expandCollapsedThreads();
  
      const threads = [];
  
      // Get all email containers, including previously collapsed ones
      const emailContainers = document.querySelectorAll('div.adn.ads, div.h7');
  
      emailContainers.forEach((container) => {
        try {
          // Extract sender information
          const senderElement = container.querySelector('.gD, .yW span[email]');
          const sender = senderElement ? {
            name: senderElement.getAttribute('name') || senderElement.innerText,
            email: senderElement.getAttribute('email')
          } : 'Unknown Sender';
  
          // Extract timestamp
          const timestampElement = container.querySelector('.g3, .xW span[title]');
          const timestamp = timestampElement ?
            (timestampElement.getAttribute('title') || timestampElement.innerText) :
            'Unknown Time';
  
          // Extract email content
          const contentElement = container.querySelector('.a3s.aiL, .adn');
          const content = contentElement ? contentElement.innerText.trim() : 'No content available';
  
          // Extract subject (if available)
          const subjectElement = container.querySelector('.hP, .ha');
          const subject = subjectElement ? subjectElement.innerText : 'No subject';
  
          threads.push({
            sender,
            timestamp,
            subject,
            content
          });
        } catch (error) {
          console.error('Error extracting email details:', error);
        }
      });
  
      return threads;
    }
  
    // Function to format and log thread details
    function logThreadDetails(threads) {
      console.group('Email Thread Details');
      console.log(`Total emails in thread: ${threads.length}`);
      threads.forEach((thread, index) => {
        console.group(`Email ${index + 1}`);
        console.log('From:', typeof thread.sender === 'object' ?
          `${thread.sender.name} <${thread.sender.email}>` : thread.sender);
        console.log('Time:', thread.timestamp);
        console.log('Subject:', thread.subject);
        console.log('Content:', thread.content);
        console.groupEnd();
      });
      console.groupEnd();
    }
  
    // Function to format and combine thread details
    function combineThreads(threads) {
      let formattedText = "";
      // formattedText += `${'='.repeat(50)}\n\n`;
  
      threads.forEach((thread, index) => {
        // Add separator between messages
        if (index > 0) {
          formattedText += `\n${'-'.repeat(50)}\n\n`;
        }
  
        // Format sender info
        const senderInfo = typeof thread.sender === 'object'
          ? `${thread.sender.name} <${thread.sender.email}>`
          : thread.sender;
  
        // Format message details
        formattedText += `From: ${senderInfo}\n`;
        formattedText += `Date: ${thread.timestamp}\n`;
        formattedText += `Subject: ${thread.subject}\n\n`;
  
        // Format content with proper indentation
        const contentLines = thread.content.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);
  
        formattedText += `${contentLines.join('\n')}\n`;
      });
  
      // Add footer
      // formattedText += `\n${'='.repeat(50)}\n`;
      // formattedText += `End of thread • Extracted at ${new Date().toLocaleString()}`;
  
      // Log the formatted text
     // console.log(formattedText);
  
      // Return the formatted text in case it's needed
      return formattedText;
    }
  
  
  
  }
  
  // Run the detector when the page loads
  if (document.readyState === 'complete') {
    initGmailDetector();
  } else {
    window.addEventListener('load', initGmailDetector);
  }
  
  
  
  // function applyFontToShadowRoots(root) {
  //   const style = document.createElement('style');
  //   style.textContent = `
  // @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  //     * {
  //       font-family: 'Poppins', sans-serif !important;
  //     }
  //   `;
   
  //   root.appendChild(style);
   
  //   // Traverse shadow roots recursively
  //   root.querySelectorAll('*').forEach((el) => {
  //     if (el.shadowRoot) {
  //       applyFontToShadowRoots(el.shadowRoot);
  //     }
  //   });
  // }
   
  // // Apply to the main document
  // applyFontToShadowRoots(document.documentElement);
  
  