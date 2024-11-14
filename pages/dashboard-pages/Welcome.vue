<template>
  <div class="main-cont">
    <div class="row">
      <div class="col s12 m3 pad0 side-nav-wrapper">
        <SideNav />
      </div>
      <div class="col s12 m9 pad0 content-side-wrapper">
        <TopNav />

        <div class="content-container">
          <div class="container">
            <div class="welcome-intro center">
              <h4>
                <span>Welcome to your Dashboard!</span>
                <img src="@/assets/images/star-emoji.svg" alt="star-emoji" />
              </h4>
              <p>
                Your account is currently in <span class="red-text">test mode</span>, so 
                there are a few more things to do before you can go live and start 
                receiving payments. Follow the steps below to get activated.
              </p>
            </div>

            <div class="task-table">
              <div 
                v-for="task in tasks" 
                :key="task.id"
                class="task-row"
                :class="{ 'completed': task.progress === 100 }"
              >
                <div class="task-icon">
                  <img 
                    v-if="task.progress < 100"
                    :src="`@/assets/images/${task.icon}`" 
                    :alt="task.title"
                  >
                  <img 
                    v-else
                    src="@/assets/images/check.svg" 
                    alt="completed" 
                    class="task-complete-icon"
                  >
                </div>
                <div class="task-desc">
                  <NuxtLink 
                    v-if="task.route" 
                    :to="task.route"
                    class="task-title"
                  >
                    <h5>{{ task.title }}</h5>
                  </NuxtLink>
                  <h5 v-else>{{ task.title }}</h5>
                  <p>{{ task.description }}</p>
                </div>
                <div class="task-progress">
                  <div v-if="task.id === 'email'">
                    <button 
                      class="sec-bg resend-link-btn"
                      @click="resendVerificationEmail"
                      :disabled="isResending"
                    >
                      {{ isResending ? 'Sending...' : 'Resend link' }}
                    </button>
                  </div>
                  <div v-else class="progress-status center">
                    <span :class="{ 'sec-color': task.progress === 100 }">
                      {{ task.progress }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="go-live-div center">
              <button 
                class="go-live-btn"
                :disabled="!canGoLive"
                @click="requestGoLive"
              >
                Request to go live
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideNav from "@/components/SideNav.vue"
import TopNav from "@/components/TopNav.vue"

const isResending = ref(false)

const tasks = ref([
  {
    id: 'email',
    title: 'Verify your email address',
    description: 'Click on the verification link we sent to your email address. You can resend the link if you didn\'t get it.',
    icon: 'email-step.svg',
    progress: 0,
    required: true
  },
  {
    id: 'personal',
    title: 'Personal information',
    description: 'Please provide a few details to help us verify your identity.',
    icon: 'profile-step.svg',
    route: '/personal-info',
    progress: 100,
    required: true
  },
  {
    id: 'business',
    title: 'Business information',
    description: 'Please provide a few details about your business.',
    icon: 'business-step.svg',
    route: '/business-info',
    progress: 0,
    required: true
  },
  {
    id: 'bank',
    title: 'Bank details',
    description: 'Please provide bank details of you preferred settlement account.',
    icon: 'bank-step.svg',
    route: '/bank-info',
    progress: 0,
    required: true
  },
  {
    id: 'tour',
    title: 'Dashboard tour (optional)',
    description: 'Learn about the awesome things you can do on your new dashbaord.',
    icon: 'tour-step.svg',
    route: '/',
    progress: 0,
    required: false
  }
])

const canGoLive = computed(() => {
  return tasks.value
    .filter(task => task.required)
    .every(task => task.progress === 100)
})

const resendVerificationEmail = async () => {
  try {
    isResending.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Update task progress
    const emailTask = tasks.value.find(t => t.id === 'email')
    if (emailTask) {
      emailTask.progress = 0 // Reset progress as new verification needed
    }
  } catch (error) {
    console.error('Error resending verification:', error)
  } finally {
    isResending.value = false
  }
}

const requestGoLive = async () => {
  if (!canGoLive.value) return
  
  try {
    navigateTo('/processing-request')
  } catch (error) {
    console.error('Error requesting go live:', error)
  }
}
</script>

<style scoped>
.main-cont {
  height: 100vh;
}

.main-cont > .row {
  width: 100%;
  margin: 0;
}

.content-container {
  margin-top: calc(64px + 1.2rem);
}

.side-nav-wrapper.col.m3 {
  width: 20% !important;
  position: relative;
}

.content-side-wrapper.col.m9 {
  width: 80% !important;
  position: relative;
  height: 100vh;
  overflow: auto;
}

.task-row {
  transition: all 0.3s ease;
}

.task-row:hover {
  background-color: #f9f9f9;
}

.task-title h5 {
  cursor: pointer;
  transition: color 0.3s ease;
}

.task-title:hover h5 {
  color: var(--sec-color);
}

.resend-link-btn {
  transition: all 0.3s ease;
}

.resend-link-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.go-live-btn {
  transition: all 0.3s ease;
  padding: 12px 24px;
  border-radius: 4px;
}

.go-live-btn:not(:disabled) {
  background-color: var(--sec-color);
  color: white;
}

.go-live-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.task-complete-icon {
  animation: scaleIn 0.3s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>