<template>
  <button @click="modalOpen = true">open</button>

  <teleport to="body">
    <div v-if="modalOpen" data-testid="teleported-modal">
      This is a teleported modal!
      <button @click="modalOpen = false">close</button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modalOpen = ref(false)
</script>
