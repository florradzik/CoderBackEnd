const socket = io.connect();

const render = (data) => {
  const html = data.map((element, index) => {
    return (`
      <div>
        <strong>${element.author}</strong>
        <em>${element.text}</em>
      </div>
    `)
  }).join(' ')
  document.getElementById('messages').innerHTML = html
}

socket.on('messages', (data) => {
  console.log(data);
  render(data);
});

const addMessage = (event) => {
  const message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  socket.emit('new-message', message);
  return false
}