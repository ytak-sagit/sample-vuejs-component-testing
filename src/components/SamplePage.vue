<template>
  <div>
    <h1>ボトムシートの例</h1>
    <button @click="openBottomSheet">ボトムシートを開く</button>

    <BottomSheet ref="bottom-sheet" heading="ボトムシートの内容">
      <template #content>
        <p>ここに表示したいコンテンツを入れます。</p>
      </template>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import BottomSheet from './version-div/BottomSheet.vue'

// BottomSheetコンポーネントへの参照
const bottomSheetRef = useTemplateRef('bottom-sheet')

// ボトムシートを開くメソッド
const openBottomSheet = () => {
  if (bottomSheetRef.value) {
    bottomSheetRef.value.open()
  }
}
</script>
