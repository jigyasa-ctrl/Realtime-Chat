
const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
    name = prompt('Enter your name :')
}while(!name)

textarea.addEventListener('keyup', (e) => {
if(e.key=='Enter') {
    sendMessage(e.target.value)
}
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
//Append message
    appendMessage(msg, 'outgoing')
    textarea.value =''
    scrollToBottom()

    //Send message to server
    //message is the name we are giving to the event
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')

  let markup =`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `

  mainDiv.innerHTML = markup

  //adding it to messageArea
  messageArea.appendChild(mainDiv)
}

//Receive message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

//to scroll it to bottom automatically
function scrollToBottom() {
messageArea.scrollTop = messageArea.scrollHeight
}
