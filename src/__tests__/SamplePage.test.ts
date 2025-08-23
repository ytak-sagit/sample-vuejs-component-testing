import { userEvent } from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'

import SamplePage from '@/components/SamplePage.vue'

describe.skip('[dialog]', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.show = vi.fn(function mock(this: HTMLDialogElement) {
      this.open = true
    })

    HTMLDialogElement.prototype.showModal = vi.fn(function mock(this: HTMLDialogElement) {
      this.open = true
    })

    HTMLDialogElement.prototype.close = vi.fn(function mock(this: HTMLDialogElement) {
      this.open = false
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('given: 画面の初期表示後, when: "ボトムシートを開く"ボタンをタップ, then: ボトムシートが表示される', async () => {
    // given
    render(SamplePage, {
      global: {
        stubs: {
          transition: false,
        },
      },
    })

    // when
    const button = screen.getByRole('button', { name: /ボトムシートを開く/ })
    await userEvent.click(button)

    // then
    const bottomSheet = await screen.findByRole('dialog', {
      name: /ボトムシートの内容/,
    })
    expect(bottomSheet).toBeVisible()
  })
})

test('[div] given: 画面の初期表示後, when: "ボトムシートを開く"ボタンをタップ, then: ボトムシートが表示される', async () => {
  // given
  render(SamplePage, {
    global: {
      stubs: {
        transition: false,
      },
    },
  })

  // when
  const button = screen.getByRole('button', { name: /ボトムシートを開く/ })
  await userEvent.click(button)

  // then
  const bottomSheet = await screen.findByRole('dialog', {
    name: /ボトムシートの内容/,
  })
  expect(bottomSheet).toBeVisible()
})

test.skip('[div+Teleport] given: 画面の初期表示後, when: "ボトムシートを開く"ボタンをタップ, then: ボトムシートが表示される', async () => {
  // given
  const { findByRole } = render(SamplePage, {
    global: {
      stubs: {
        transition: false,
      },
    },
  })

  // when
  const button = screen.getByRole('button', { name: /ボトムシートを開く/ })
  await userEvent.click(button)

  // then
  const bottomSheet = await findByRole('dialog', {
    name: /ボトムシートの内容/,
  })
  expect(bottomSheet).toBeVisible()
})
