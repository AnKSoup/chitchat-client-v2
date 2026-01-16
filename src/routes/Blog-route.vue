<script setup lang="ts">
import {
  blogIcon,
  blogSettingsIcon,
  chatIcon,
  loginIcon,
  logoutIcon,
  profileIcon,
  // respondIcon,
  searchIcon,
} from '@/assets/objects/icons'
import CommentList from '@/components/comment-list.vue'
import iconList from '@/components/icon-list.vue'
import profilePictureItem from '@/components/profile-picture-item.vue'
import TextBar from '@/components/text-bar.vue'
import WritingBar from '@/components/writing-bar.vue'
import { GetBlog, IsUserOwnerOfBlog, UpdateBlog } from '@/scripts/blogs'
import { generateGradient } from '@/scripts/gradients'
import { GetUserInfo } from '@/scripts/users'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const blog = defineProps(['blog_id'])
const route = useRoute()

const edit = ref(false)
const error = ref('')

function ChangeEditValue(bool: boolean) {
  edit.value = bool
}

const author = ref({
  image: '',
  name: 'loading...',
  gradientColor1: '',
  gradientColor2: '',
})

function Reload() {
  ChangeEditValue(false)
  PopulateOwnerArray(IsUserOwnerOfBlog(blog.blog_id))
  FetchBlog()
  GetUserInfo(blog.blog_id)
}

async function EditMyBlog() {
  const result = await UpdateBlog(blog_content.value)
  if (!result.success) {
    error.value = result.detail
  } else {
    Reload()
  }
}

const red = ref(generateGradient('red'))

const blog_content = ref('<h1>Loading...</h1>')

const ownerIconArray = ref([{}])

function PopulateOwnerArray(isOwner: boolean) {
  const ownerIcons = [
    {
      ...blogSettingsIcon,
      ...{
        action: () => {
          ChangeEditValue(true)
        },
      },
    },
  ]
  if (isOwner) {
    ownerIconArray.value = ownerIcons
  } else {
    ownerIconArray.value = []
  }
}

async function FetchBlog() {
  const result = await GetBlog(blog.blog_id)
  blog_content.value = result.content

  author.value = await GetUserInfo(blog.blog_id)
}

onMounted(async () => {
  Reload()
})

// To react to param changing
watch(
  () => route.params.blog_id,
  async (newId) => {
    ChangeEditValue(false)
    PopulateOwnerArray(IsUserOwnerOfBlog(newId as string))
    FetchBlog()
  },
)

const commentClusters = [
  [
    {
      image: '',
      username: 'mister1',
      usernameResponse: '',
      responsePreview: '',
      date: '0000',
      content: 'je suis un commentaire',
      gradientColor1: 'blue',
      gradientColor2: '',
      gradientColor3: '',
      gradientColor4: '',
    },
    {
      image: '',
      username: 'mister2',
      usernameResponse: 'Mister1',
      responsePreview: 'je suis un commentaire',
      date: '0000',
      content: 'je suis un commentaire aussi',
      gradientColor1: '',
      gradientColor2: '',
      gradientColor3: 'blue',
      gradientColor4: '',
    },
    {
      image: '',
      username: 'mister2',
      usernameResponse: 'Mister1',
      responsePreview: 'je suis un commentaire',
      date: '0000',
      content: 'je suis un commentaire aussi',
      gradientColor1: '',
      gradientColor2: '',
      gradientColor3: 'blue',
      gradientColor4: '',
    },
  ],
  [
    {
      image: '',
      username: 'mister1',
      usernameResponse: '',
      responsePreview: '',
      date: '0000',
      content: 'je suis un commentaire',
      gradientColor1: 'blue',
      gradientColor2: '',
      gradientColor3: '',
      gradientColor4: '',
    },
  ],
  [
    {
      image: '',
      username: 'mister5',
      usernameResponse: '',
      responsePreview: '',
      date: '0000',
      content: 'je suis un commentaire',
      gradientColor1: 'blue',
      gradientColor2: '',
      gradientColor3: '',
      gradientColor4: '',
    },
  ],
]
</script>

<template>
  <!-- TODO: vif if logged in and if owner/ message selected -->
  <div class="ui-container">
    <!-- TOP hEADER -->
    <nav>
      <icon-list :icons-array="[[profileIcon, chatIcon, blogIcon]]" />
      <icon-list
        class="grow"
        :icons-array="[
          [
            searchIcon,
            ...ownerIconArray,
            // respondIcon, Not yet
          ],
          [loginIcon, logoutIcon],
        ]"
      />
    </nav>
    <main>
      <iframe
        v-if="!edit.valueOf()"
        class="blog"
        :srcdoc="blog_content"
        sandbox=""
        frameborder="0"
      ></iframe>

      <div class="card blog" v-if="edit.valueOf()">
        <div class="field-container">
          <textarea
            class="field"
            type="text"
            v-model="blog_content"
            placeholder="Write your thoughts here..."
          />
          <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div class="button-bundle">
          <button class="red" @click="ChangeEditValue(false)">Cancel</button>
          <button @click="EditMyBlog()">Change</button>
        </div>
      </div>

      <div class="comments">
        <div class="author">
          <profile-picture-item
            :image="author.image"
            :gradient-color1="author.gradientColor1"
            :gradient-color2="author.gradientColor2"
          />
          <text-bar
            :text="author.name"
            :gradient-color1="author.gradientColor1"
            :gradient-color2="author.gradientColor2"
          />
        </div>
        <comment-list :comment-clusters="commentClusters" />
        <writing-bar
          placeholder="Comment something..."
          :gradient-color1="author.gradientColor1"
          :gradient-color2="author.gradientColor2"
        />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main-ui.scss';
@use '@/assets/styles/blog.scss';

@use '@/assets/styles/variables.scss';
@use '@/assets/styles/profile.scss';
@use '@/assets/styles/form.scss';
@use '@/assets/styles/button.scss';
// // OVERRIDE:
.card {
  gap: variables.$desktop_spacing_medium;
}
.field-container {
  height: 100%;
}
.field {
  resize: none;
  height: 100%;
}
.red {
  background:
    variables.$simple-highlight,
    radial-gradient(100% 100% at 50% 100%, v-bind('red.color2') 0%, v-bind('red.color1') 100%);
}
</style>
