import flushPromises from 'flush-promises';
import 'vuetify/styles'
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Video from '../../src/pages/Video.vue';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('../../src/services/api', () => ({
  getVideoData: vi.fn().mockResolvedValue({
     id: 1, title: 'Video 1', folder_id: 1, thumbnail: '', description: 'Description'
  }),
}));

vi.mock('../../src/services/login', () => ({
  authenticationToken: vi.fn().mockReturnValue('mocked-jwt'),
  endSession: vi.fn(),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/video/:videoId', name: 'Video', component: Video }
  ]
})

describe('Video Component', () => {
  it('renders correctly', async () => {
    router.push('/video/123')
    await router.isReady()

    const wrapper = mount(Video, {
      global: {
        plugins: [router]
      }
    })
    await flushPromises();

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Video 1');
    expect(wrapper.text()).toContain('Description');
    expect(wrapper.text()).toContain('Voltar para Home');
  })
})
