<template>
    <br><br><br><br><br>
    <div class="flex align-items-center justify-content-center vh-100">
        <div>
            <div v-if="currentStep === 0" class="flex justify-content-center align-content-center">
                <form  @submit.prevent="nextStep">
                    <div>
                        <label for="title">Título</label>
                        <pv-input v-model="userData.title" type="text" id="title" placeholder="Paseador de Perros" />
                    </div>
                    <div>
                        <label>Área</label>
                        <pv-dropdown v-model="userData.selectedArea" :options="area" optionLabel="label" placeholder="Select an Area"
                            class="w-full md:w-14rem" />
                    </div>
                    <div class="card flex justify-content-center">
                        <pv-textarea v-model="userData.description" autoResize rows="5" cols="30" />
                    </div>
                    <div>
                        <label>Monto</label>
                        <pv-input v-model="userData.amount" type="number" placeholder="0" />
                    </div>
                    <div>
                        <label>Seleccionar archivo</label>
                        <pv-fileupload type="file" accept=".png" @change="getFileOnLoad" />
                    </div>
                    <div>
                        <pv-button type="submit">Siguiente</pv-button>
                    </div>
                </form>
            </div>

            <div v-if="currentStep === 1" class="flex justify-content-center align-content-center">
                <form  @submit.prevent="nextStep">
                    <div>
                        <label for="address">Dirección</label>
                        <pv-input v-model="userData.address" type="text" id="address" placeholder="Av Brasil 123" />
                    </div>
                    <div>
                        <label>Departamento</label>
                        <pv-dropdown v-model="userData.department" :options="department" optionLabel="label" placeholder="Selecciona un departamento"
                            class="w-full md:w-14rem" />
                    </div>
                    <div>
                        <label>Distrito</label>
                        <pv-dropdown v-model="userData.district" :options="district" optionLabel="label" placeholder="Selecciona un distrito"
                            class="w-full md:w-14rem" />
                    </div>
                    <div>
                        <label for="references">Referencias</label>
                        <pv-input v-model="userData.references" type="text" id="references"
                            placeholder="Altura de Plaza Vea Alcazar" />
                    </div>
                    <div>
                        <label>Lugar</label>
                        <pv-dropdown v-model="userData.space" :options="space" optionLabel="label" placeholder="Selecciona un distrito"
                            class="w-full md:w-14rem" />
                    </div>
                    <div>
                        <pv-button type="pv-button" @click="prevStep">Atrás</pv-button>
                        <pv-button type="submit">Siguiente</pv-button>
                    </div>
                </form>
            </div>

            <div v-if="currentStep === 2" class="flex justify-content-center align-content-center">
                <div class="publication">
                    <div class="premium center" >
                        <label for="isPremium">Destacar Premium</label>
                        <pv-checkbox v-model="userData.isPremium" :binary="true" />
                    </div>
                    <div class="settings center" >
                        <label for="isTownChambeador">Aceptar solo chambeadores de mi ciudad</label>
                        <pv-checkbox v-model="userData.isTownChambeador" :binary="true" />
                    </div>
                    <div class="notifications center" >
                        <label for="isMessages">Notificarme sobre nuevos mensajes</label>
                        <pv-checkbox v-model="userData.isMessages" :binary="true" />
                    </div>
                    <div>
                        <pv-button type="pv-button" @click="prevStep">Atrás</pv-button>
                        <pv-button type="pv-button" @click="enviarDatos">Publicar</pv-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
  
<script>
export default {
    data() {
        return {
            currentStep: 0,
            userData: {
                title: '',
                area: '',
                description: '',
                amount: 0,
                address: '',
                department: '',
                district: '',
                references: '',
                space: '',
                isPremium: false,
                isTownChambeador: false,
                isMessages: false,
                selectedArea: null,
            },
            area: [
                { label: 'Limpieza', value: 'Limpieza' },
                { label: 'Gasfiteria', value: 'Gasfiteria' },
                { label: 'Electricidad', value: 'Electricidad' },
                { label: 'Jardinería', value: 'Jardinería' },
            ],
            department: [
                { label: 'Lima', value: 'Lima' },
            ],
            district: [
                { label: 'San Miguel', value: 'San Miguel' },
                { label: 'San Isidro', value: 'San Isidro' },
            ],
            space: [
                { label: 'Casa', value: 'Casa' },
                { label: 'Departamento', value: 'Departamento' },
            ],
        };
    },
    methods: {
        nextStep() {
            if (this.currentStep < 2) {
                this.currentStep++;
            }
        },
        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        },
        getFileOnLoad(event) {
            console.log('Archivo seleccionado:', event.target.files[0]);
        },
        enviarDatos() {
            console.log('Datos a enviar:', this.userData);
        },
    },
};
</script>
  
<style></style>
  