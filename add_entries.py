#!/usr/bin/env python3
"""
Add the 27 migrated kanjis to kanjiN5.ts
"""
import re
from pathlib import Path

base_path = Path('src')
n5_file = base_path / 'kanjiN5.ts'

# The 27 entries to add (in rank order) - extracted from migration plan
new_entries_text = """  { rank:61, k:'米', level:'N5', meanings:['arroz','EE.UU.'], on:['マイ','ベイ'], kun:['こめ'],
    words:[{w:'お米',f:'おこめ',m:'arroz',l:'N5'},{w:'米国',f:'べいこく',m:'Estados Unidos',l:'N4'},]},
  { rank:62, k:'力', level:'N5', meanings:['fuerza','poder'], on:['リョク','リキ'], kun:['ちから'],
    words:[{w:'力',f:'ちから',m:'fuerza',l:'N5'},{w:'努力',f:'どりょく',m:'esfuerzo',l:'N4'},{w:'協力',f:'きょうりょく',m:'cooperación',l:'N4'},]},
  { rank:67, k:'明', level:'N5', meanings:['brillante','claro','mañana'], on:['メイ','ミョウ'], kun:['あか.るい','あき.らか'],
    words:[{w:'明日',f:'あした',m:'mañana',l:'N5'},{w:'明るい',f:'あかるい',m:'brillante / alegre',l:'N5'},{w:'説明',f:'せつめい',m:'explicación',l:'N4'},]},
  { rank:88, k:'体', level:'N5', meanings:['cuerpo'], on:['タイ','テイ'], kun:['からだ'],
    words:[{w:'体',f:'からだ',m:'cuerpo',l:'N5'},{w:'体育',f:'たいいく',m:'educación física',l:'N4'},{w:'体験',f:'たいけん',m:'experiencia',l:'N4'},{w:'全体',f:'ぜんたい',m:'totalidad / conjunto',l:'N4'},]},
  { rank:90, k:'田', level:'N5', meanings:['arrozal','campo'], on:['デン'], kun:['た'],
    words:[{w:'田んぼ',f:'たんぼ',m:'campo de arroz',l:'N5'},{w:'田舎',f:'いなか',m:'campo / zona rural',l:'N4'}]},
  { rank:192, k:'元', level:'N5', meanings:['origen','comienzo','antes'], on:['ゲン','ガン'], kun:['もと'],
    words:[{w:'元気',f:'げんき',m:'energía / salud',l:'N5'},{w:'元々',f:'もともと',m:'originalmente',l:'N4'},{w:'元日',f:'がんじつ',m:'día de año nuevo',l:'N4'},{w:'地元',f:'じもと',m:'local / de la zona',l:'N4'}]},
  { rank:215, k:'物', level:'N5', meanings:['cosa','objeto','asunto'], on:['ブツ','モツ'], kun:['もの'],
    words:[{w:'食べ物',f:'たべもの',m:'comida',l:'N5'},{w:'飲み物',f:'のみもの',m:'bebida',l:'N5'},{w:'荷物',f:'にもつ',m:'equipaje',l:'N4'},{w:'物語',f:'ものがたり',m:'historia / cuento',l:'N4'}]},
  { rank:292, k:'町', level:'N5', meanings:['ciudad','barrio','manzana'], on:['チョウ'], kun:['まち'],
    words:[{w:'町',f:'まち',m:'ciudad / barrio',l:'N5'},{w:'下町',f:'したまち',m:'barrio antiguo',l:'N4'}]},
  { rank:304, k:'内', level:'N5', meanings:['interior','dentro'], on:['ナイ','ダイ'], kun:['うち'],
    words:[{w:'案内',f:'あんない',m:'guía / información',l:'N4'},{w:'内容',f:'ないよう',m:'contenido',l:'N3'},{w:'国内',f:'こくない',m:'interior del país',l:'N3'}]},
  { rank:408, k:'石', level:'N5', meanings:['piedra','roca'], on:['セキ','シャク','コク'], kun:['いし'],
    words:[{w:'石',f:'いし',m:'piedra',l:'N5'},{w:'磁石',f:'じしゃく',m:'imán',l:'N3'},{w:'化石',f:'かせき',m:'fósil',l:'N3'}]},
  { rank:435, k:'好', level:'N5', meanings:['gustar','afición','favorable'], on:['コウ'], kun:['この.む','す.き'],
    words:[{w:'好き',f:'すき',m:'gustar',l:'N5'},{w:'友好',f:'ゆうこう',m:'amistad',l:'N4'},{w:'好奇心',f:'こうきしん',m:'curiosidad',l:'N3'}]},
  { rank:485, k:'字', level:'N5', meanings:['carácter','letra'], on:['ジ'], kun:['あざ'],
    words:[{w:'漢字',f:'かんじ',m:'kanji',l:'N5'},{w:'文字',f:'もじ',m:'carácter / letra',l:'N4'},{w:'数字',f:'すうじ',m:'número',l:'N4'}]},
  { rank:491, k:'音', level:'N5', meanings:['sonido'], on:['オン','イン'], kun:['おと','ね'],
    words:[{w:'音楽',f:'おんがく',m:'música',l:'N5'},{w:'音読み',f:'おんよみ',m:'lectura on del kanji',l:'N5'},{w:'発音',f:'はつおん',m:'pronunciación',l:'N4'},{w:'音声',f:'おんせい',m:'voz / sonido',l:'N4'},]},
  { rank:511, k:'王', level:'N5', meanings:['rey','monarca'], on:['オウ'], kun:[],
    words:[{w:'王様',f:'おうさま',m:'rey',l:'N4'},{w:'王国',f:'おうこく',m:'reino',l:'N3'},{w:'女王',f:'じょおう',m:'reina',l:'N3'}]},
  { rank:702, k:'寺', level:'N5', meanings:['templo budista'], on:['ジ'], kun:['てら'],
    words:[{w:'お寺',f:'おてら',m:'templo budista',l:'N4'},]},
  { rank:710, k:'岩', level:'N5', meanings:['roca'], on:['ガン'], kun:['いわ'],
    words:[{w:'岩',f:'いわ',m:'roca',l:'N4'},]},
  { rank:765, k:'林', level:'N5', meanings:['bosque'], on:['リン'], kun:['はやし'],
    words:[{w:'林',f:'はやし',m:'bosque pequeño',l:'N4'},]},
  { rank:776, k:'森', level:'N5', meanings:['bosque denso'], on:['シン'], kun:['もり'],
    words:[{w:'森',f:'もり',m:'bosque',l:'N4'},]},
  { rank:858, k:'竹', level:'N5', meanings:['bambú'], on:['チク'], kun:['たけ'],
    words:[{w:'竹',f:'たけ',m:'bambú',l:'N4'},]},
  { rank:911, k:'虫', level:'N5', meanings:['insecto / bicho'], on:['チュウ'], kun:['むし'],
    words:[{w:'虫',f:'むし',m:'insecto',l:'N5'},{w:'虫歯',f:'むしば',m:'caries',l:'N3'}]},
  { rank:924, k:'夕', level:'N5', meanings:['tarde','atardecer'], on:['セキ'], kun:['ゆう'],
    words:[{w:'夕方',f:'ゆうがた',m:'tarde / atardecer',l:'N5'},{w:'夕食',f:'ゆうしょく',m:'cena',l:'N5'},{w:'夕日',f:'ゆうひ',m:'sol del atardecer',l:'N4'},{w:'夕暮れ',f:'ゆうぐれ',m:'anochecer',l:'N4'}]},
  { rank:933, k:'貝', level:'N5', meanings:['concha / marisco'], on:['カイ'], kun:['かい'],
    words:[{w:'貝',f:'かい',m:'concha',l:'N4'},]},
  { rank:965, k:'門', level:'N5', meanings:['puerta / entrada'], on:['モン'], kun:['かど'],
    words:[{w:'門',f:'もん',m:'puerta',l:'N4'},{w:'専門',f:'せんもん',m:'especialidad',l:'N3'}]},
  { rank:986, k:'肉', level:'N5', meanings:['carne'], on:['ニク'], kun:[],
    words:[{w:'牛肉',f:'ぎゅうにく',m:'carne de vaca',l:'N5'},]},
  { rank:1040, k:'暗', level:'N5', meanings:['oscuro'], on:['アン'], kun:['くら.い'],
    words:[{w:'暗い',f:'くらい',m:'oscuro',l:'N5'},{w:'暗記',f:'あんき',m:'memorización',l:'N4'},]},
  { rank:1116, k:'茶', level:'N5', meanings:['té'], on:['チャ','サ'], kun:[],
    words:[{w:'お茶',f:'おちゃ',m:'té',l:'N5'},{w:'茶色',f:'ちゃいろ',m:'color marrón',l:'N5'},{w:'紅茶',f:'こうちゃ',m:'té negro',l:'N4'},{w:'茶道',f:'さどう',m:'ceremonia del té',l:'N4'}]},
  { rank:1202, k:'牛', level:'N5', meanings:['vaca','buey'], on:['ギュウ'], kun:['うし'],
    words:[{w:'牛乳',f:'ぎゅうにゅう',m:'leche',l:'N5'},{w:'牛肉',f:'ぎゅうにく',m:'carne de vaca',l:'N5'},{w:'牛丼',f:'ぎゅうどん',m:'cuenco de arroz con carne',l:'N4'}]},
"""

# Read the current N5 file
content = n5_file.read_text(encoding='utf-8')

# Find the closing bracket and insert the new entries before it
insert_point = content.rfind(']')
new_content = content[:insert_point] + new_entries_text + '\n' + content[insert_point:]

# Update the count in the comment
new_content = re.sub(r'// N5: \d+ kanji', '// N5: 118 kanji', new_content)

# Save the file
n5_file.write_text(new_content, encoding='utf-8')

print("Added 27 entries to kanjiN5.ts")
print("Updated count to 118 kanji")
