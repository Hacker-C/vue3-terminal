<script setup lang="ts">
import type { Directory } from '@/store/useDirectoryStore'

defineProps<{
  folder: Directory
  index?: number
}>()
</script>

<template>
  <div class="text-blue-400 relative border-transparent border-[1px]">
    <!-- current folder name -->
    <div>
      <!-- BUG: v-if="index !== 0"  the first folder -->
      <span
        class="inline-block w-[20px] h-[1.5px] bg-white mb-[6px] before:content-[''] before:block before:h-[18px] before:w-[1.5px] before:relative before:bottom-[18px] before:right-[1px] before:bg-white"
      />
      <span class="ml-2 inline-block"> {{ folder.name }} </span>
    </div>

    <!-- all files -->
    <div
      v-for="(file, idx) in folder.files"
      :key="file.name"
      class="text-green-400 pl-8"
    >
      <span
        v-if="idx !== 0"
        class="inline-block w-[20px] h-[1.5px] bg-white mb-[6px] before:content-[''] before:block before:h-[27px] before:w-[1.5px] before:relative before:bottom-[27px] before:bg-white"
      />
      <span
        v-else
        class="inline-block w-[20px] h-[1.5px] bg-white mb-[6px] before:content-[''] before:block before:h-[15px] before:w-[1.5px] before:relative before:bottom-[15px] before:bg-white"
      />
      <span class="ml-2"> {{ file.name }} </span>
    </div>

    <!-- all folders -->
    <FolderTree
      v-for="child in folder.directories"
      :key="child.id"
      :folder="child"
      :index="index"
      class="pl-8"
    />
  </div>
</template>
