#!/usr/bin/env python3
"""
Find which kanjis were supposed to be removed from N2 but weren't
"""
import re
from pathlib import Path

base_path = Path('src')
n2_file = base_path / 'kanjiN2.ts'

# The 8 kanjis that should have been removed
should_be_removed = {
    '竹': 858,
    '虫': 911,
    '門': 965,
    '林': 765,
    '森': 776,
    '貝': 933,
    '寺': 702,
    '岩': 710
}

content = n2_file.read_text(encoding='utf-8')

# Find all entries and their ranks/kanjis
pattern = r"{ rank:(\d+), k:'(.)', level:'([^']+)'"
matches = re.findall(pattern, content)

print("Checking which N2 kanjis should have been removed but are still present:")
print("=" * 80)

remaining_count = 0
for kanji, rank in should_be_removed.items():
    rank_str = str(rank)
    found = False
    for match_rank, match_kanji, match_level in matches:
        if match_rank == rank_str and match_kanji == kanji and match_level == 'N5':
            found = True
            break
    
    if found:
        print(f"✓ {kanji} (rank {rank}) - Correctly removed and level changed to N5")
    else:
        # Check if it's still in N2
        for match_rank, match_kanji, match_level in matches:
            if match_rank == rank_str and match_kanji == kanji:
                print(f"✗ {kanji} (rank {rank}) - STILL IN N2 with level {match_level}")
                remaining_count += 1
                break
        else:
            # Check if it's in N5 but with wrong rank
            for match_rank, match_kanji, match_level in matches:
                if match_kanji == kanji:
                    print(f"? {kanji} - Found with rank {match_rank} and level {match_level}")
                    break
            else:
                print(f"? {kanji} - Not found in N2")

print(f"\nTotal remaining from N2: {remaining_count} (should be 0)")
