import { render } from '@testing-library/vue';
import { createVuetify } from 'vuetify';
import Login from '../../src/pages/Login.vue';
import { describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../src/services/api');
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Login Component', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify();
  });

  it('renders login form correctly', () => {
    const screen = render(Login);

    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText('Insira seu email e senha para continuar')).toBeInTheDocument();

    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('renders with disabled button', async () => {
    const { getByTestId } = render(Login);

    const button = getByTestId('login');

    expect(button).toHaveAttribute('disabled');
  });
});
