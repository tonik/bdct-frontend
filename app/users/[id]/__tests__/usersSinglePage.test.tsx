import { rest } from 'msw';
import { render, screen } from '@testing-library/react';

import UsersSinglePage from '../page';
import setupMockServer from '../../../../utils/setupMockServer';

const singleUserHandler = rest.get(/.*\/users\/.*/, (_req, res, ctx) =>
  res(ctx.json(
    {
      id: '87398cbf-aa5b-4cfd-8399-18f5509f2ae7',
      name: 'Jane Doe'
    },
  ))
)

describe('User single page', () => {
  setupMockServer([singleUserHandler]);

  it('should render successfully', async () => {
    render(await UsersSinglePage({ params: { id: 'id' } }))
  });

  it('should render user details', async () => {
    render(await UsersSinglePage({ params: { id: 'id' } }))
    expect(screen.getByText('Jane Doe', { exact: false })).toBeInTheDocument()
  });
}); 
