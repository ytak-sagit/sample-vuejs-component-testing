<template>
  <Teleport to="body">
    <!-- NOTE: https://ja.vuejs.org/guide/built-ins/transition -->
    <div v-show="isShownBackdrop" class="backdrop">
      <transition @after-leave="leave">
        <div
          v-show="isShownBottomSheet"
          class="bottom-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bottom-sheet-heading"
        >
          <header class="bottom-sheet-header">
            <h2 id="bottom-sheet-heading">{{ props.heading }}</h2>
            <button @click="close" class="close-button" type="button" aria-label="close">✕</button>
          </header>
          <div class="bottom-sheet-content">
            <slot name="content" />
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  heading: string
}>()

const isShownBottomSheet = ref(false)
const isShownBackdrop = ref(false)

const open = () => {
  isShownBackdrop.value = true
  isShownBottomSheet.value = true
}

const close = () => (isShownBottomSheet.value = false)

// トランジション終了後に呼ばれる処理
// NOTE:
// close()内で同時に実行すると即座にボトムシートが非表示となるため、
// 1.close()でisShownBottomSheet更新 -> ボトムシートを引っ込めて閉じる
// 2.leave()でisShownBackdrop更新
// という流れで実行されるようにしている
const leave = () => (isShownBackdrop.value = false)

// 親コンポーネントから呼び出せるように公開
defineExpose({ open, close })
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.backdrop {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
}

.bottom-sheet {
  border: none;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.25);
  background-color: azure;
  color: var(--vt-c-black);
  padding: 0;
  margin: 0;
  inset: auto 0 0 0;
  width: 100vw;
  max-width: 100vw;
  height: 164px;
  max-height: 180px;
}

.bottom-sheet-header {
  position: relative;
  padding: 18px;
}

.bottom-sheet-content {
  padding: 0 18px 24px 18px;
  max-height: min(60vh, 70dvh);
  overflow: auto;
}

.close-button {
  position: absolute;
  right: 16px;
  top: 16px;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
}
</style>
