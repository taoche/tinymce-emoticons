import base64emoticons from './emoticons.json'

const ROW = 7
const COLUMNS = 15
const base64emoticonsArr = Object.values(base64emoticons)

tinymce.PluginManager.add('emoticons', editor => {
  function renderHtml() {
    let emoticonsHtml = ''

    for (let i = 0; i < ROW; i++) {
      emoticonsHtml += '<tr>'
      for (let j = 0; j < COLUMNS; j++) {
        const index = i * COLUMNS + j

        const emoticonUrl = base64emoticonsArr[index]
        emoticonsHtml += `
            <td style="cursor: pointer;">
              <img style="width:30px;height:30px;" src="${emoticonUrl}" />
            </td>
          `
      }
      emoticonsHtml += '</tr>'
    }

    return `<table role="list" class="mce-grid">${emoticonsHtml}</table>`
  }

  editor.addButton('emoticons', {
    type: 'panelbutton',
    tooltip: 'Emoticons',
    panel: {
      role: 'application',
      autohide: true,
      html: renderHtml,
      onclick(e) {
        const linkElm = editor.dom.getParent(e.target, 'img')
        if (linkElm) {
          editor.insertContent(linkElm.parentElement.innerHTML)
          this.hide()
        }
      },
    },
  })
})
