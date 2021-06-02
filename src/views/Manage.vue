<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <Upload 
          ref="upload" 
          :addSong="addSong"
        />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem 
              v-for="(song, i) in songs" 
              :key="song.doc_id" 
              :song="song" 
              :updateSong="updateSong" 
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
              :index="i"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { auth, songsCollection } from '@/plugins/firebase';
  import Upload from '@/components/Upload.vue';
  import CompositionItem from '@/components/CompositionItem.vue'
  // import store from '@/store';

  export default {
    name: 'Manage',
    components: { Upload, CompositionItem },
    data() {
      return {
        songs: [],
        unsavedFlag: false,
      }
    },
    async created() {
      const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
      snapshot.forEach(this.addSong);
    },
    methods: {
      updateSong(index, values) {
        this.songs[index].modified_name = values.modified_name;
        this.songs[index].genre = values.genre;
      },
      removeSong(index) {
        this.songs.splice(index, 1);
      },
      addSong(document) {
        const song = {
          ...document.data(),
          doc_id: document.id,
        }

        this.songs.push(song);
      },
      updateUnsavedFlag(value) {
        this.unsavedFlag = value;
      },
    },
    // beforeRouteEnter(to, from, next) {
    //   if (store.state.userLoggedIn) {
    //     next();
    //   } else {
    //     next({ name: 'home' });
    //   }
    // },
    // beforeRouteLeave (to, from, next) {
    //   this.$refs.upload.cancelUploads();
    //   next();
    // },
    beforeRouteLeave(to, from, next) {
      if (!this.unsavedFlag) {
        next();
      } else {
        // eslint-disable-next-line no-alert, no-restricted-globals
        const leave = confirm('You have unsaved changes. Are you sure you want to leave this page?');
        next(leave);
      }
    },
  }
</script>
