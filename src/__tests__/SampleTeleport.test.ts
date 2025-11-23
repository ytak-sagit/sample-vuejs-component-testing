import SampleTeleport from '@/components/SampleTeleport.vue'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'

describe('teleport', () => {
  it('given: 初期表示後, when: openボタンをタップ, then: モーダルが表示される', async () => {
    // given
    render(SampleTeleport)

    // when
    const openButton = screen.getByRole('button', { name: /open/ })
    await userEvent.click(openButton)

    // then
    const modal = screen.getByTestId('teleported-modal')
    expect(modal).toBeInTheDocument()
    expect(modal.parentNode!.nodeName).toBe('BODY')
  })
})
