<script setup lang="ts">
import { computed, withDefaults } from "vue";

interface Props {
  type?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "primary",
  size: "md",
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const classes = computed(() => ({
  btn: true,
  [`btn-${props.type}`]: true,
  [`size-${props.size}`]: true,
  disabled: props.disabled,
  loading: props.loading,
}));

const handleClick = (e: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", e);
  }
};
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="loader"
    >⏳</span>
    <slot v-else>
      Default Button
    </slot>
  </button>
</template>

<style scoped>
.btn {
  @apply rounded transition-all font-medium;

  /* 尺寸 */
  &.size-sm {
    @apply px-3 py-1 text-sm;
  }
  &.size-md {
    @apply px-4 py-2 text-base;
  }
  &.size-lg {
    @apply px-6 py-3 text-lg;
  }

  /* 类型 */
  &.btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }

  &.btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }

  &.btn-text {
    @apply bg-transparent text-gray-700 hover:text-black;
  }

  /* 状态 */
  &.disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .loader {
    @apply animate-spin inline-block;
  }
}
</style>
