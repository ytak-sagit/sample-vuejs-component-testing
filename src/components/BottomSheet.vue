<template>
  <!-- NOTE: https://ja.vuejs.org/guide/built-ins/transition -->
  <transition @after-leave="leave">
    <dialog v-show="isShown" ref="dialog-ref" class="bottom-sheet" aria-labelledby="heading">
      <header class="bottom-sheet-header">
        <h2 id="heading">{{ props.heading }}</h2>
        <button @click="close" class="close-button" type="button" aria-label="close">✕</button>
      </header>
      <div class="bottom-sheet-content">
        <slot name="content" />
      </div>
    </dialog>
  </transition>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const props = defineProps<{
  heading: string
}>()

// refでdialog要素への参照を取得
const dialogRef = useTemplateRef('dialog-ref')

const isShown = ref(false)

const open = () => {
  if (dialogRef.value) {
    isShown.value = true
    dialogRef.value.showModal()
  }
}

const close = () => {
  isShown.value = false
}

// トランジション終了後に呼ばれる処理
const leave = () => {
  // NOTE:
  // close()内で同時に実行すると即座にボトムシートが非表示となるため、
  // 1.close()でisShown更新 -> ボトムシートを引っ込めて閉じる
  // 2.leave()でdialogをclose
  // という流れで実行されるようにしている
  if (dialogRef.value) {
    dialogRef.value.close()
  }
}

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

.bottom-sheet {
  border: none;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.25);
  background-color: azure;
  padding: 0;
  margin: 0;
  inset: auto 0 0 0;
  width: 100vw;
  max-width: 100vw;
  height: 164px;
  max-height: 180px;
}

.bottom-sheet::backdrop {
  background: rgba(0, 0, 0, 0.4);
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
