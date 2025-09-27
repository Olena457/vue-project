<script setup>
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import { mapSettings } from '@/map/settings.js'

const props = defineProps({
  favoritePlaces: {
    type: Array,
    required: true,
  },
  activeId: {
    type: [String, Number],
    default: null,
  },
  mapMarkerLngLat: {
    type: Array,
    default: null,
  },
})

const emit = defineEmits(['map-created', 'mb-click', 'marker-click'])

const handleMarkerClick = (id) => {
  emit('marker-click', id)
}

const handleMapCreated = (mapInstance) => {
  emit('map-created', mapInstance)
}

const handleMapClick = (e) => {
  emit('mb-click', e)
}
</script>

<template>
  <MapboxMap
    class="w-full h-full"
    :center="[30.523333, 50.450001]"
    :zoom="10"
    :access-token="mapSettings.apiToken"
    :map-style="mapSettings.style"
    @mb-click="handleMapClick"
    @mb-created="handleMapCreated"
  >
    <MapboxMarker v-if="props.mapMarkerLngLat" :lngLat="props.mapMarkerLngLat" anchor="bottom">
      <MarkerIcon class="h-8 w-8" is-active />
    </MapboxMarker>

    <MapboxMarker
      v-for="place in props.favoritePlaces"
      :key="place.id"
      :lngLat="place.coordinates"
      anchor="bottom"
    >
      <button @click.stop="handleMarkerClick(place.id)">
        <MarkerIcon class="h-8 w-8" :is-active="place.id === props.activeId" />
      </button>
    </MapboxMarker>
  </MapboxMap>
</template>
