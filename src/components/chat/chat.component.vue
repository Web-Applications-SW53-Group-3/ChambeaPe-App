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
          {{ selectedUser }}
        </div>
      </div>
      <Button class="negociar-button" @click="iniciarNegociacion">Negociar</Button>
    </div>
    <div v-for="(message, index) in this.messages" :key="index" class="message-container">
      <div :class="message.senderUserId === currentUserId ? 'message-right' : 'message-left'">
        {{ message.text }}
      </div>
    </div>
    <div class="input-container">
      <input v-model="newMessage" @keyup.enter="sendMessage()" placeholder="Escribe un mensaje" class="input-message" />
      <pv-button @click="sendMessage()" class="enviar-button">
        <i class="pi pi-send"></i>
      </pv-button>
    </div>
  </div>
</template>


<script>
import * as signalR from "@microsoft/signalr";
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      connection: null,
      messages: [],
      newMessage: "",
      selectedUser: "3",
      users: [],
      currentUserId: '',
    };
  },
  mounted() {
    const userClaims = JSON.parse(Cookies.get('userClaims') || null);
    this.currentUserId = userClaims.find(claim => claim.type === 'UserId');
    console.log(this.currentUserId.value);
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7209/chatHub")
      .build();

    this.connection.start().catch((err) => console.error(err));

    this.connection.on("ReceiveMessage", (message) => {
      this.messages.push(message);
    });
    console.log(this.message);
  },
  methods: {
    joinChat(user) {
      // Unirse al grupo asociado al usuario seleccionado
      this.connection.invoke("JoinGroup", user.id);

      // Inicializar el historial de mensajes, según tus necesidades
      this.messages = this.loadMessageHistory(user.id);
    },
    leaveChat(user) {
      // Salir del grupo asociado al usuario seleccionado
      this.connection.invoke("LeaveGroup", user.id);

      // Limpiar el historial de mensajes, según tus necesidades
      this.messages = [];
    },
    sendMessage() {
      // Enviar mensaje al grupo asociado al usuario seleccionado
      this.connection.invoke("SendMessage", this.currentUserId.value, this.selectedUser, this.newMessage);

      // Limpiar el campo de nuevo mensaje, según tus necesidades
      this.newMessage = "";
    },
    loadMessageHistory(receiverUserId) {
      // Cargar el historial de mensajes entre el usuario actual y el usuario seleccionado
      // Invocar un método en el backend para obtener el historial
      return this.connection.invoke("GetMessageHistory", receiverUserId);
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
