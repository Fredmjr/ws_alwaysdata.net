const submit_Btn = document.querySelector(".submit_Btn");
const contents_Class = document.querySelector(".contents_Class");
const input_text = document.querySelector(".input_text");

//Clic based socket
const socket = new WebSocket("ws://services-jetstorrent.alwaysdata.net:8301");

socket.addEventListener("open", (message) => {
  console.log("Websocket is running!");
});

socket.addEventListener("message", (event) => {
  const mgsdata = JSON.parse(event.data);
  if (mgsdata.type === "system_online") {
    contents_Class.textContent = mgsdata.msg; //successful
  } else {
    contents_Class.textContent = mgsdata.msg; //error
  }
});

submit_Btn.addEventListener("click", () => {
  const input_text_Value = input_text.value;
  socket.send(input_text_Value);
  input_text.value = ""; //clear
});
