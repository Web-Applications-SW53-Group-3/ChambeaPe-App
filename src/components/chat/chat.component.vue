<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="user-info">
        <div class="user-avatar">
          <img
            class="circular-avatar"
            src="https://cdn.discordapp.com/attachments/1037343952694685706/1162061124162822184/image.png?ex=653a90c2&is=65281bc2&hm=f79a328d4f5ed52b2addd2b65b9d65b6feb9d374bc51cd67f3469bd6293fcd8c&"
            alt="Avatar"
          />
        </div>
        <div class="user-name">
          <pv-input v-model="selectedUser" placeholder="Nombre de usuario" />
      </div>
      </div>
      <Button class="negociar-button" @click="iniciarNegociacion">Negociar</Button>
    </div>
    <div v-for="message in messages" :key="message.id" class="message-container">
      <div :class="message.user === 'Usuario1' ? 'message-right' : 'message-left'">
        {{ message.text }}
      </div>
    </div>
    <div class="input-container">
      <input v-model="newMessage" @keyup.enter="enviarMensaje" placeholder="Escribe un mensaje" class="input-message" />
      <pv-button @click="enviarMensaje" class="enviar-button">
        <i class="pi pi-send"></i>
      </pv-button>
    </div>
  </div>
</template>

<script>
import * as signalR from "@microsoft/signalr";

export default {
  data() {
    return {
      connection: null,
      messages: [],
      newMessage: "",
      selectedUser: "Usuario2",
    };
  },
  mounted() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7209/chatHub")
      .build();

    this.connection.start().catch((err) => console.error(err));

    this.connection.on("ReceiveMessage", (user, message) => {
      this.messages.push({ user: user, text: message });
    });
  },
  methods: {
    enviarMensaje() {
      this.connection.invoke("SendMessage", this.selectedUser, this.newMessage);
      this.newMessage = "";
    },
  },
};
</script>

<style scoped>
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.chat-header {
  background-color: orange;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-left: 10px;
  font-weight: bold;
}

.circular-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-container {
  width: 600px;
  height: 700px;
  margin: auto;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
}

.message-container {
  display: flex;
  margin: 10px 0;
}

.message-left,
.message-right {
  color: white;
  border-radius: 20px;
  padding: 10px;
  max-width: 70%;
  word-wrap: break-word;
}

.message-left {
  background-color: gray;
  margin-right: auto;
}

.message-right {
  background-color: orange;
  margin-left: auto;
}

.input-container {
  display: flex;
  align-items: center;
}

.select-user {
  margin-right: 10px;
}

.input-message {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.enviar-button {
  background-color: orange;
  color: white;
  border: none;
  padding: 5px 22px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}
</style>
