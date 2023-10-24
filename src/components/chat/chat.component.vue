<template>
  <div class="center-container">
    <div class="chat-container">
      <div class="chat-header">
        <div class="user-info">
          <div class="user-avatar">
            <img class="circular-avatar" src="https://cdn.discordapp.com/attachments/1037343952694685706/1162061124162822184/image.png?ex=653a90c2&is=65281bc2&hm=f79a328d4f5ed52b2addd2b65b9d65b6feb9d374bc51cd67f3469bd6293fcd8c&" alt="Avatar" />
          </div>
          <div class="user-name">Steve Castillo</div>
        </div>
        <Button class="negociar-button" @click="iniciarNegociacion">Negociar</Button>
      </div>
      <div class="chat-messages">
        <div v-for="(mensaje, index) in mensajes" :key="index" class="mensaje">
          <p :class="{ 'mensaje-empleado': mensaje.empleado, 'mensaje-trabajador': !mensaje.empleado }">
            {{ mensaje.texto }}
          </p>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="nuevoMensaje" @keyup.enter="enviarMensaje" placeholder="Mensaje" />
        <Button @click="enviarMensaje" class="enviar-button">
          <i class="pi pi-send"></i>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otroUsuario: 'Empleador',
      mensajes: [],
      nuevoMensaje: '',
    };
  },
  methods: {
    iniciarNegociacion() {
    },
    enviarMensaje() {
      if (this.nuevoMensaje) {
        this.mensajes.push({ texto: this.nuevoMensaje, empleado: true });
        this.nuevoMensaje = '';
      }
    },
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.circular-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-container {
  width: 1800px;
  height: 500px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
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

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
  height: 70%;
}

.mensaje {
  margin: 5px 0;
  display: flex;
  justify-content: flex-end;
}

.mensaje-empleado {
  text-align: right;
  background-color: orange;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  max-width: 70%;
  word-wrap: break-word;
}

.chat-input {
  display: flex;
  padding: 10px;
}

input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.enviar-button {
  background-color: orange;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.negociar-button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 30px;
}

.negociar-button:hover {
  background-color: darkorange;
}
</style>