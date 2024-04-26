<script setup>
import Box from './Box.vue'
import TrackItem from '../components/TrackItem.vue'
import TrackList from '../components/TrackList.vue'
</script>

# Track

## TrackItem

<Box>
  <TrackItem
    type="track"
    coverSrc="https://source.unsplash.com/random/56x56"
    title="Track Title"
    subTitle="Artist Name"
  />
</Box>

## TrackList

<Box>
  <TrackList class="track-list">
    <TrackItem
      v-for="i in 5"
      type="track"
      coverSrc="https://source.unsplash.com/random/56x56"
      title="Track Title"
      subTitle="Artist Name"
    />
  </TrackList>
</Box>

<style scoped>
.track-list {
  height: 240px;
}
</style>
