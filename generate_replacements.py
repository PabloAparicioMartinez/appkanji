#!/usr/bin/env python3
"""
Generate replacement instructions for kanji reorganization
"""
import re
import json
from pathlib import Path

# Paths
base_path = Path('src')
n5_file = base_path / 'kanjiN5.ts'
n4_file = base_path / 'kanjiN4.ts'
n3_file = base_path / 'kanjiN3.ts'
n2_file = base_path / 'kanjiN2.ts'

# To change in kanjiN4
n4_to_n5_level_changes = ['米', '力', '田', '字', '物', '夕', '肉', '茶', '牛', '明', '体', '元', '町', '音', '暗']
# To change in kanjiN3
n3_to_n5_level_changes = ['内', '石', '王', '好']
# To change in kanjiN2
n2_to_n5_level_changes = ['竹', '虫', '門', '林', '森', '貝', '寺', '岩']

def read_kanji_file(filepath):
    """Read and parse a kanji file."""
    return filepath.read_text(encoding='utf-8')

def extract_kanji_with_context(content, kanji, from_level, to_level=None):
    """Extract a kanji entry with context for replacement."""
    # Pattern: find the kanji entry and extract it with surrounding lines
    pattern = f"{{\\s*rank:(\\d+),\\s*k:'{re.escape(kanji)}',\\s*level:'{from_level}'"
    
    matches = list(re.finditer(pattern, content))
    if not matches:
        return None
    
    match = matches[0]
    start = match.start()
    
    # Find the end of this entry (matching braces)
    depth = 0
    i = start
    entry_start = None
    
    for j, char in enumerate(content[start:]):
        if char == '{':
            if entry_start is None:
                entry_start = start + j
            depth += 1
        elif char == '}':
            depth -= 1
            if depth == 0:
                entry_end = start + j + 1
                entry = content[entry_start:entry_end]
                
                if to_level:
                    entry = entry.replace(f"level:'{from_level}'", f"level:'{to_level}'")
                
                return entry
    
    return None

def main():
    # Read all files
    n4_content = read_kanji_file(n4_file)
    n3_content = read_kanji_file(n3_file)
    n2_content = read_kanji_file(n2_file)
    n5_content = read_kanji_file(n5_file)
    
    replacements = []
    
    print("Generating replacements for level changes...")
    print("=" * 80)
    
    # 1. Change levels in kanjiN4 (15 entries N4->N5)
    print("\n1. N4 entries to change to N5 level:")
    for kanji in n4_to_n5_level_changes:
        old_pattern = extract_kanji_with_context(n4_content, kanji, 'N4')
        new_pattern = extract_kanji_with_context(n4_content, kanji, 'N4', 'N5')
        
        if old_pattern and new_pattern:
            # Add context lines before and after
            old_with_context = old_pattern + ','
            new_with_context = new_pattern + ','
            
            replacements.append({
                'file': 'kanjiN4',
                'kanji': kanji,
                'old': old_with_context,
                'new': new_with_context
            })
            print(f"  - {kanji}")
    
    # 2. Change levels in kanjiN3 (4 entries N3->N5)
    print("\n2. N3 entries to change to N5 level:")
    for kanji in n3_to_n5_level_changes:
        old_pattern = extract_kanji_with_context(n3_content, kanji, 'N3')
        new_pattern = extract_kanji_with_context(n3_content, kanji, 'N3', 'N5')
        
        if old_pattern and new_pattern:
            old_with_context = old_pattern + ','
            new_with_context = new_pattern + ','
            
            replacements.append({
                'file': 'kanjiN3',
                'kanji': kanji,
                'old': old_with_context,
                'new': new_with_context
            })
            print(f"  - {kanji}")
    
    # 3. Change levels in kanjiN2 (8 entries N2->N5)
    print("\n3. N2 entries to change to N5 level:")
    for kanji in n2_to_n5_level_changes:
        old_pattern = extract_kanji_with_context(n2_content, kanji, 'N2')
        new_pattern = extract_kanji_with_context(n2_content, kanji, 'N2', 'N5')
        
        if old_pattern and new_pattern:
            old_with_context = old_pattern + ','
            new_with_context = new_pattern + ','
            
            replacements.append({
                'file': 'kanjiN2',
                'kanji': kanji,
                'old': old_with_context,
                'new': new_with_context
            })
            print(f"  - {kanji}")
    
    # Save the replacements
    output_file = Path('kanji_replacements.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(replacements, f, ensure_ascii=False, indent=2)
    
    print(f"\n\nTotal replacements to make: {len(replacements)}")
    print(f"Saved to {output_file}")
    
    # Print summary
    print("\n" + "=" * 80)
    print("REPLACEMENT SUMMARY:")
    print("=" * 80)
    for rep in replacements:
        print(f"\nFile: {rep['file']}")
        print(f"Kanji: {rep['kanji']}")
        print(f"Old: {rep['old'][:60]}...")
        print(f"New: {rep['new'][:60]}...")

if __name__ == '__main__':
    main()
