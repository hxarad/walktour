import * as React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { Walktour } from '../../src/components/Walktour';

describe('Walktour render structure', () => {
  test('walktour render', () => {
    const { container } = render(<Walktour steps={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('portal render', async () => {
    render(
      <div>
        <div id="target-element" />
        <Walktour steps={[{ selector: '#target-element', description: 'hello world', title: 'Hey Earth!' }]} />
      </div>
    );

    await waitFor(() => expect(document.querySelector('#walktour-portal')).toBeInTheDocument());
    const portal = document.querySelector('#walktour-portal');
    const tooltip = document.querySelector('#walktour-tooltip-container');
    const mask = portal?.querySelector('svg');

    expect(portal?.children.length).toBe(2);
    expect(tooltip).toBeInTheDocument();
    expect(mask).not.toBeNull();
  });

  test('with target', async () => {
    render(
      <div>
        <div id="one" />
        <Walktour steps={[{ selector: '#one', description: 'hello world', title: 'Hey Earth!' }]} />
      </div>
    );

    await waitFor(() => expect(document.querySelector('#walktour-tooltip-container')).toBeInTheDocument());
    const buttons = document.querySelectorAll('#walktour-tooltip-container button');
    expect(buttons).toHaveLength(3); // skip, previous, next
  });
});
