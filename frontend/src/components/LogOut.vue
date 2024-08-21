<script setup>
import { TOKEN_KEY } from '@/consts';
import { ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';

const visible = ref(false);
const router = useRouter();
const cookies = useCookies();

const logOut = () => {
  cookies.remove(TOKEN_KEY);
  router.push('/login');
};
</script>
<template>
  <BButton label="LogOut" @click="visible = true" />

  <Dialog v-model:visible="visible" pt:root:class="!border-0 !bg-transparent" pt:mask:class="backdrop-blur-sm">
    <template #header>Are you sure you want to logout?    </template>
    <template #footer>
      <BButton variant="primary" label="Yes" @click="logOut"></BButton>
      <BButton label="No" @click="visible = false"></BButton>
    </template>
  </Dialog>
</template>
