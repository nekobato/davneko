<script setup>
import { Icon } from '@iconify/vue'
import Box from './Box.vue'
import IconButton from '../components/IconButton.vue'
</script>

# Button

## IconButton

## size: 24 | 32 | 40

<Box>
  <IconButton :size="24">
    <Icon icon="mingcute:folders-line" />
  </IconButton>
</Box>

<Box>
  <IconButton :size="32">
    <Icon icon="mingcute:folders-line" />
  </IconButton>
</Box>

<Box>
  <IconButton :size="40">
    <Icon icon="mingcute:folders-line" />
  </IconButton>
</Box>

## label + custom

<Box>
  <IconButton label="FOLDER" style="width: 56px; height: 40px;">
    <Icon icon="mingcute:folders-line" :width="20" :height="20" />
  </IconButton>
</Box>
