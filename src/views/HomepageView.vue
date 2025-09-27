<script setup>
import { computed, onMounted, ref, defineAsyncComponent } from 'vue'
import { useMutation } from '@/composables/useMutation.js'
import { useModal } from '@/composables/useModal.js'
import { addFavoritePlace, getFavoritePlaces } from '@/api/favorite-places/favorite-places.js'

import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import UserInfo from '@/components/UserInfo/UserInfo.vue'
import LogoutButton from '@/components/LogouButton/LogoutButton.vue'

const MapboxLoader = defineAsyncComponent(
  () => import('@/components/MapboxLoader/MapboxLoader.vue'),
)

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
  const place = favoritePlaces.value.find((place) => place.id === id)
  if (place && map.value) {
    changeActiveId(id)
    map.value.flyTo({ center: place.coordinates })
  }
}

const handleMapClick = ({ lngLat }) => {
  mapMarkerLngLat.value = [lngLat.lng, lngLat.lat]
}

const handleMapCreated = (mapInstance) => {
  map.value = mapInstance
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

  // API REQUEST
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
      <MapboxLoader
        :favorite-places="favoritePlaces"
        :active-id="activeId"
        :map-marker-lng-lat="mapMarkerLngLat"
        @map-created="handleMapCreated"
        @mb-click="handleMapClick"
        @marker-click="changeActiveId"
      />
    </div>
  </main>
</template>
