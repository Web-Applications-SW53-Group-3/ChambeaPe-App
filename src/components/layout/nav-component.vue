<template >
    <header :class="{ 'scrolled-nav': scrolledNav }">
        <nav>
            <div class="branding">
                <img @click="redirectToHome" style="cursor: pointer" src="@/assets/images/Logo.png" alt="">
            </div>
            <ul v-show="!mobile" class="navigation">
                <li class="link" @click="redirectToHome">{{ $t("naHome") }}</li>
                <li class="link" @click="redirectToEmpleos" style="cursor: pointer">{{ $t("naJobs") }}</li>
                <li class="link" @click="redirectToCreatePost"> {{ $t("naPublish") }} </li>
                <li class="link" @click="redirectProfile">{{ $t("naProfile") }}</li>
                <li class="link" @click="redirectToChat">Chat</li>
            </ul>
            <language-selector v-if="!mobile"></language-selector>
            <div v-if="!mobile" class="logout">
                <li @click="logout()">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </li>
            </div>
            <div class="icon">
                <i @click="toggleMobileNav" v-show="mobile" class="fa-solid fa-bars" style="color: white "
                    :class="{ 'icon-active': mobileNav }"></i>
            </div>
            <transition name="mobile-nav">
                <ul v-show="mobileNav" class="dropdown-nav">
                    <div>
                        <li class="mobileLink" @click="redirectToHome">{{ $t("naHome") }}</li>
                        <li class="mobileLink" @click="redirectToEmpleos">{{ $t("naJobs") }}</li>
                        <li class="mobileLink" @click="redirectToCreatePost"> {{ $t("naPublish") }} </li>
                        <li class="mobileLink" @click="redirectProfile">{{ $t("naProfile") }}</li>
                        <li class="mobileLink" @click="redirectToChat">Chat</li>
                    </div>
                    <div> 
                        <language-selector class="mobileLink"></language-selector>
                        <li @click="logout()" class="mobileLink">
                            {{ $t("logout") }}
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </li>
                    </div>
                </ul>
            </transition>
        </nav>
    </header>
</template>
<script>
import LanguageSelector from "@/components/language/language-selector.vue";
import LoginService from "../../services/login.service";
import JwtService from "@/services/jwt.service.js";


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
            windowWidth: null,
            LoginService: new LoginService(),
            jwtService: new JwtService()
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);
        this.updateScroll();
    },
    methods: {
        redirectToCreatePost() {
            this.$router.push("/job-post");
        },
        redirectToLogin() {
            this.$router.push("/login");
        },
        redirectProfile() {
            const jwtService = new JwtService();
            const userId = jwtService.getSub();
            this.$router.push({ path: '/profile/' + userId });

        },
        redirectToChat() {
            this.$router.push("/chat");
        },
        redirectToHome() {
            const jwtService = new JwtService();
            const userToken = jwtService.getToken();

            if (userToken) {
                this.$router.push("/home");
            } else {
                this.$router.push("/login");
            }
        },
        redirectToEmpleos() {
            this.$router.push("/posts");
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        updateScroll() {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                this.scrolledNav = true;
                return
            }
            this.scrolledNav = false;
        },

        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 768) {
                this.mobile = true;
                return
            }
            this.mobile = false;
            this.mobileNav = false;
            return
        },
        async logout() {
            await this.LoginService.logout();
            this.jwtService.logout();
            this.$router.push("/login");
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

        .logout {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: .4rem;

            background: none;
            border: none;
            cursor: pointer;
            margin-right: 10px;
            color: white;
            list-style: none;

            &:hover {
                color: #fff;
            }
        }

        ul {
            font-weight: 500;
            color: #fff;
            list-style: none;
            text-decoration: none;
            cursor: pointer;
        }

        li {
            text-transform: uppercase;
            padding: 0 1rem;
            margin-left: 1rem;
        }

        .link {
            font-size: .875rem;
            transition: all 0.3s ease-in-out;
            border-bottom: 1px solid transparent;

            &:hover {
                border-color: #fff;
            }
        }

        .branding {
            display: flex;
            align-items: center;

            img {
                width: 3.125rem;
                transition: all 0.3s ease-in-out;
            }
        }

        .navigation {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;

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
            justify-content: space-between;
            position: fixed;
            width: 100%;
            max-width: 15.625rem;
            height: 100%;
            background-color: #fff;
            top: 0;
            left: 0;

            .mobileLink {
                color: #f1a636;
                font-size: 1.25rem;
                padding: 1rem 0;
                text-align: center;
                border-bottom: 1px solid #f1a636;
                transition: all 0.3s ease-in-out;
                margin: 0;

                &:hover {
                    color: #fff;
                    background-color: #f1a636;
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