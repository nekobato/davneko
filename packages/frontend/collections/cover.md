<script setup>
import Box from './Box.vue'
import CoverImage from '../components/CoverImage.vue'
</script>

## CoverImage

### size: 48 | 56 | 64 | 112 | 152 | undefined

<Box>
  <CoverImage
    src="https://source.unsplash.com/random/512x512"
    :size="48"
  />
</Box>

<Box>
  <CoverImage
    src="https://source.unsplash.com/random/512x512"
    :size="56"
  />
</Box>

<Box>
  <CoverImage
    src="https://source.unsplash.com/random/512x512"
    :size="64"
  />
</Box>

<Box>
  <CoverImage
    src="https://source.unsplash.com/random/512x512"
    :size="112"
  />
</Box>

<Box>
  <CoverImage
    src="https://source.unsplash.com/random/512x512"
    :size="152"
  />
</Box>

<Box height="400px">
  <CoverImage
    src="https://source.unsplash.com/random/512x512"
    :size="undefined"
  />
</Box>
