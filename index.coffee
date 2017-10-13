romaji = require './romaji'
string = require './string'

REGEX_TO = /[\u3000-\u30ff\uff00-\uffef\u4e00-\u9faf]/
REGEX_FROM = /^<FONT>(.*?)<\/FONT><FONT SIZE=0 DATA-ENCODING=base64>(.*?)<\/FONT>$/i

module.exports = (dispatch) ->
  dispatch.hook 'cChat', (event) ->
    msg = event.message
    if REGEX_TO.test msg
      jp = string.decodeHTMLEntities string.stripTags msg
      conv = romaji.convert jp
      buf = Buffer.from jp
      event.message = "<FONT>#{string.escapeHTML conv}</FONT>"
      event.message += "<FONT SIZE=0 DATA-ENCODING=base64>#{buf.toString 'base64'}</FONT>"
      true

  dispatch.hook 'sChat', (event) ->
    match = event.message.match REGEX_FROM
    if match
      buf = Buffer.from match[2], 'base64'
      event.message = '<FONT>' + (buf.toString 'utf8') + '</FONT>'
      event.message += ' <FONT SIZE="14" COLOR="#999999"><A HREF="asfunction:chatLinkAction"></A>'
      event.message += '(' + match[1] + ')'
      event.message += '</FONT>'
      true
