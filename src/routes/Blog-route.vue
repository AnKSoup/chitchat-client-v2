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
import SearchItem from '@/components/search-item.vue'
import TextBar from '@/components/text-bar.vue'
import WritingBar from '@/components/writing-bar.vue'
import router from '@/router'
import { GetBlog, IsUserOwnerOfBlog, UpdateBlog } from '@/scripts/blogs'
import { FormatComments, PostComment } from '@/scripts/comment'
import { generateGradient } from '@/scripts/gradients'
import { GetUserInfo } from '@/scripts/users'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const blog = defineProps(['blog_id'])
const route = useRoute()

//To switch between displayed elements
const display_element = ref('main')
function alternateElements(element: string) {
  if (display_element.value == element) {
    display_element.value = 'main'
  } else {
    display_element.value = element
  }
}

const error = ref('')

const author = ref({
  image: '',
  name: 'loading...',
  gradientColor1: '',
  gradientColor2: '',
})

function Reload() {
  alternateElements('main')
  PopulateOwnerArray(IsUserOwnerOfBlog(blog.blog_id))
  FetchBlog()
  GetUserInfo(blog.blog_id)
  LoadComments()
}

async function EditMyBlog() {
  const result = await UpdateBlog(blog_content.value)
  if (!result.success) {
    error.value = result.detail
  } else {
    Reload()
  }
}

function triggerError(message: string) {
  alert(message)
}
function SearchExecute(input: number) {
  router.push('/Blogs/' + input)
}

const red = ref(generateGradient('red'))

const blog_content = ref('<h1>Loading...</h1>')

const commentClusters = ref([
  [
    {
      image: '',
      username: '',
      usernameResponse: '',
      responsePreview: '',
      date: '',
      content: 'Loading...',
      id: '',
      gradientColor1: '',
      gradientColor2: '',
      gradientColor3: '',
      gradientColor4: '',
    },
  ],
])

const ownerIconArray = ref([{}])

function PopulateOwnerArray(isOwner: boolean) {
  const ownerIcons = [
    {
      ...blogSettingsIcon,
      ...{
        action: () => {
          alternateElements('edit')
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

async function LoadComments() {
  commentClusters.value = [
    [
      {
        image: '',
        username: '',
        usernameResponse: '',
        responsePreview: '',
        date: '',
        content: 'Loading...',
        id: '',
        gradientColor1: '',
        gradientColor2: '',
        gradientColor3: '',
        gradientColor4: '',
      },
    ],
  ]
  const result = await FormatComments(blog.blog_id)
  commentClusters.value = result
}

const selected = ref('0')
function SelectComment(input: string) {
  if (selected.value == input) {
    selected.value = '0'
  } else {
    selected.value = input
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
    alternateElements('main')
    PopulateOwnerArray(IsUserOwnerOfBlog(newId as string))
    FetchBlog()
  },
)
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
            {
              ...searchIcon,
              ...{
                action: () => {
                  alternateElements('search') // ugly but works
                },
              },
            },
            ...ownerIconArray,
            // respondIcon, Not yet
          ],
          [loginIcon, logoutIcon],
        ]"
      />
    </nav>
    <main>
      <iframe
        v-if="display_element.valueOf() == 'main'"
        class="blog"
        :srcdoc="blog_content"
        sandbox=""
        frameborder="0"
      ></iframe>

      <div class="card blog" v-if="display_element.valueOf() == 'edit'">
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
          <button class="red" @click="alternateElements('main')">Cancel</button>
          <button @click="EditMyBlog()">Change</button>
        </div>
      </div>

      <search-item
        style="padding: 0"
        v-if="display_element.valueOf() == 'search'"
        :execute="SearchExecute"
        button="Search"
      />

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
        <comment-list
          @selected="SelectComment"
          :comment-clusters="commentClusters"
          :selected_comment="selected"
        />
        <writing-bar
          @send="
            async (input) => {
              if (input.value) {
                const result = await PostComment(blog.blog_id, input.value, selected.valueOf())
                if (result.success) {
                  input.value = ''
                  // Then refresh comments
                  LoadComments()
                  // If it works refresh
                } else {
                  triggerError('Couldn\'t send comment.')
                }
              }
            }
          "
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
