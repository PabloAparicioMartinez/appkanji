#!/usr/bin/env python3
import re
import json
from pathlib import Path

# Paths
base_path = Path('src')
n5_file = base_path / 'kanjiN5.ts'
n4_file = base_path / 'kanjiN4.ts'
n3_file = base_path / 'kanjiN3.ts'
n2_file = base_path / 'kanjiN2.ts'

# Kanjis to move FROM N4 TO N5
from_n4_to_n5 = ['米', '力', '田', '字', '物', '夕', '肉', '茶', '牛', '明', '体', '元', '町', '音', '暗']

# Kanjis to move FROM N3 TO N5
from_n3_to_n5 = ['内', '石', '王', '好']

# Kanjis to move FROM N2 TO N5
from_n2_to_n5 = ['竹', '虫', '門', '林', '森', '貝', '寺', '岩']

def read_kanji_file(filepath):
    """Read and parse a kanji file, extracting kanji entries."""
    content = filepath.read_text(encoding='utf-8')
    entries = {}
    
    # Regex to match kanji entries
    # Looking for entries like: { rank:61, k:'米', level:'N4', ... }
    pattern = r"\{\s*rank:(\d+),\s*k:'([^']+)',\s*level:'[^']+'"
    
    # Find all entries with their positions
    for match in re.finditer(r"\{\s*rank:(\d+),\s*k:'([^']+)'", content):
        rank = int(match.group(1))
        kanji = match.group(2)
        # Store position and kanji info
        start_pos = match.start()
        entries[kanji] = {'rank': rank, 'pos': start_pos}
    
    return content, entries

def extract_kanji_entry(content, start_pos, kanji):
    """Extract complete kanji entry from content starting at position."""
    # Find the closing bracket
    depth = 0
    i = start_pos
    in_entry = False
    
    while i < len(content):
        char = content[i]
        if char == '{':
            in_entry = True
            depth += 1
        elif char == '}' and in_entry:
            depth -= 1
            if depth == 0:
                return content[start_pos:i+1]
        i += 1
    
    return None

def main():
    # Read all files
    n4_content, n4_entries = read_kanji_file(n4_file)
    n3_content, n3_entries = read_kanji_file(n3_file)
    n2_content, n2_entries = read_kanji_file(n2_file)
    n5_content, n5_entries = read_kanji_file(n5_file)
    
    # Collect kanjis to move with their full entries
    kanjis_to_move_to_n5 = {}
    
    # From N4
    for kanji in from_n4_to_n5:
        if kanji in n4_entries:
            entry_full = extract_kanji_entry(n4_content, n4_entries[kanji]['pos'], kanji)
            # Change level from N4 to N5
            entry_new = entry_full.replace("level:'N4'", "level:'N5'")
            kanjis_to_move_to_n5[kanji] = {
                'rank': n4_entries[kanji]['rank'],
                'entry': entry_new.strip(),
                'source': 'N4'
            }
    
    # From N3
    for kanji in from_n3_to_n5:
        if kanji in n3_entries:
            entry_full = extract_kanji_entry(n3_content, n3_entries[kanji]['pos'], kanji)
            # Change level from N3 to N5
            entry_new = entry_full.replace("level:'N3'", "level:'N5'")
            kanjis_to_move_to_n5[kanji] = {
                'rank': n3_entries[kanji]['rank'],
                'entry': entry_new.strip(),
                'source': 'N3'
            }
    
    # From N2
    for kanji in from_n2_to_n5:
        if kanji in n2_entries:
            entry_full = extract_kanji_entry(n2_content, n2_entries[kanji]['pos'], kanji)
            # Change level from N2 to N5
            entry_new = entry_full.replace("level:'N2'", "level:'N5'")
            kanjis_to_move_to_n5[kanji] = {
                'rank': n2_entries[kanji]['rank'],
                'entry': entry_new.strip(),
                'source': 'N2'
            }
    
    # Sort by rank
    sorted_kanjis = sorted(kanjis_to_move_to_n5.items(), key=lambda x: x[1]['rank'])
    
    print("Kanjis to move to N5 (sorted by rank):")
    print("=" * 60)
    for kanji, info in sorted_kanjis:
        print(f"Rank {info['rank']}: {kanji} (from {info['source']})")
    
    print("\n\nGenerating insertion data...")
    print("=" * 60)
    
    # Generate the new array content for N5
    new_entries = []
    for kanji, info in sorted_kanjis:
        new_entries.append(info['entry'])
    
    insertion_text = ",\n  ".join(new_entries)
    
    print("First new entry:")
    print(new_entries[0] if new_entries else "None")
    print("\nLast new entry:")
    print(new_entries[-1] if new_entries else "None")
    
    # Save results to a file for review
    with open('kanji_migration_plan.txt', 'w', encoding='utf-8') as f:
        f.write("KANJI MIGRATION PLAN\n")
        f.write("=" * 80 + "\n\n")
        f.write("Kanjis moving from N4 to N5:\n")
        for kanji in from_n4_to_n5:
            if kanji in [k for k, _ in sorted_kanjis]:
                rank = next(v['rank'] for k, v in sorted_kanjis if k == kanji)
                f.write(f"  - {kanji} (rank {rank})\n")
        
        f.write("\nKanjis moving from N3 to N5:\n")
        for kanji in from_n3_to_n5:
            if kanji in [k for k, _ in sorted_kanjis]:
                rank = next(v['rank'] for k, v in sorted_kanjis if k == kanji)
                f.write(f"  - {kanji} (rank {rank})\n")
        
        f.write("\nKanjis moving from N2 to N5:\n")
        for kanji in from_n2_to_n5:
            if kanji in [k for k, _ in sorted_kanjis]:
                rank = next(v['rank'] for k, v in sorted_kanjis if k == kanji)
                f.write(f"  - {kanji} (rank {rank})\n")
        
        f.write("\n" + "=" * 80 + "\n\n")
        f.write("Full entries to add to N5 (sorted by rank):\n\n")
        for kanji, info in sorted_kanjis:
            f.write(f"\n{info['entry']},\n")
    
    print("\nMigration plan saved to kanji_migration_plan.txt")
    return sorted_kanjis

if __name__ == '__main__':
    result = main()
    print(f"\nTotal kanjis to move: {len(result)}")
