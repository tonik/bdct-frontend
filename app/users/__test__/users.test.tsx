import { render, screen } from '@testing-library/react';
import { rest } from 'msw';

import UsersPage from '../page';
import setupMockServer from '../../../utils/setupMockServer';

const allUsersHandler = rest.get(/.*\/users$/, (_req, res, ctx) =>
  res(ctx.json([
    {
      id: '3640c80d-13fd-4a20-b8ef-f9cb2943508q',
      name: 'John Doe',
    },
    {
      id: '87398cbf-aa5b-4cfd-8399-18f5509f2ae7',
      name: 'Jane Doe'
    }
  ]))
)

describe("Users page", () => {
  setupMockServer([allUsersHandler])

  it("should render successfully", async () => {
    render(await UsersPage())
  });
  it('should render user list', async () => {
    render(await UsersPage())
    expect(screen.getByText('Jane Doe', { exact: false })).toBeInTheDocument()
  })
})