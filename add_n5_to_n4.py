#!/usr/bin/env python3
"""
Add the 12 N5->N4 entries back to kanjiN4.ts
"""
import re
from pathlib import Path

base_path = Path('src')
n4_file = base_path / 'kanjiN4.ts'

# The 12 entries that were moved from N5 to N4
# These need to be added to kanjiN4.ts
n5_to_n4_entries_text = """  { rank:26, k:'後', level:'N5', meanings:['después','detrás'], on:['ゴ','コウ'], kun:['あと','うし.ろ'],
    words:[{w:'午後',f:'ごご',m:'tarde (PM)',l:'N5'},{w:'後で',f:'あとで',m:'después',l:'N5'},]},
  { rank:27, k:'前', level:'N5', meanings:['delante','antes'], on:['ゼン'], kun:['まえ'],
    words:[{w:'名前',f:'なまえ',m:'nombre',l:'N5'},{w:'午前',f:'ごぜん',m:'de la mañana (AM)',l:'N5'},{w:'駅前',f:'えきまえ',m:'frente a la estación',l:'N5'},]},
  { rank:31, k:'午', level:'N5', meanings:['mediodía','caballo'], on:['ゴ'], kun:[],
    words:[{w:'午前',f:'ごぜん',m:'de la mañana (AM)',l:'N5'},{w:'午後',f:'ごご',m:'tarde (PM)',l:'N5'},{w:'正午',f:'しょうご',m:'mediodía',l:'N4'},]},
  { rank:35, k:'道', level:'N5', meanings:['camino','vía','arte'], on:['ドウ','トウ'], kun:['みち'],
    words:[{w:'道',f:'みち',m:'camino',l:'N5'},{w:'道路',f:'どうろ',m:'carretera',l:'N4'},{w:'茶道',f:'ちゃどう',m:'ceremonia del té',l:'N4'},]},
  { rank:49, k:'語', level:'N5', meanings:['idioma','palabra'], on:['ゴ'], kun:['かた.る'],
    words:[{w:'言語',f:'げんご',m:'idioma',l:'N4'},{w:'日本語',f:'にほんご',m:'japonés',l:'N5'},{w:'外国語',f:'がいこくご',m:'idioma extranjero',l:'N5'},]},
  { rank:53, k:'空', level:'N5', meanings:['cielo','vacío'], on:['クウ','カラ'], kun:['から','す.く'],
    words:[{w:'空',f:'そら',m:'cielo',l:'N5'},{w:'空気',f:'くうき',m:'aire',l:'N5'},{w:'空港',f:'くうこう',m:'aeropuerto',l:'N5'},]},
  { rank:56, k:'店', level:'N5', meanings:['tienda','mostrador'], on:['テン'], kun:['みせ'],
    words:[{w:'店',f:'みせ',m:'tienda',l:'N5'},{w:'書店',f:'しょてん',m:'librería',l:'N5'},{w:'駅前店',f:'えきまえてん',m:'tienda frente a estación',l:'N4'},]},
  { rank:59, k:'毎', level:'N5', meanings:['cada','todos'], on:['マイ'], kun:['ごと'],
    words:[{w:'毎日',f:'まいにち',m:'cada día',l:'N5'},{w:'毎年',f:'まいとし',m:'cada año',l:'N5'},{w:'毎週',f:'まいしゅう',m:'cada semana',l:'N5'},]},
  { rank:60, k:'白', level:'N5', meanings:['blanco'], on:['ハク','ビャク'], kun:['しろ','しら'],
    words:[{w:'白い',f:'しろい',m:'blanco',l:'N5'},{w:'白人',f:'はくじん',m:'persona blanca',l:'N5'},{w:'白米',f:'はくまい',m:'arroz blanco',l:'N4'},]},
  { rank:18, k:'天', level:'N5', meanings:['cielo','naturaleza'], on:['テン'], kun:['あま','あめ'],
    words:[{w:'天気',f:'てんき',m:'clima / tiempo',l:'N5'},{w:'天下',f:'てんか',m:'imperio / el mundo',l:'N4'},{w:'天皇',f:'てんのう',m:'emperador',l:'N4'},]},
  { rank:54, k:'週', level:'N5', meanings:['semana'], on:['シュウ'], kun:[],
    words:[{w:'週末',f:'しゅうまつ',m:'fin de semana',l:'N5'},{w:'毎週',f:'まいしゅう',m:'cada semana',l:'N5'},{w:'今週',f:'こんしゅう',m:'esta semana',l:'N5'},]},
  { rank:38, k:'駅', level:'N5', meanings:['estación'], on:['エキ'], kun:[],
    words:[{w:'駅',f:'えき',m:'estación',l:'N5'},{w:'駅前',f:'えきまえ',m:'frente a la estación',l:'N5'},{w:'駅員',f:'えきいん',m:'empleado de estación',l:'N4'},]},
"""

# Read the current N4 file
content = n4_file.read_text(encoding='utf-8')

# Find the closing bracket and insert the entries before it
insert_point = content.rfind(']')
new_content = content[:insert_point] + n5_to_n4_entries_text + '\n' + content[insert_point:]

# Update the count
count = new_content.count('{ rank:')
new_content = re.sub(r'// N4: \d+ kanji', f'// N4: {count} kanji', new_content)

# Save the file
n4_file.write_text(new_content, encoding='utf-8')

print(f"Added 12 N5->N4 entries to kanjiN4.ts")
print(f"Updated count to {count} kanji")
