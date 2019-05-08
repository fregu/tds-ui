export const SHOW_DIALOG = 'SHOW_DIALOG'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

export const confirmAction = (confirm, callback) => {
  return showDialog({
    title: confirm.title || 'Är du säker?',
    headerContent: confirm.headerContent || null,
    content: confirm.content || (typeof confirm === 'string' && confirm),
    modifiers: confirm.modifiers,
    actions: [
      { text: 'Avbryt', ...(confirm.decline || {}) },
      {
        text: 'Fortsätt',
        primary: true,
        ...(confirm.approve || {}),
        onClick: callback
      }
    ]
  })
}
export const showDialog = ({ title, content, actions, ...props }) => ({
  type: SHOW_DIALOG,
  title,
  content,
  actions,
  ...props
})

export const closeDialog = () => ({
  type: CLOSE_DIALOG
})
