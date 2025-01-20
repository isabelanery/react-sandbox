import { render } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import NotFound from '../../src/pages/NotFound.vue';
import { describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../src/api');
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('NotFound Component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify();
  });

  it('renders NotFound form correctly', () => {
    const screen = render(NotFound);

    expect(screen.getByText('404 - Página não encontrada')).toBeInTheDocument();
    expect(screen.getByText('Parece que esta página não existe.')).toBeInTheDocument();
    expect(screen.getByText('Ir para Login')).toBeInTheDocument();
  });
});
