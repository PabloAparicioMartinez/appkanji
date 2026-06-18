#!/usr/bin/env python3
"""
Generate all kanji updates in one comprehensive script
"""
import re
import json
from pathlib import Path

base_path = Path('src')
n5_file = base_path / 'kanjiN5.ts'
n4_file = base_path / 'kanjiN4.ts'
n3_file = base_path / 'kanjiN3.ts'
n2_file = base_path / 'kanjiN2.ts'

# Kanjis that need to be REMOVED from files (they were moved/level changed)
n5_removals = ['後', '前', '午', '道', '語', '空', '店', '毎', '白', '天', '週', '駅']  # 12 entries to remove from N5
n4_removals = ['米', '力', '田', '字', '物', '夕', '肉', '茶', '牛', '明', '体', '元', '町', '音', '暗']  # 15 entries to remove from N4
n3_removals = ['内', '石', '王', '好']  # 4 entries to remove from N3
n2_removals = ['竹', '虫', '門', '林', '森', '貝', '寺', '岩']  # 8 entries to remove from N2

def extract_entry_with_trailing_comma(content, kanji):
    """Extract a kanji entry including its trailing comma"""
    # Find the entry and extract it completely
    pattern = f"{{\\s*rank:(\\d+),\\s*k:'{re.escape(kanji)}'"
    match = re.search(pattern, content)
    if not match:
        return None
    
    start = match.start()
    # Find the end of this entry (matching braces)
    depth = 0
    for j, char in enumerate(content[start:]):
        if char == '{':
            depth += 1
        elif char == '}':
            depth -= 1
            if depth == 0:
                # Include trailing comma and newline if present
                end = start + j + 1
                # Check for trailing comma and spaces
                if end < len(content) and content[end] == ',':
                    end += 1
                # Include newline(s) after
                while end < len(content) and content[end] in '\n':
                    end += 1
                return content[start:end]
    
    return None

def remove_kanjis_from_file(filepath, kanjis_to_remove):
    """Remove specific kanjis from a file"""
    content = filepath.read_text(encoding='utf-8')
    
    for kanji in kanjis_to_remove:
        entry = extract_entry_with_trailing_comma(content, kanji)
        if entry:
            content = content.replace(entry, '', 1)
            print(f"  Removed {kanji} from {filepath.name}")
    
    return content

def load_migration_data():
    """Load the migration plan"""
    with open('kanji_migration_plan.txt', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse the entries from the file
    lines = content.split('\n')
    entries = []
    current_entry = ''
    
    for line in lines:
        if line.startswith('{ rank:'):
            current_entry = line
        elif current_entry and (line.startswith('    words:') or line.startswith('    words')):
            current_entry += '\n' + line
        elif current_entry and line.strip() == '},' or line.strip() == '},':
            current_entry += '\n' + line
            entries.append(current_entry)
            current_entry = ''
    
    return entries

def main():
    print("KANJI REORGANIZATION - FINAL UPDATES")
    print("=" * 80)
    
    # 1. Remove N5 entries that became N4
    print("\n1. Updating kanjiN5.ts - removing entries that became N4...")
    n5_content = remove_kanjis_from_file(n5_file, n5_removals)
    
    # 2. Remove entries from N4 that move to N5
    print("\n2. Updating kanjiN4.ts - removing entries moving to N5...")
    n4_content = remove_kanjis_from_file(n4_file, n4_removals)
    
    # 3. Remove entries from N3 that move to N5
    print("\n3. Updating kanjiN3.ts - removing entries moving to N5...")
    n3_content = remove_kanjis_from_file(n3_file, n3_removals)
    
    # 4. Remove entries from N2 that move to N5
    print("\n4. Updating kanjiN2.ts - removing entries moving to N5...")
    n2_content = remove_kanjis_from_file(n2_file, n2_removals)
    
    # 5. Add new entries to N5
    print("\n5. Adding new entries to kanjiN5.ts...")
    entries_to_add = load_migration_data()
    
    # Insert entries at correct position in N5
    # Find position to insert (after the last rank to maintain order)
    # For now, add them at the end before the closing bracket
    if entries_to_add:
        # Add entries before the closing bracket
        insert_point = n5_content.rfind(']')
        new_entries = '\n'.join(entries_to_add) + '\n'
        n5_content = n5_content[:insert_point] + new_entries + n5_content[insert_point:]
        print(f"  Added {len(entries_to_add)} entries to kanjiN5.ts")
    
    # 6. Update counts in comments
    print("\n6. Updating entry counts...")
    
    # Count entries in each file
    n5_count = n5_content.count('{ rank:')
    n4_count = n4_content.count('{ rank:')
    n3_count = n3_content.count('{ rank:')
    n2_count = n2_content.count('{ rank:')
    
    # Update comments
    n5_content = re.sub(r'// N5: \d+ kanji', f'// N5: {n5_count} kanji', n5_content)
    n4_content = re.sub(r'// N4: \d+ kanji', f'// N4: {n4_count} kanji', n4_content)
    n3_content = re.sub(r'// N3: \d+ kanji', f'// N3: {n3_count} kanji', n3_content)
    n2_content = re.sub(r'// N2: \d+ kanji', f'// N2: {n2_count} kanji', n2_content)
    
    print(f"  N5: {n5_count} kanji")
    print(f"  N4: {n4_count} kanji")
    print(f"  N3: {n3_count} kanji")
    print(f"  N2: {n2_count} kanji")
    
    # Save the updated files
    print("\n7. Saving updated files...")
    n5_file.write_text(n5_content, encoding='utf-8')
    n4_file.write_text(n4_content, encoding='utf-8')
    n3_file.write_text(n3_content, encoding='utf-8')
    n2_file.write_text(n2_content, encoding='utf-8')
    
    print("\nAll files updated successfully!")
    print(f"\nSummary:")
    print(f"  - Removed {len(n5_removals)} entries from kanjiN5.ts")
    print(f"  - Removed {len(n4_removals)} entries from kanjiN4.ts")
    print(f"  - Removed {len(n3_removals)} entries from kanjiN3.ts")
    print(f"  - Removed {len(n2_removals)} entries from kanjiN2.ts")
    print(f"  - Added {len(entries_to_add)} entries to kanjiN5.ts")

if __name__ == '__main__':
    main()
