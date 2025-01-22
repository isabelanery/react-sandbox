import { createVuetify } from 'vuetify';
import flushPromises from 'flush-promises';
import 'vuetify/styles'
import Home from '../../src/pages/Home.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { render } from '@testing-library/vue';

vi.mock('../../src/services/api', () => ({
  fetchVideosListData: vi.fn().mockResolvedValue({
    videos: [
      { id: 1, title: 'Video 1', folder_id: 1, thumbnail: '' },
      { id: 2, title: 'Video 2', folder_id: 2, thumbnail: '' },
    ],
    pages: 1,
    total: 2,
  }),
  getFolders: vi.fn().mockResolvedValue([
    { id: 1, name: 'Folder 1', videoCount: 1 },
    { id: 2, name: 'Folder 2', videoCount: 1 },
  ]),
}));

vi.mock('../../src/services/login', () => ({
  authenticationToken: vi.fn().mockReturnValue('mocked-jwt'),
  endSession: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));


describe('Home Component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify();
  });

  it('renders video list correctly', async () => {
    const wrapper = mount(Home, { vuetify });

    await flushPromises();

    expect(wrapper.text()).toContain('Video 1');
    expect(wrapper.text()).toContain('Video 2');
    expect(wrapper.text()).toContain('Folder 1');
    expect(wrapper.text()).toContain('Folder 2');
  });

  it('renders logout btn and search input', async () => {
    const screen = render(Home);

    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  })
});
