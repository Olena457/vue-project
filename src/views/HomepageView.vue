<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMutation } from '@/composables/useMutation.js'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import { mapSettings } from '@/map/settings.js'
import { useModal } from '@/composables/useModal.js'
import { addFavoritePlace, getFavoritePlaces } from '@/api/favorite-places/favorite-places.js'
import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import UserInfo from '@/components/UserInfo/UserInfo.vue'
import LogoutButton from '@/components/LogouButton/LogoutButton.vue'

const activeId = ref(null)
const map = ref(null)
const mapMarkerLngLat = ref(null)
const { isOpen, closeModal, openModal } = useModal()

const {
  data,
  mutation: getPlaces,
  isLoading: isPlacesLoading,
} = useMutation({
  mutationFn: () => getFavoritePlaces(),
})

const favoritePlaces = computed(() => data.value ?? [])

const {
  mutation: addPlace,
  isLoading: isAddingPlace,
  error,
} = useMutation({
  mutationFn: (newPlaceData) => addFavoritePlace(newPlaceData),
  onSuccess: () => {
    closeModal()
    mapMarkerLngLat.value = null
    getPlaces()
  },
})

const changeActiveId = (id) => {
  activeId.value = id
}

const changePlace = (id) => {
  const { coordinates } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: coordinates })
}

const handleMapClick = ({ lngLat }) => {
  mapMarkerLngLat.value = [lngLat.lng, lngLat.lat]
}
const handleAddPlace = async (formData, resetForm) => {
  if (!mapMarkerLngLat.value) {
    console.error('Marker coordinates are missing. Click on the map first.')
    alert('Please click on the map first to select the marker location.')
    return
  }

  if (!formData.title || !formData.description) {
    console.error('Title and description are required.')
    alert('Please fill in both the "location" (Title) and "description" fields.')
    return
  }

  const body = {
    ...formData,
    coordinates: mapMarkerLngLat.value,
  }

  //  API REQUEST
  await addPlace(body)
  resetForm()
}

onMounted(() => {
  getPlaces()
})
</script>

<template>
  <main class="map-sidebar">
    <div class="relative bg-white shink-0 overflow-auto map-sidebar-panel-width pb-10">
      <UserInfo />
      <div v-if="isPlacesLoading">Loading...</div>

      <FavoritePlaces
        :items="favoritePlaces"
        :active-id="activeId"
        :is-places-loading="isPlacesLoading"
        @place-clicked="changePlace"
        @create="openModal"
        @updated="getPlaces"
      />

      <LogoutButton class="mt-10" />

      <CreateNewPlaceModal
        :is-open="isOpen"
        :is-loading="isAddingPlace"
        :has-error="error"
        @close="closeModal"
        @submit="handleAddPlace"
      />
    </div>
    <div class="w-full h-full flex item-center justify-center text-6xl">
      <MapboxMap
        class="w-full h-full"
        :center="[30.523333, 50.450001]"
        :zoom="10"
        :access-token="mapSettings.apiToken"
        :map-style="mapSettings.style"
        @mb-click="handleMapClick"
        @mb-created="(mapInstance) => (map = mapInstance)"
      >
        <MapboxMarker v-if="mapMarkerLngLat" :lngLat="mapMarkerLngLat" anchor="bottom">
          <MarkerIcon class="h-8 w-8" is-active />
        </MapboxMarker>

        <MapboxMarker
          v-for="place in favoritePlaces"
          :key="place.id"
          :lngLat="place.coordinates"
          anchor="bottom"
        >
          <button @click.stop="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>
