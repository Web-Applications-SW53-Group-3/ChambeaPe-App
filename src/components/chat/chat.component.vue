<template>
  <pv-button @click="showList = true">Mostrar lista</pv-button>
  <div v-if="showList" class="user-dropdown">
    
    <pv-dropdown v-model="selectedUser" :options="users" optionLabel="name" placeholder="Select a user to chat" class="w-full md:w-14rem" />
  </div>
  
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
          <pv-input v-model="selectedUser"></pv-input>
        </div>
      </div>
      <pv-button class="negociar-button" @click="joinChat">Negociar</pv-button>
    </div>
    <div class="messages-container" ref="messagesContainer">
    <div v-for="(message, index) in this.messages" :key="index" class="message-container">
        <div :class="message.senderUserId === currentUserId ? 'message-right' : 'message-left'">
          {{ message.text }}
        </div>
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
import JwtService from "@/services/jwt.service";
import WorkerProfileService from "@/services/worker-profile.service";
import EmployerService from "@/services/employer.service";

export default {
  data() {
    return {
      connection: null,
      messages: [],
      newMessage: "",
      selectedUser: "",
      users: [],
      currentUserId: '',
      chatGroupId: '',
      jwtService: '',
      usersToChat:'',
      workerService: '',
      employerService: '',
      showList: false
    };
  },
  mounted() {
    this.jwtService = new JwtService();
    this.workerService = new WorkerProfileService();
    this.employerService = new EmployerService();
    this.currentUserId = this.jwtService.getSub();
    if(this.jwtService.getRole() == 'E'){
      this.getWorkers();
    }
    if(this.jwtService.getRole() == 'W'){
      this.getEmployers();
    }
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://chambeape.azurewebsites.net/chatHub")
      .build();

    this.connection.start().catch((err) => console.error(err));

    this.connection.on("ReceiveMessage", (message) => {
      this.messages.push(message);
      this.$nextTick(() => {
        this.scrollMessagesToBottom();
      });
    });
    
  },
  methods: {
    async joinChat() {
      this.chatGroupId = await this.connection.invoke("JoinGroup", this.currentUserId, this.selectedUser); 
      // this.messages = this.loadMessageHistory(this.currentUserId.value, this.selectedUser);
    },
    leaveChat(user) {
      this.connection.invoke("LeaveGroup", this.currentUserId, this.selectedUser);

      this.messages = [];
    },
    sendMessage() {
      this.connection.invoke("SendMessage", this.currentUserId, this.selectedUser, this.chatGroupId, this.newMessage);

      this.newMessage = "";
    },
    // loadMessageHistory(currentUser, selectedUser) {
    //   return this.connection.invoke("GetMessageHistory", currentUser, selectedUser);
    // },
    scrollMessagesToBottom() {
      const messagesContainer = this.$refs.messagesContainer;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    async getWorkers() {
      await this.workerService.getAllWorker().then((res) => {
        this.usersToChat = res.data;
        for(let i = 0; i < this.usersToChat.length; i++){
          this.users.push(this.usersToChat[i].firstName + ' ' + this.usersToChat[i].lastName);
        }
      });
    },
    async getEmployers() {
      await this.employerService.getAllEmployers().then((res) => {
        this.usersToChat = res.data;
        this.usersToChat.forEach(element => {
          this.users.push(element.name);
        });
      });
      
    }
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
  position: relative;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100% - 120px);
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
  position: absolute;
  bottom: 0;
  width: 97%;
  background-color: white;
  padding: 10px;
  border-top: 1px solid #ccc;
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

.user-dropdown{
  text-align: center;
}
</style>
