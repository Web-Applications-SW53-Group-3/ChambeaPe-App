<template >
    <header :class="{'scrolled-nav' : scrolledNav}">
        <nav>
            <div class="branding">
                <img @click="redirectToLogin()" style="cursor: pointer" src="@/assets/images/Logo.png" alt="">
            </div>
            <ul v-show="!mobile" class="navigation">
                <li><router-link class="link" :to="{ path: '/home' }">Inicio</router-link></li>
                <li @click="redirectToEmpleos()" style="cursor: pointer">Empleos</li>
                <li @click="redirectToCreatePost()">  Create </li>
                <li>Perfil</li>
            </ul>
            <div class="icon">                
                <i @click="toggleMobileNav" v-show="mobile" class="fa-solid fa-bars" style="color: white " :class="{'icon-active' : mobileNav}"></i>
            </div>
            <transition name="mobile-nav">
                <ul v-show="mobileNav" class="dropdown-nav">
                    <li><router-link  class="link" :to="{name: ''}">Inicio</router-link></li>
                    <li @click="redirectToEmpleos()">Empleos</li>
                    <li><router-link  class="link" :to="{name: ''}">Chambeadores</router-link></li>
                    <li><router-link  class="link" :to="{name: ''}">Perfil</router-link></li> 
                </ul>
            </transition>
          <language-selector></language-selector>
        </nav>
    </header>
</template>
<script>
import LanguageSelector from "@/components/language/language-selector.vue";
export default {
    name: 'NavigationComponent',
    components: {
    LanguageSelector
    },
    data() {
        return {
            scrolledNav: null,
            mobile: null,
            mobileNav: null,
            windowWidth: null
        }
    },
    created(){
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    mounted(){
        window.addEventListener('scroll', this.updateScroll);
        this.updateScroll();
    },
    methods: {
      redirectToCreatePost(){
        this.$router.push("/job-post");
      },
      redirectToLogin(){
        this.$router.push("/login");
      },
      redirectToHome(){
        this.$router.push("/home");
      },
      redirectToEmpleos(){
        this.$router.push("/posts");
      },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        updateScroll(){
            const scrollPosition = window.scrollY;
            if(scrollPosition > 50){
                this.scrolledNav = true;
                return
            }
            this.scrolledNav = false;
        },

        checkScreen(){
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 768){
                this.mobile = true;
                return
            } 
            this.mobile = false;
            this.mobileNav = false;
            return
        }
    }
}
</script>
<style lang="scss">

header {
    background-color: rgba($color: #f1a636, $alpha: 0.9);
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: all 0.3s ease-in-out;
    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: .75rem 0;
        transition: all 0.3s ease-in-out;
        width: 90%;
        margin: 0 auto;
        @media (min-width: 1140px) {
            max-width: 71.25rem;
        }
        ul, 
        .link {
            font-weight: 500;
            color: #fff;
            list-style: none;
            text-decoration: none;
        }
        li {
            text-transform: uppercase;
            padding: 1rem;
            margin-left: 1rem;
        }

        .link {
            font-size: .875rem;
            transition: all 0.3s ease-in-out;
            padding-bottom: 4px;
            border-bottom: 1px solid transparent;
            &:hover {
                border-color: #fff;
            }
        }

        .branding {
            display: flex;
            align-items: center;
            
            img{
                width: 3.125rem;
                transition: all 0.3s ease-in-out;
            }
        }

        .navigation {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: flex-end;

        }

        .icon {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 1.5rem;
            height: 100%;

            i {
                cursor: pointer;
                font-size: 1.5rem;
                transition: all 0.3s ease;

            }
        }

        .icon-active {
            transform: rotate(180deg);
        }

        .dropdown-nav {
            display: flex;
            flex-direction: column;
            position: fixed;
            width: 100%;
            max-width: 15.625rem;
            height: 100%;
            background-color: #fff;
            top: 0;
            left: 0;

            li {
                margin-left: 0;
                .link {
                    color: #000;
                }
            }
            &:hover {
                border-color: #f1a636;
            }
        }

        .mobile-nav-enter-active,
        .mobile-nav-leave-active {
            transition: all 0.5s ease;
        }

        .mobile-nav-enter-from,
        .mobile-nav-leave-to {
            transform: translateX(-250%);
        }

        .mobile-nav-enter-to {
            transform: translateX(0);
        }
    }
}

.scrolled-nav {
    background-color: #f1a636;
    nav {
        padding: 8px 0;
        .branding {
            img {
                width: 2.5rem;
            }
        }
        .link {
            color: #fff;
            &:hover {
                color: #fff;
                border-color: #fff;
            }
        }
    }
}
    
</style>