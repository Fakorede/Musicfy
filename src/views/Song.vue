<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)">
      </div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button 
          type="button" 
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full
          focus:outline-none"
          @click.prevent="newSong(song)"  
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1, 'currency', 'en') }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{ $tc('song.comment_count', song.comments_count, { count: song.comments_count }) }}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div 
            class="text-white text-center font-bold p-4 mb-4"
            :class="alert_variant"
            v-if="show_alert"
          >
            {{ alert_message }}
          </div>
          <vee-form
            :validation-schema="schema"
            @submit="addComment" 
            v-if="userLoggedIn"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            >
            </vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button 
              type="submit" 
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="in_submission"  
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
            v-model="sort"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li 
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.doc_id"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.user }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
  import { songsCollection, commentsCollection, auth } from '@/plugins/firebase';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Song',
    data() {
      return {
        song: {},
        comments: [],
        sort: '1',
        schema: {
          comment: 'required|min:3',
        },
        in_submission: false,
        show_alert: false,
        alert_variant: 'bg-blue-500',
        alert_message: 'Please wait! Your comment is being submitted.',
      }
    }, 
    async created() {
      await this.getSong();
      await this.getComments();

      const { sort } = this.$route.query;
      this.sort = sort === '1' || sort === '2' ? sort : '1'
    },
    watch: {
      sort(newValue) {
        if (newValue === this.$route.query.sort) {
          return;
        }

        this.$router.push({
          query: {
            sort: newValue,
          },
        });
      },
    },
    computed: {
      ...mapState(['userLoggedIn']),
      sortedComments() {
        return this.comments.slice().sort((a, b) => {
          if (this.sort === '1') {
            return new Date(b.datePosted) - new Date(a.datePosted);
          } 
          
          return new Date(a.datePosted) - new Date(b.datePosted);
        });
      },
    },
    methods: {
      ...mapActions(['newSong']),
      async getSong() {
        const songSnapshot = await songsCollection.doc(this.$route.params.id).get();

        if (!songSnapshot.exists) {
          this.$router.push({ name: 'home' })
          return;
        }

        this.song = songSnapshot.data();
      },
      async getComments() {
        const snapshots = await commentsCollection
          .where('sid', '==', this.$route.params.id)
          .get();

        this.comments = []

        snapshots.forEach((document) => {
          this.comments.push({
            doc_id: document.id,
            ...document.data(),
          });
        });
      },
      async addComment(values, { resetForm }) {
        this.in_submission = true;
        this.show_alert = true;
        this.alert_variant = 'bg-blue-500';
        this.alert_message = 'Please wait! Your comment is being submitted.';

        const comment = {
          content: values.comment,
          datePosted: new Date().toString(), 
          sid: this.$route.params.id,
          uid: auth.currentUser.uid,
          user: auth.currentUser.displayName,
        }

        await commentsCollection.add(comment);

        this.song.comments_count += 1;
        await songsCollection.doc(this.$route.params.id).update({
          comments_count: this.song.comments_count,
        });

        this.getComments();

        this.in_submission = false;
        this.alert_variant = 'bg-green-500';
        this.alert_message = 'Comment has been added.';

        resetForm();
      },
    },
  }
</script>
