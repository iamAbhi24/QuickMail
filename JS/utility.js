

// Function to create the draggable popup

function injectWindow(input_context) {
  // Root : Creating Main Container
  //Loading Inital Context
  //console.log("CalledAgain");
  var currentContext = input_context;
  var firstRequest = true;
  const popup = document.createElement("div");
  popup.id = "draggable-window";

  //############ Start : Creating Popup header
  const header = document.createElement("div");
  header.id = "popup-header";

  //Left Logo Icon Creation
  const logo = document.createElement("span");
  logo.id = "logo";
  logo.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 256 256" xml:space="preserve" class=""><g><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#570DE6" d="M255.999-.002C114.839-.002.001 114.841.001 256c0 141.16 114.838 255.998 255.997 255.998C397.158 511.998 512 397.16 512 256 512.001 114.841 397.158-.002 255.999-.002z" opacity="1" data-original="#ffc107" class=""></path><path fill="#ffffff" d="m239.569 366.631 13.991-76.002a12.007 12.007 0 0 0-2.59-9.849 11.971 11.971 0 0 0-9.222-4.316h-90.71l100.003-130.711-6.302 76.809a12 12 0 0 0 3.132 9.118 12.036 12.036 0 0 0 8.83 3.863H358.2zm145.669-155.09H269.721l8.571-104.56a11.979 11.979 0 0 0-7.642-12.18 12.012 12.012 0 0 0-13.85 3.911L117.221 281.161a12.004 12.004 0 0 0-1.222 12.609 12 12 0 0 0 10.75 6.689h100.593l-19.01 103.371a12.009 12.009 0 0 0 6.486 12.93 11.91 11.91 0 0 0 5.312 1.24c3.311 0 6.561-1.368 8.901-3.948l165.108-182.453c3.189-3.519 4-8.59 2.071-12.92a11.994 11.994 0 0 0-10.972-7.138z" opacity="1" data-original="#ffffff"></path></g></g></svg>
            `;

  // Window Title Creation
  const headerText = document.createElement("span");
  headerText.id = "header-text";
  headerText.innerHTML = `QuickMail<span id="version">✅ 1.0.0`;

  // Window Close Button Creation
  const closeButton = document.createElement("span");
  closeButton.id = "close-btn";
  closeButton.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
  closeButton.onclick = function () {
    popup.style.animation = "fadeOut 0.4s ease forwards";
    popup.addEventListener("animationend", () => {
      document.body.removeChild(popup);
    });
  };

  //Assemble child item to header
  header.appendChild(logo);
  header.appendChild(headerText);
  header.appendChild(closeButton);

  //############ End : Creating Popup header

  //############ Start : Creating Popup Body
  const body = document.createElement("div");
  body.id = "popup-body";

  //Adding Context Area
  const addRemoveContextContainer = document.createElement("div");
  addRemoveContextContainer.id = "ContextContainer";
  //Creating a add context button
  const btnAddContext = document.createElement("button");
  btnAddContext.className = "add-context";
  const buttonText = document.createTextNode("+ Add Context");
  btnAddContext.appendChild(buttonText);

  //Creating Context Close Button
  const eraseContextButton = document.createElement("span");
  eraseContextButton.id = "eraseContext";
  eraseContextButton.innerHTML = `
                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `;

  const contextEditor = document.createElement("textarea");
  contextEditor.id = "contextEditorTextArea";
  contextEditor.setAttribute("spellcheck", "false");
  contextEditor.textContent = currentContext;

  //Assemble context child element in context area
  addRemoveContextContainer.appendChild(eraseContextButton);
  addRemoveContextContainer.appendChild(contextEditor);

  //Creating caht communication area
  const chatBody = document.createElement("div");
  chatBody.className = "chat-body";

  //adding bottom popup for additional instructions
  const textarea = document.createElement("textarea");
  textarea.className = "popup-textarea";
  textarea.placeholder = "How whould you like to respond?";
  textarea.value = "Reply to this email";
  textarea.addEventListener("input", function () {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });

  //assemble child element in chatbody
  body.appendChild(btnAddContext);
  body.appendChild(addRemoveContextContainer);
  body.appendChild(chatBody);
  body.appendChild(textarea);

  // Creating footer area
  const footer = document.createElement("div");
  footer.id = "popup-footer";

  //creating model selction functionality
  const llmModel = document.createElement("div");
  llmModel.id = "llm-model";
  llmModel.innerHTML = `
                
                <select class="footer-dropdown" id="llm-model-select" title="Model Used For Getting Response">
                <option value="-1" disabled>Chose LLM Model</option>
                <option value="GEMINI1.5F" selected>⚛️ Gemini 1.5F</option>
                </select>
            `;

  //creating tone selction functionality
  const tone = document.createElement("div");
  tone.id = "writing-tone";
  tone.innerHTML = `
                <select class="footer-dropdown" id="writing-tone-select">
                <option value="-1" disabled>Writing Tone</option>
                <option value="Professional" selected>👨‍💼 Professional</option>
                <option value="Casual">👥 Casual</option>
                <option value="Straightforward">🗣️ Straightforward</option>
                <option value="Confident">👤 Confident</option>
                <option value="Friendly">🫂 Friendly </option>
                </select>
            `;

  //creating response length selction functionality
  const responseLength = document.createElement("div");
  responseLength.id = "response-length";
  responseLength.innerHTML = `
                <select class="footer-dropdown" id="response-length-select">
                <option value="-1" disabled> Length </option>
                <option value="Short">📄 Short </option>
                <option value="Medium" selected>📜 Medium </option>
                <option value="Long">📃 Long </option>
                </select>
            `;

  //Creating send button for final api call
  const submitButton = document.createElement("button");
  submitButton.id = "submit-btn";
  submitButton.innerHTML = `
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Send</span>
            `;

  //Assemble child elements in footer
  footer.appendChild(llmModel);
  footer.appendChild(tone);
  footer.appendChild(responseLength);
  footer.appendChild(submitButton);

  //################ Assemble all section in main popop
  popup.appendChild(header);
  popup.appendChild(body);
  popup.appendChild(footer);

  document.body.appendChild(popup);

  // Make popup draggable
  let isDragging = false;
  let offsetX, offsetY;
  //Drag with header
  header.onmousedown = function (e) {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    document.onmousemove = function (e) {
      if (isDragging) {
        popup.style.left = e.clientX - offsetX + "px";
        popup.style.top = e.clientY - offsetY + "px";
      }
    };
    document.onmouseup = function () {
      isDragging = false;
    };
  };
  //Drag with footer
  footer.onmousedown = function (e) {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    document.onmousemove = function (e) {
      if (isDragging) {
        popup.style.left = e.clientX - offsetX + "px";
        popup.style.top = e.clientY - offsetY + "px";
      }
    };
    document.onmouseup = function () {
      isDragging = false;
    };
  };

  //Toggle Functionality in context area
  btnAddContext.style.display = "none";
  eraseContextButton.addEventListener("click", () => {
    addRemoveContextContainer.style.display = "none";
    btnAddContext.style.display = "block";
    contextEditor.value = "";

    //console.log(currentContext);
  });

  btnAddContext.addEventListener("click", () => {
    addRemoveContextContainer.style.display = "block";
    btnAddContext.style.display = "none";
  });

  //Saving & Restoring the configurations
  //Model
  const selectedModel = document.getElementById("llm-model-select");
  let savedModel = localStorage.getItem("model");
  // console.log(savedModel);
  if (savedModel) {
    selectedModel.value = savedModel;
  }
  llmModel.addEventListener("change", () => {
    savedModel = selectedModel.value;
    localStorage.setItem("model", savedModel);
  });

  //Tone
  const selectedTone = document.getElementById("writing-tone-select");
  let savedTone = localStorage.getItem("tone");
  // console.log(savedTone);
  if (savedTone) {
    selectedTone.value = savedTone;
  }
  tone.addEventListener("change", () => {
    savedTone = selectedTone.value;
    localStorage.setItem("tone", savedTone);
  });

  //Length
  const selectedLength = document.getElementById("response-length-select");
  let savedLength = localStorage.getItem("response_length");
  // console.log(savedTone);
  if (savedLength) {
    selectedLength.value = savedLength;
  }
  responseLength.addEventListener("change", () => {
    savedLength = selectedLength.value;
    localStorage.setItem("response_length", savedLength);
  });

  // Script for API communication

  const messageInput = document.querySelector(".popup-textarea");
  const chatBody1 = document.querySelector(".chat-body");
  const sendMessageButton = document.querySelector("#submit-btn");

  //API Setup
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const userData = {
    message: null,
  };

  const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
  };
  //Handle enter key press for sending message
  //currentContext = contextEditor.value.trim();
  messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key == "Enter" && userMessage) {
      handleOutgoingMessge(e);
    }
  });
  sendMessageButton.addEventListener("click", (e) => handleOutgoingMessge(e));

  const handleOutgoingMessge = (e) => {
    e.preventDefault();

    //Remove context related option once user get first response
    btnAddContext.remove();
    addRemoveContextContainer.remove();
    //## BUG Fix:
    //If its first request then only contexteditor as text as current context
    if (firstRequest) {
      currentContext = contextEditor.value.trim();
      firstRequest = false;
    }

    //Gettting the configuration for request
    const selectedLLMModel = document.getElementById("llm-model-select").value;
    const selectedTone = document.getElementById("writing-tone-select").value;
    const selectedLength = document.getElementById(
      "response-length-select"
    ).value;

    const specialInstruction = messageInput.value.trim();
    //Designing the prompt
    userData.message = `Write a suitable email from the following Context/Email Response
                                    Context
                                    ####
                                    ${currentContext}
                                    ###
                                    Special Instruction
                                    ###
                                    Tone Of the Email Should be ${selectedTone}
                                    Length of the Email should be ${selectedLength}
                                    Response should be a single email without subject.
                                    ${specialInstruction}`;

    //console.log(userData.message)
    messageInput.value = "";
    contextEditor.value = "";
    const messageContent = ` <div class="message-text"></div>`;
    const outgoingMessageDiv = createMessageElement(
      messageContent,
      "user-message"
    );
    outgoingMessageDiv.querySelector(".message-text").textContent =
      userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    setTimeout(() => {
      const messageContent = `   
                    <div class="message-text" id="reponse-loader">
                    <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    </div>
                    </div>`;

      const incomingMessageDiv = createMessageElement(
        messageContent,
        "bot-message",
        "thinking"
      );
      chatBody.appendChild(incomingMessageDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
      generateBotResponse(incomingMessageDiv);
    }, 600);
  };
  const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    //console.log("ContentDIV", incomingMessageDiv);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userData.message }],
          },
        ],
      }),
    };

    try {
      //console.log(currentContext);
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);
      //console.log(data);
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      messageElement.innerText = apiResponseText;
      currentContext = apiResponseText;
    } catch (error) {
      console.log(error);
      messageElement.innerText = error.message;
      messageElement.style.color = "#ff0000";
    } finally {
      //console.log(incomingMessageDiv);
      incomingMessageDiv.classList.remove("thinking");
      const botMessageTextArea =
        incomingMessageDiv.querySelector(".message-text");
      botMessageTextArea.style.background = "#570DE6";

      //add footer menu
      const footerMenuWrapper = document.createElement("div");
      footerMenuWrapper.id = "footerMenuWrapper";

      //Copy Button
      const btnCopy = document.createElement("button");
      btnCopy.classList.add("message-footer-button");
      btnCopy.id = "message-copy";
      btnCopy.innerHTML = `
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="#fff"/>
                    <path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="#fff"/>
                    </svg>
                    `;

      btnCopy.addEventListener("click", (event) => {
        //Copy Message Functionality
        const messageDiv = event.target.closest(".message");
        if (messageDiv) {
          const messageTextDiv = messageDiv.querySelector(".message-text");
          if (messageTextDiv) {
            //vibrating the div
            // messageTextDiv.style.background = "red";
            copyToClipboard(messageTextDiv.innerText);
            messageTextDiv.classList.add("vibrate");
            setTimeout(() => {
              messageTextDiv.classList.remove("vibrate");
            }, 300);

            showToast("Copied to clipboard!");
            const messageText = messageTextDiv.textContent;
            console.log("Message Text:", messageText);
          } else {
            console.error(".message div not found");
          }
        }
      });

      //Another reply Button
      const btnAnotherReply = document.createElement("button");
      btnAnotherReply.classList.add("message-footer-button");
      btnAnotherReply.id = "another-reply";
      btnAnotherReply.innerHTML = `           
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>  
                    `;

      btnAnotherReply.addEventListener("click", () => {
        anotherResponse(incomingMessageDiv);
      });

      //Smart Paste Button
      const btnSmartPaste = document.createElement("button");
      btnSmartPaste.classList.add("message-footer-button");
      btnSmartPaste.id = "smart-paste";
      btnSmartPaste.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#fff" stroke-width="2" d="M10,21 C7.50000053,23.5 5.00000002,23 3,21 C0.999999977,19 0.500000114,16.5 3.00000004,14 C5.49999997,11.5 5.99999998,11 5.99999998,11 L13.0000005,18 C13.0000005,18 12.4999995,18.5 10,21 Z M14.0003207,3 C16.5,0.499999776 19,0.999999776 21.001068,3 C23.002136,5.00000022 23.5,7.49999978 21.001068,10 C18.5021359,12.5000002 18.0007478,13 18.0007478,13 L11,6 C11,6 11.5006414,5.50000022 14.0003207,3 Z M11,9.9999 L8.5,12.4999999 L11,9.9999 Z M14,13 L11.5,15.5 L14,13 Z"/>
                    </svg>
                    `;
      btnSmartPaste.addEventListener("click", (event) => {
        const messageDiv = event.target.closest(".message");
        if (messageDiv) {
          const messageTextDiv = messageDiv.querySelector(".message-text");
          if (messageTextDiv) {
            const emailEditor = document.querySelector(
              ".Am.aiL.Al.editable.LW-avf.tS-tW"
            );
            emailEditor.innerText = messageTextDiv.innerText;
          }
        }
      });

      footerMenuWrapper.appendChild(btnCopy);
      footerMenuWrapper.appendChild(btnAnotherReply);
      footerMenuWrapper.appendChild(btnSmartPaste);
      incomingMessageDiv.appendChild(footerMenuWrapper);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
  };
  const anotherResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    //console.log("ContentDIV", incomingMessageDiv);

    const anotherReponseData = {
      message: null,
    };

    anotherReponseData.message = `
                The the below mail in a another way
                ###
                ${currentContext}
                ###
                Special Instruction
                ###
                Tone Of the Email Should be ${selectedTone}
                Length of the Email should be ${selectedLength}
                Response should be a single email without subject.
                `;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: anotherReponseData.message }],
          },
        ],
      }),
    };

    try {
      //console.log(currentContext);
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);
      //console.log(data);
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      messageElement.innerText = apiResponseText;
    } catch (error) {
      console.log(error);
      messageElement.innerText = error.message;
      messageElement.style.color = "#ff0000";
    }
  };
}

function showToast(message) {
  // Create toast element if not already present
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    // Add icon and message
    const icon = document.createElement("span");
    icon.id = "toast-icon";
    icon.innerHTML = "&#10003;"; // Checkmark icon
    toast.appendChild(icon);
    const text = document.createElement("span");
    text.id = "toast-message";
    toast.appendChild(text);
    document.body.appendChild(toast);
  }
  // Set the message and show the toast
  const textElement = document.getElementById("toast-message");
  textElement.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

function copyToClipboard(textToBeCopied) {
  //const text = document.getElementById('textDiv').textContent;
  navigator.clipboard
    .writeText(textToBeCopied)
    .then(() => {
      //alert('Text copied to clipboard!');
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function contextCall() {
  showToast("Hello World");
}
