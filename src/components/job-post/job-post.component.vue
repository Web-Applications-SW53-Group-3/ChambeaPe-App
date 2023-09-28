<template>
    <div class="job-content flex align-items-center justify-content-center vh-100">
        <div>
            <div v-if="currentStep === 0" class="flex justify-content-center align-content-center">
                <form @submit.prevent="nextStep" class="form-1">
                    <div>
                        <label for="title">Título</label>
                        <pv-input v-model="userData.title" type="text" id="title" placeholder="Paseador de Perros" />
                    </div>
                    <div>
                        <label>Área</label>
                        <div>
                            <pv-dropdown v-model="userData.selectedArea" :options="area" optionLabel="label"
                                placeholder="Select an Area" />
                        </div>
                    </div>
                    <div class="card flex justify-content-center">
                        <label>Descripción</label>
                        <pv-textarea v-model="userData.description" autoResize />
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
                        <pv-button type="submit" class="flex align-self-center">Siguiente</pv-button>
                    </div>
                </form>
            </div>

            <div v-if="currentStep === 1" class="flex justify-content-center align-content-center">
                <form @submit.prevent="nextStep" class="form-2">
                    <div>
                        <label for="address">Dirección</label>
                        <pv-input v-model="userData.address" type="text" id="address" placeholder="Av Brasil 123" />
                    </div>
                    <div>
                        <label>Departamento</label>
                        <div>
                            <pv-dropdown v-model="userData.department" :options="department" optionLabel="label"
                                placeholder="Selecciona un departamento" />
                        </div>
                    </div>
                    <div>
                        <label>Distrito</label>
                        <div>
                            <pv-dropdown v-model="userData.district" :options="district" optionLabel="label"
                                placeholder="Selecciona un distrito" />
                        </div>
                    </div>
                    <div>
                        <label for="references">Referencias</label>
                        <pv-input v-model="userData.references" type="text" id="references"
                            placeholder="Altura de Plaza Vea Alcazar" />
                    </div>
                    <div>
                        <label>Lugar</label>
                        <div>
                            <pv-dropdown v-model="userData.space" :options="space" optionLabel="label"
                                placeholder="Selecciona un distrito" />
                        </div>
                    </div>
                    <div class="buttons">
                        <pv-button type="pv-button" @click="prevStep">Atrás</pv-button>
                        <pv-button type="submit">Siguiente</pv-button>
                    </div>
                </form>
            </div>

            <div v-if="currentStep === 2" class="flex justify-content-center align-content-center">
                <div class="publication">
                    <div class="premium center">
                        <label for="isPremium">Destacar Premium</label>
                        <pv-checkbox v-model="userData.isPremium" :binary="true" />
                    </div>
                    <div class="settings center">
                        <label for="isTownChambeador">Aceptar solo chambeadores de mi ciudad</label>
                        <pv-checkbox v-model="userData.isTownChambeador" :binary="true" />
                    </div>
                    <div class="notifications center">
                        <label for="isMessages">Notificarme sobre nuevos mensajes</label>
                        <pv-checkbox v-model="userData.isMessages" :binary="true" />
                    </div>
                    <div class="buttons">
                        <pv-button type="pv-button" @click="prevStep">Atrás</pv-button>
                        <pv-button type="pv-button" @click="enviarDatos">Publicar</pv-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import EmployerPostService from "@/services/employer-post.service";
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
                selectedArea: '',
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
        async enviarDatos() {
            let jobPost = {
                id: 0,
                postTitle: this.userData.title,
                postDescription: this.userData.description,
                postSubtitle: this.userData.selectedArea,
                postImgUrl: 'https://humanidades.com/wp-content/uploads/2017/10/trabajo-1-e1571886459117.jpg',
                workers: [],
            };
            await new EmployerPostService().create(jobPost);
            this.$router.push('/posts');
        },
    },
};
</script>
  
<style lang="scss">
.job-content {
    min-height: calc(100vh - 12.5rem);
    width: 70%;
    margin: 0 auto;

    .form-1 {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            label {
                display: block;
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }

            .p-inputtext {
                width: 25rem;

                @media (max-width: 768px) {
                    width: 15rem;
                }

            }

            &:nth-child(2) {
                div {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;

                }

                .p-dropdown {
                    width: 25rem;

                    @media (max-width: 768px) {
                        width: 15rem;
                    }
                }

            }

            .p-fileupload-buttonbar {

                @media (max-width: 768px) {
                    width: 15rem;
                }

            }
        }
    }

    .form-2 {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            label {
                display: block;
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }

            .p-inputtext {
                width: 25rem;

                @media (max-width: 768px) {
                    width: 15rem;
                }

            }

            &:nth-child(2) {
                div {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;

                }

                .p-dropdown {
                    width: 25rem;

                    @media (max-width: 768px) {
                        width: 15rem;
                    }
                }

            }

            .p-fileupload-buttonbar {

                @media (max-width: 768px) {
                    width: 15rem;
                }

            }
        }

        .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 2rem;

            .p-button {
                width: 10rem;
                justify-content: center;

                @media (max-width: 768px) {
                    width: 6.5rem;
                }
            }
        }
    }

    .publication {
        height: calc(100vh - 10rem);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        .center {
            width: 25rem;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            gap: 1.5rem 3rem;

            label {
                width: 18.5625rem;
                font-size: 1.2rem;
                font-weight: 500;

                @media (max-width: 480px) {
                    width: 12rem;
                }
            }

            @media (max-width: 480px) {
                width: 100%;
            }
        }
        .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 2rem;

            .p-button {
                width: 10rem;
                justify-content: center;

                @media (max-width: 768px) {
                    width: 6.5rem;
                }
            }
        }
    }
}</style>
  